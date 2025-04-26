import config from "../../apis/config";
import uiManager from "../../uiManager";
import { ActionForm } from "../../lib/prismarinedb";
import customCommands from "../../apis/customCommands";

uiManager.addUI(config.uiNames.CustomCommands.Remove, "Custom Commands root", (player)=>{
    let form = new ActionForm();
    let cmds = customCommands.db.findDocuments()
    form.title("§dCustom Commands")
    form.button(`§cBack\n§7[ Go back ]`, "textures/azalea_icons/2.png", (player)=>{
        uiManager.open(player, config.uiNames.CustomCommands.Root)
    })
    for (const cmd of cmds) {
        form.button(`§d${cmd.data.name}\n§7[ Remove Command ]`, "textures/azalea_icons/Settings.png", (player)=>{
            customCommands.remove(cmd.id)
        })
    }

    form.show(player)
})