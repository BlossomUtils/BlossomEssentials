import config from "../../apis/config";
import uiManager from "../../uiManager";
import { ActionForm } from "../../lib/prismarinedb";

uiManager.addUI(config.uiNames.Config.Main, "Main Settings", (player)=>{
    let form = new ActionForm();
    form.title("§dMain Settings")
    form.button(`§dDocs\n§7${config.info.documentation}`, "textures/blocks/cherry_leaves", (player)=>{})
    form.button(`§dUI Builder\n§7Make custom UIs`, "textures/azalea_icons/GUIMaker/FormsV2.png", (player)=>{
        uiManager.open(player, config.uiNames.UIBuilder.Root)
    })
    form.button(`§dWarps\n§7Make server warps`, "textures/azalea_icons/server.png", (player)=>{
        uiManager.open(player, config.uiNames.Warps.Root)
    })
    form.button(`§dRanks\n§7Make Ranks`, "textures/azalea_icons/11.png", (player)=>{
        uiManager.open(player, config.uiNames.Ranks.Root)
    })
    form.show(player)
})