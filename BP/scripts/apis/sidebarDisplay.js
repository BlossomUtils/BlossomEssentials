import { system, world } from "@minecraft/server";
import { sidebar } from "./sidebarAPI";
import modules from "./modules";

system.runInterval(()=>{
    for(const player of world.getPlayers()) {
        try {
            if(modules.sidebar == false) return;
            let sd = sidebar.parseSidebar(player)
            if(sd === undefined) return player.onScreenDisplay.setTitle("");
            player.onScreenDisplay.setTitle(`§r${sd}`);
        } catch(e) {
            console.error(e)
        }
    }
},1);