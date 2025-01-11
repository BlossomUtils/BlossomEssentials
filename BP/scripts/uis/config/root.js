import uiManager from "../../uiManager";
import { ActionForm } from "../../lib/prismarinedb";
import config from "../../apis/config";
import * as mc from "@minecraft/server"
import './credits'
import './main'
import './moderation'
import './modules'
import './extra'

mc.world.afterEvents.itemUse.subscribe((e) => {
    if (e.itemStack.typeId === config.details.configItem) {
        if(!e.source.hasTag('admin')) return e.source.error("You can't use this item!")
        uiManager.open(e.source, config.uiNames.Config.Root)
    }
})

uiManager.addUI(config.uiNames.Config.Root, "Admin Main", (player)=>{
    let form = new ActionForm();
    form.title("§t§e§s§t§r§dConfig UI")
    form.button(`§dWelcome!\n§7${config.info.name} v${config.info.version}`, "textures/blocks/cherry_leaves", (player)=>{})
    form.button(`§dMain Settings\n§7Configuration`, "textures/items/settings.png", (player)=>{
        uiManager.open(player, config.uiNames.Config.Main)
    })
    form.button(`§dExtra Settings\n§7More configuration`, "textures/azalea_icons/10.png", (player)=>{
        uiManager.open(player, config.uiNames.Config.Extra)
    })
    form.button(`§dModules\n§7Edit modules`, "textures/azalea_icons/ClickyClick.png", (player)=>{
        uiManager.open(player, config.uiNames.Config.Modules)
    })
    form.button(`§dModeration\n§7Bans, reports, etc`, "textures/azalea_icons/5.png", (player)=>{
        uiManager.open(player, config.uiNames.Config.Moderation)
    })
    form.button(`§dCredits\n§r§7View credits`, "textures/blossom_icons/credits.png", (player)=>{
        uiManager.open(player, config.uiNames.Config.Credits)
    })
    form.show(player)
})