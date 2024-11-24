import config from "../../apis/config";
import uiManager from "../../uiManager";
import { ActionForm } from "../../lib/prismarinedb";

uiManager.addUI(config.uiNames.Warps.Root, "warps root", (player)=>{
    let form = new ActionForm();
    form.title("§dWarps")
    form.button(`§dRemove\n§7Remove a warp`, "textures/azalea_icons/Delete.png", (player)=>{
        uiManager.open(player, config.uiNames.Warps.Remove)
    })
    form.button(`§dAdd\n§7Add a warp`, "textures/azalea_icons/1.png", (player)=>{
        uiManager.open(player, config.uiNames.Warps.Add)
    })
    form.show(player)
})