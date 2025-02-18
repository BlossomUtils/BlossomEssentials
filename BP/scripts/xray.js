import { world } from "@minecraft/server";
import modules from "./apis/modules";

if(!modules.get(`xrayAlertMessage`)) modules.set(`xrayAlertMessage`, `{plr} has mined {ore}!`);
if(modules.get(`xrayAlerts`) == undefined) modules.set(`xrayAlerts`, true);

world.beforeEvents.playerBreakBlock.subscribe((e) => {
    if(!modules.get('xrayAlerts')) return;
    console.log(`${e.block.typeId}, ${e.player.name}`)
    if(e.block.typeId == 'minecraft:diamond_ore' || e.block.typeId == 'minecraft:ancient_debris' || e.block.typeId == 'minecraft:deepslate_diamond_ore') {
        for(const plr of world.getPlayers()) {
            if(!plr.hasTag('admin')) continue;
            plr.sendMessage(`${modules.get(`xrayAlertMessage`).replaceAll('{plr}', e.player.name).replaceAll('{ore}', e.block.typeId)}`)
        }
    }
})