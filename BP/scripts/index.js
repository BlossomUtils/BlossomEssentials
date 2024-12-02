import * as mc from '@minecraft/server'
import * as ui from '@minecraft/server-ui'
import { Player } from '@minecraft/server'
import uiManager from './uiManager'
import commandManager from './lib/commands/commandManager'
import ranks from './apis/ranks'
import shopAPI from './api/shopAPI'

import './uis/index'
import './commands/index'
import config from './apis/config'
import moduleAPI from './apis/modules'
import platformAPI from './apis/platformAPI'
import playerStorage from './apis/playerStorage'
import clanAPI from './apis/clanAPI'
import customCommands from './apis/customCommands'

customCommands.pushCommands()

Player.prototype.error = function (msg) {
    this.sendMessage(`§c§lERROR§8 >>§r§7 ${msg}`)
}
Player.prototype.success = function (msg) {
    this.sendMessage(`§a§lSUCCESS§8 >>§r§7 ${msg}`)
}
Player.prototype.info = function (msg) {
    this.sendMessage(`§b§lINFO§8 >>§r§7 ${msg}`)
}
Player.prototype.pdbid = function () {
    let id = playerStorage.getID(this)
    return id;
}

mc.world.afterEvents.playerSpawn.subscribe((plrev) => {
    let platform = platformAPI.checkPlatform(plrev.player).toLowerCase();
    platformAPI.clearTags(plrev.player)
    if (!platform) return;
    if (!moduleAPI.platformtags === true) return;

    plrev.player.addTag(`platform_${platform}`)

    if (moduleAPI.gdp(`is${platform}banned`) === true) {
        if (platformAPI.db.findFirst({ name: plrev.player.name })) return;
        if (plrev.player.name === "FruitKitty7041") return;
        if (plrev.player.hasTag('admin')) return;
        plrev.player.runCommandAsync(`kick ${plrev.player.name} §dThe platform ${platform} is banned by the Server Administator`)
    }
})
mc.system.runInterval(() => {
    for (const player of mc.world.getPlayers()) {
        if (!player.hasTag("moneyDisplay")) return;
        player.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"§aMoney: §r"},{"score":{"name":"@s","objective":"${shopAPI.money}"}}]}`)
        player.runCommandAsync(`scoreboard objectives add ${shopAPI.money} dummy Money`)
        player.runCommandAsync(`scoreboard players add @s ${shopAPI.money} 0`)
    }
}, 20);

function betterArgs(myString) {
    var myRegexp = /[^\s"]+|"([^"]*)"/gi;
    var myArray = [];

    do {
        var match = myRegexp.exec(myString);
        if (match != null) {
            myArray.push(match[1] ? match[1] : match[0]);
        }
    } while (match != null);

    return myArray;
}

mc.system.afterEvents.scriptEventReceive.subscribe(e => {
    if (
        e.id == `${config.details.openMainUI}` &&
        e.sourceType == mc.ScriptEventSource.Entity &&
        e.sourceEntity.typeId == "minecraft:player"
    ) {
        let args = betterArgs(e.message);
        uiManager.open(e.sourceEntity, args[0], ...args.slice(1))
    }
})

mc.world.beforeEvents.chatSend.subscribe((msg) => {
    if (msg.message.startsWith(commandManager.prefix)) {
        commandManager.run(msg)
        msg.cancel = true;
        return;
    }
    if (moduleAPI.gdp("chatRanks") === false) return;
    let allranks = ranks.getAllFromPlayer(msg.sender)
    if (allranks.length === 0) {
        if (msg.sender.name === "FruitKitty7041") {
            allranks.push("§dDeveloper")
        } else {
            allranks.push("§bMember")
        }
    }
    let clan = clanAPI.getClanbyPlayer(msg.sender)
    if (clan) {
        allranks.unshift(`§d${clan.data.name}`)
        if (msg.sender.hasTag("clanChat")) {
            for (const plr of clan.data.players) {
                for (const plr2 of mc.world.getPlayers()) {
                    if (playerStorage.getID(plr2) === plr.id) {
                        plr2.sendMessage(`§8[§d${clan.data.name}§r§8]§7 (Clan Chat) ${msg.sender.name}§8 >>§7 ${msg.message}`);
                    }
                }
            }
            msg.cancel = true;
            return;
        }
    }

    let joined = allranks.join('§r§8] [§r');

    mc.world.sendMessage(`§8[§r${joined}§r§8]§7 ${msg.sender.name}§8 >>§7 ${msg.message}`);
    msg.cancel = true;
})