import uiManager from "../../uiManager";
import { ActionForm } from "../../lib/prismarinedb";
import config from "../../apis/config";
import * as mc from "@minecraft/server"
import './credits'
import './main'
import './modules'

mc.world.afterEvents.itemUse.subscribe((e) => {
    if (e.itemStack.typeId === config.details.configItem) {
        if(!e.source.hasTag('admin')) return e.source.error("You can't use this item!")
        uiManager.open(e.source, config.uiNames.Config.Root)
    }
})

uiManager.addUI(config.uiNames.Config.Root, "Admin Main", (player)=>{
    let form = new ActionForm();
    form.title("§f§u§l§l§s§c§r§e§e§n§r§dConfig UI")
    form.button(`§dWelcome!\n§7This is ${config.info.name} version ${config.info.version}`, "textures/blocks/cherry_leaves", (player)=>{})
    form.button(`§dMain Settings\n§7Configuration`, "textures/items/settings.png", (player)=>{
        uiManager.open(player, config.uiNames.Config.Main)
    })
    form.button(`§dModules\n§7Edit modules in ${config.info.name}`, "textures/azalea_icons/ClickyClick.png", (player)=>{
        uiManager.open(player, config.uiNames.Config.Modules)
    })
    form.button(`§dCredits\n§r§7View credits`, "icons/icon.png", (player)=>{
        uiManager.open(player, config.uiNames.Config.Credits)
    })
    form.show(player)
})