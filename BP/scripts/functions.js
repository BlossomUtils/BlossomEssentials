import * as mc from '@minecraft/server'
const scriptEngine = mc.world.getDimension("overworld")

function error(msg, player) {
    player.sendMessage(`§c§lERROR§8 >>§r§7 ${msg}`)
}
function success(msg, player) {
    player.sendMessage(`§a§lSUCCESS§8 >>§r§7 ${msg}`)
}
function broadcast(msg) {
    mc.world.sendMessage(`§b§lBROADCAST§8 >>§r§7 ${msg}`)
}
function isNumeric(str) {
    return Number.isFinite(Number(str));
}
function commandFeedback(setStatus) {
    if (setStatus === "off") {
        scriptEngine.runCommandAsync("gamerule sendcommandfeedback false")
    }
    if (setStatus === "on") {
        scriptEngine.runCommandAsync("gamerule sendcommandfeedback true")
    }
}


export { error, scriptEngine, success, commandFeedback, broadcast, isNumeric }