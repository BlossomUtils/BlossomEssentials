import { ActionForm, prismarineDb } from "../../lib/prismarinedb";
import config from "../../apis/config";
import uiManager from "../../uiManager";
import shop from "../../apis/shop";

uiManager.addUI(config.uiNames.NewShop.ViewCategory, 'View category', (player, id) => {
    let cat = shop.get(id)
    let form = new ActionForm();
    form.title(`${cat.data.name}`)
    form.button(`§cBack\n§7Go to previous UI`, "textures/azalea_icons/2.png", (player) => {
        uiManager.open(player, config.uiNames.NewShop.Root)
    })
    for (const i of cat.data.items) {
        let item = shop.get(i)
        if(item.data.type != 'Item') continue;
        form.button(`§d${item.data.display}\n§7${item.data.price} ${prismarineDb.economy.getCurrency(cat.data.currency).displayName}`, item.data.icon ? item.data.icon : null, (player)=>{
            uiManager.open(player, config.uiNames.NewShop.BuyItem, item.id, cat.id)
        })
    }
    form.show(player)
})