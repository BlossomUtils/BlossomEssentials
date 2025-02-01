import { ModalFormData } from "@minecraft/server-ui";
import uiManager from "../../uiManager";
import config from "../../apis/config";
import sell from "../../apis/sell";
import { prismarineDb } from "../../lib/prismarinedb";

uiManager.addUI(config.uiNames.Sell.SellItem, 'sellitem', (player,id,catid)=>{
    let item = sell.get(id)
    let cat = sell.get(catid)
    if(sell.hasItem(player, item.data.typeID) == 0) return player.error('You dont have this item')
    let form = new ModalFormData();
    form.title('Sell Item')
    form.slider('Quantity', 1, sell.hasItem(player, item.data.typeID), 1, 1)
    form.show(player).then((res) => {
        let q = res.formValues[0]
        let s = sell.sell(player, id, catid, q)
        if(!s) return player.error('An error occured');
        player.success('Sold item for ' + item.data.price + ' ' + prismarineDb.economy.getCurrency(item.data.currency).displayName)
    })
})