import { ActionForm } from "../../lib/prismarinedb";
import { ModalFormData } from "@minecraft/server-ui";
import { prismarineDb } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";
import config from "../../apis/config";
import sell from "../../apis/sell";

uiManager.addUI(config.uiNames.Sell.ViewCategory, 'View category sell', (player,id)=>{
    let cat = sell.get(id)
    let form = new ActionForm();
    form.title(cat.data.name)
    form.button(`§cBack\n§7Back to previous UI`, 'textures/azalea_icons/2.png', (player)=>{
        uiManager.open(player, config.uiNames.Sell.Root);
    });
    for(const i of cat.data.items) {
        let item = sell.get(i)
        form.button(`§d${item.data.display}\n§7${item.data.price} ${prismarineDb.economy.getCurrency(cat.data.currency).displayName}`, item.data.icon ? item.data.icon : null, (player)=>{
            uiManager.open(player, config.uiNames.Sell.SellItem, i, id)
        })
    }
    form.show(player)
})