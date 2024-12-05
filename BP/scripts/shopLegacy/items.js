import shopAPI from "../../api/shopAPI";
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI("players.shop | players.shop.items", "Shop UI", (player)=>{
    let allItems = shopAPI.fetchAllItems();
    let form = new ActionForm();
    form.title("§bShop UI")
    console.log(allItems)
        form.button(`§cClose\n§7Close UI`, "textures/azalea_icons/Delete.png", (player)=>{
        })
    for (const item of allItems) {
        form.button(`§b${item.data.display}\n§7[ Buy (Price: ${item.data.price}) ]`, "textures/azalea_icons/BuyItem.png", (player)=>{
            uiManager.open(player, "players.shop.buy", item.data.itemID)
        })
    }
    form.show(player)
})