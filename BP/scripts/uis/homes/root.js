import config from "../../apis/config";
import uiManager from "../../uiManager";
import { ActionForm } from "../../lib/prismarinedb";

uiManager.addUI(config.uiNames.Homes.Root, "homes root", (player)=>{
    let form = new ActionForm();
    form.title("§dHomes")
    form.button(`§dRemove\n§7Remove a home`, "textures/azalea_icons/Delete.png", (player)=>{
        uiManager.open(player, config.uiNames.Homes.Remove)
    })
    form.button(`§dAdd\n§7Add a home`, "textures/azalea_icons/1.png", (player)=>{
        uiManager.open(player, config.uiNames.Homes.Add)
    })
    form.button(`§dList\n§7List homes`, "textures/azalea_icons/ClickyClick.png", (player)=>{
        uiManager.open(player, config.uiNames.Homes.List)
    })
    form.show(player)
})