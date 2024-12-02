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
    form.button(`§dCustom Commands\n§7Make custom commands`, "textures/azalea_icons/CustomCommands.png", (player)=>{
        uiManager.open(player, config.uiNames.CustomCommands.Root)
    })
    form.button(`§dWarps\n§7Make server warps`, "textures/azalea_icons/server.png", (player)=>{
        uiManager.open(player, config.uiNames.Warps.Root)
    })
    form.button(`§dRanks\n§7Make Ranks`, "textures/azalea_icons/11.png", (player)=>{
        uiManager.open(player, config.uiNames.Ranks.Root)
    })
    form.button(`§dPlatform settings\n§7Configure how platforms behave`, "textures/azalea_icons/Wrench.png", (player)=>{
        uiManager.open(player, config.uiNames.platformSettings.Root)
    })
    form.button(`§dShop\n§7Configure the shop`, "textures/azalea_icons/12.png", (player)=>{
        uiManager.open(player, config.uiNames.Shop.Root)
    })
    form.show(player)
})