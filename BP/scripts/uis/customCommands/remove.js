import config from "../../apis/config";
import uiManager from "../../uiManager";
import { ActionForm } from "../../lib/prismarinedb";
import customCommands from "../../apis/customCommands";

uiManager.addUI(config.uiNames.CustomCommands.Remove, "Custom Commands root", (player)=>{
    let form = new ActionForm();
    let cmds = customCommands.getCommands()
    form.title("§dCustom Commands")
    form.button(`§cBack\n§7[ Go back ]`, "textures/azalea_icons/Delete.png", (player)=>{
        uiManager.open(player, config.uiNames.CustomCommands.Root)
    })
    for (const cmd of cmds) {
        form.button(`§d${cmd.data.name}\n§7[ Remove Command ]`, "textures/azalea_icons/Settings.png", (player)=>{
            customCommands.removeCommand(cmd.id)
            player.info("Changing the name or removing a command requires a reload which you can do in Worlds or Bedrock Dedicated Server. If you are on realms, restart the realm.")
        })
    }

    form.show(player)
})