import * as mc from '@minecraft/server'
import * as ui from '@minecraft/server-ui'
import { Player } from '@minecraft/server'
import uiManager from './uiManager'
import commandManager from './lib/commands/commandManager'
import ranks from './apis/ranks'
import shopAPI from './api/shopAPI'
import './lib/tabbedUI'
import './apis/iconViewer/viewIcons'

import { ScriptEventCommandMessageAfterEvent } from '@minecraft/server'

import './uis/index'
import './blossomAPI'
import './commands/index'
import './apis/openers/index'
import './combatLogging'
import './test'
import './xray'
import './apis/sidebarDisplay'
import config from './apis/config'
import moduleAPI from './apis/modules'
import platformAPI from './apis/platformAPI'
import playerStorage from './apis/playerStorage'
import clanAPI from './apis/clanAPI'
import customCommands from './apis/customCommands'
import emojis from './apis/emojis'
import V2Opener from './apis/openers/V2Opener'
import blossomFormatting from './apis/blossomFormatting'
import bans from './apis/bans'

customCommands.pushCommands()

Object.defineProperty(ScriptEventCommandMessageAfterEvent.prototype, 'sender', {
    get: function () {
        return this.sourceEntity;
    },
    configurable: true,
    enumerable: true
});


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

commandManager.addCommand("emojis", { description: "Get a list of emojis", category: "Players" }, ({ msg, args }) => {
    let text = [[]];
    for (const key in emojis) {
        if (text[text.length - 1].length < 1) {
            text[text.length - 1].push(`:${key}: ${emojis[key]}`);
        } else {
            text.push([`:${key}: ${emojis[key]}`])
        }
    }
    msg.sender.sendMessage([text.map(_ => _.join('        ')).join('\n§r'), '', '§aTo use emojis, do :emoji_name: in chat. Example:   :coins:'].join('\n§r'))
})

mc.world.beforeEvents.playerInteractWithEntity.subscribe((e) => {
    if(e.itemStack) {
        if(e.itemStack.typeId == 'blossom:floating_text_editor' && e.target.typeId === 'blossom:floating_text') {
            if(e.target.getTags().find(_=>_.startsWith('lb:'))) return;
            mc.system.run(() => {
                let form = new ui.ModalFormData();
            form.title('Code Editor')
            form.textField('Code', 'Code', e.target.nameTag)
            form.show(e.player).then((res) => {
                let text = res.formValues[0]
                e.target.nameTag = text.replaceAll('/n', `\n`)
            })
            })
            
        }
    }
})

mc.world.afterEvents.playerSpawn.subscribe((plrev) => {
    bans.onJoin(plrev.player)
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
    if(e.id.startsWith(config.details.openShort)) {
        let args = betterArgs(e.message);
        uiManager.open(e.sourceEntity, e.id.replaceAll(config.details.openShort, ``), ...args)
    }
    if (e.id == `blossom:run`) {
        commandManager.run(e)
    }
})

mc.system.runInterval(() => {
    if (moduleAPI.chatPrefix == false) return;
    for(const plr of mc.world.getPlayers()) {
        let docs = ranks.db.findDocuments()
    let nc;
    let cc;
    for (const doc of docs) {
        let tags = plr.getTags();
        for (const tag of tags) {
            if (tag === doc.data.tag) {
                nc = doc.data.nameColor
                cc = doc.data.chatColor
                break;
            }
        }
    }
        let allranks = ranks.getAllFromPlayer(plr)
        if(allranks.length == 0) {
            if (plr.name === "FruitKitty7041") {
                allranks.push("§dDeveloper")
            } else {
                allranks.push("§bMember")
            }
        }
        let joined = allranks.join('§r§8] [§r');
        plr.nameTag = `§8[§r${joined}§r§8]${nc ? nc : '§7'} ${plr.name}`
    }
}, 20)

mc.world.beforeEvents.chatSend.subscribe((msg) => {
    if (msg.message.startsWith(commandManager.prefix)) {
        commandManager.run(msg)
        msg.cancel = true;
        return;
    }
    if (moduleAPI.chatranks === false) return msg.sender.runCommandAsync(`scriptevent blossom:messageSent <${msg.sender.name}> ${msg.message}`);
    let allranks = ranks.getAllFromPlayer(msg.sender)
    if (allranks.length === 0) {
        if (msg.sender.name === "FruitKitty7041") {
            allranks.push("§dDeveloper")
        } else {
            allranks.push("§bMember")
        }
    }
    let docs = ranks.db.findDocuments()
    let nc;
    let cc;
    for (const doc of docs) {
        let tags = msg.sender.getTags();
        for (const tag of tags) {
            if (tag === doc.data.tag) {
                nc = doc.data.nameColor
                cc = doc.data.chatColor
                break;
            }
        }
    }
    if(!nc) nc = "§7"
    if(!cc) cc = "§7"
    let clan = clanAPI.getClanbyPlayer(msg.sender)
    if (clan) {
        allranks.unshift(blossomFormatting.format(`:diamond_sword_short: ${nc}${clan.data.name}`, msg.sender))
        if (msg.sender.hasTag("clanChat")) {
            for (const plr of clan.data.players) {
                for (const plr2 of mc.world.getPlayers()) {
                    if (playerStorage.getID(plr2) === plr.id) {
                        plr2.sendMessage(`§8[${nc}${clan.data.name}§r§8]§7 (Clan Chat)${nc} ${msg.sender.name}§8 >>${cc} ${msg.message}`);
                    }
                }
            }
            msg.cancel = true;
            return;
        }
    }

    let joined = allranks.join('§r§8] [§r');


    let newmsg = blossomFormatting.format(msg.message, msg.sender)
    mc.world.sendMessage(`§8[§r${joined}§r§8]${nc} ${msg.sender.name}§8 >>${cc} ${newmsg}`);
    msg.sender.runCommandAsync(`scriptevent blossom:messageSent - [${joined.replaceAll(/§[0-9a-fgmnolr]/gi, "").replaceAll('\uE5A6', 'CLAN')}] ${msg.sender.name} >> ${msg.message}`)
    msg.cancel = true;
})