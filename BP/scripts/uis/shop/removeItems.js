import shopAPI from "../../api/shopAPI";
import config from "../../apis/config";
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.Shop.RemoveItems, "Shop UI", (player)=>{
    let allItems = shopAPI.fetchAllItems();
    let form = new ActionForm();
    if (allItems === false) return player.error("No items in shop");
    form.title("§bShop UI")
    for (const item of allItems) {
        form.button(`§b${item.data.display}\n§7[ Delete (${item.data.itemID}) ]`, null, (player)=>{
            shopAPI.removeItem(item.data.itemID, player)
        })
    }
    form.show(player)
})