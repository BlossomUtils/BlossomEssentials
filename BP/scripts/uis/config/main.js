import config from "../../apis/config";
import uiManager from "../../uiManager";
import { ActionForm } from "../../lib/prismarinedb";

uiManager.addUI(config.uiNames.Config.Main, "Main Settings", (player)=>{
    let form = new ActionForm();
    form.title("§r§dMain Settings")
    form.button(`§dDocs\n§7${config.info.documentation}`, "textures/blocks/cherry_leaves", (player)=>{})
    form.button(`§dUI Builder\n§7Make custom UIs`, "textures/blossom_icons/ui", (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderV2.Root)
    })
    form.button(`§dCustom Commands\n§7Make custom commands`, "textures/azalea_icons/CustomCommands.png", (player)=>{
        uiManager.open(player, config.uiNames.CustomCommands.Root)
    })
    form.button(`§dSidebar Editor\n§7Make custom sidebars easily`, "textures/azalea_icons/Sidebar", (player)=>{
        uiManager.open(player, config.uiNames.SidebarEditor.Root)
    })
    form.button(`§dWarps\n§7Make server warps`, "textures/azalea_icons/server.png", (player)=>{
        uiManager.open(player, config.uiNames.Warps.Root)
    })
    form.button(`§dRanks\n§7Make Ranks`, "textures/blossom_icons/ranks.png", (player)=>{
        uiManager.open(player, config.uiNames.Ranks.Root)
    })
    form.button(`§dPlatform settings\n§7Configure how platforms behave`, "textures/blossom_icons/devices.png", (player)=>{
        uiManager.open(player, config.uiNames.platformSettings.Root)
    })
    form.button(`§dShop\n§7Configure the shop`, "textures/azalea_icons/12.png", (player)=>{
        uiManager.open(player, config.uiNames.Shop.Root)
    })
    form.show(player)
})