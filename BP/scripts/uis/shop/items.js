import { world } from "@minecraft/server";
import shopAPI from "../../api/shopAPI";
import config from "../../apis/config";
import { ActionForm, prismarineDb } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.Shop.Items, "Shop UI", (player)=>{
    let allItems = shopAPI.fetchAllItems();
    let form = new ActionForm();
    form.title("§f§u§l§l§s§c§r§e§e§n§r§bShop UI")
    console.log(allItems)
        form.button(`§cClose\n§7Close UI`, "textures/azalea_icons/Delete.png", (player)=>{})
    for (const item of allItems) {
        form.button(`§b${item.data.display}\n§7${item.data.price} ${prismarineDb.economy.getCurrency(world.getDynamicProperty("simple:money")).displayName}`, "textures/azalea_icons/BuyItem.png", (player)=>{
            uiManager.open(player, config.uiNames.Shop.Buy, item.data.itemID)
        })
    }
    form.show(player)
})