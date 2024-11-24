import * as mc from '@minecraft/server'
import * as ui from '@minecraft/server-ui'
import { Player } from '@minecraft/server'
import uiManager from './uiManager'
import commandManager from './lib/commands/commandManager'
import ranks from './apis/ranks'

import './uis/index'
import './commands/index'
import config from './apis/config'

Player.prototype.error = function (msg) {
    this.sendMessage(`§c§lERROR§8 >>§r§7 ${msg}`)
}
Player.prototype.success = function (msg) {
    this.sendMessage(`§a§lSUCCESS§8 >>§r§7 ${msg}`)
}

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
    let allranks = ranks.getAllFromPlayer(msg.sender)
    if (allranks.length === 0) allranks.push("§bMember");

    let joined = allranks.join('§r§8] [§r');

    mc.world.sendMessage(`§8[§r${joined}§r§8]§7 ${msg.sender.name}§8 >>§7 ${msg.message}`);
    msg.cancel = true;
})