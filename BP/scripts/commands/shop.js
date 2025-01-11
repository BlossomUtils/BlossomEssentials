import config from "../apis/config";
import commandManager from "../lib/commands/commandManager";
import * as mc from "@minecraft/server";
import uiManager from "../uiManager";

commandManager.addCommand("shop", {description:"Open the shop", category:"Players"}, ({msg,args})=>{
    const system = mc.system
    const player = msg.sender
    player.success("Close chat and move to open UI.");

    let ticks = 0;
    let initialLocation = { x: player.location.x, y: player.location.y, z: player.location.z };

    let interval = system.runInterval(() => {
        ticks++;

        if (ticks >= (20 * 10)) {
            system.clearRun(interval);
            player.error("Timed out. You didn't move!");
        }

        if (player.location.x !== initialLocation.x ||
            player.location.y !== initialLocation.y ||
            player.location.z !== initialLocation.z) {

            system.clearRun(interval);
            uiManager.open(player, config.uiNames.Shop.Items)
        }
    }, 1);
})