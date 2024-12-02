import config from "../../apis/config";
import uiManager from "../../uiManager";
import { ActionForm } from "../../lib/prismarinedb";

uiManager.addUI(config.uiNames.CustomCommands.Root, "Custom Commands root", (player)=>{
    let form = new ActionForm();
    form.title("§dCustom Commands")
    form.button(`§dRemove\n§7Remove a command`, "textures/azalea_icons/Delete.png", (player)=>{
        uiManager.open(player, config.uiNames.CustomCommands.Remove)
    })
    form.button(`§dCreate\n§7Create a command`, "textures/azalea_icons/1.png", (player)=>{
        uiManager.open(player, config.uiNames.CustomCommands.Create)
    })
    form.button(`§dEdit\n§7Edit commands`, "textures/azalea_icons/Settings.png", (player)=>{
        uiManager.open(player, config.uiNames.CustomCommands.EditCmds)
    })
    form.show(player)
})