import config from "../../apis/config";
import uiManager from "../../uiManager";
import { ActionForm } from "../../lib/prismarinedb";

uiManager.addUI(config.uiNames.Ranks.Root, "warps root", (player)=>{
    let form = new ActionForm();
    form.title("§dRanks")
    form.button(`§dRemove\n§7Remove a rank`, "textures/azalea_icons/Delete.png", (player)=>{
        uiManager.open(player, config.uiNames.Ranks.Remove)
    })
    form.button(`§dAdd\n§7Add a rank`, "textures/azalea_icons/1.png", (player)=>{
        uiManager.open(player, config.uiNames.Ranks.Add)
    })
    form.button(`§dEdit\n§7Edit ranks`, "textures/azalea_icons/Settings.png", (player)=>{
        uiManager.open(player, config.uiNames.Ranks.EditItems)
    })
    form.show(player)
})