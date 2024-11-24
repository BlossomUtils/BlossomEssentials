import shopAPI from "../../api/shopAPI";
import config from "../../apis/config";
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.Shop.EditItems, "Shop UI", (player)=>{
    let allItems = shopAPI.fetchAllItems();
    let form = new ActionForm();
    if (allItems === false) return player.error("No items in shop");
    form.title("§bShop UI")
    for (const item of allItems) {
        form.button(`§b${item.data.display}\n§7[ Edit (${item.data.itemID}) ]`, null, (player)=>{
            uiManager.open(player, "admin.shop.edit", item.data.itemID)
        })
    }
    form.show(player)
})