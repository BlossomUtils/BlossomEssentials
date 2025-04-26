import * as mc from '@minecraft/server'


function error(msg, player) {
    mc.system.run(() => {
        player.sendMessage(`§c§lERROR§8 >>§r§7 ${msg}`)
    })
}
function success(msg, player) {
    mc.system.run(() => {
        player.sendMessage(`§a§lSUCCESS§8 >>§r§7 ${msg}`)
    })
}
function broadcast(msg) {
    mc.system.run(() => {
        mc.world.sendMessage(`§b§lBROADCAST§8 >>§r§7 ${msg}`)
    })
}
function isNumeric(str) {
    return Number.isFinite(Number(str));
}
function commandFeedback(setStatus) {
    mc.system.run(() => {
        const scriptEngine = mc.world.getDimension("overworld")
        if (setStatus === "off") {
            scriptEngine.runCommand("gamerule sendcommandfeedback false")
        }
        if (setStatus === "on") {
            scriptEngine.runCommand("gamerule sendcommandfeedback true")
        }
    })
}


export { error, success, commandFeedback, broadcast, isNumeric }