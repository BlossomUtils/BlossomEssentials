import sell from "../../apis/sell";
import uiManager from "../../uiManager";
import config from "../../apis/config";
import { ActionForm, prismarineDb } from "../../lib/prismarinedb";
import { ModalFormData } from "@minecraft/server-ui";
import { isNumeric } from "../../functions";

uiManager.addUI(config.uiNames.Sell.EditItem, 'sell edit item', (player, id, catid) => {
    let cat = sell.get(catid)
    let item = sell.get(id)
    let form = new ActionForm();
    form.title('Edit Item')
    form.button(`§cBack\n§7Go to previous UI`, "textures/azalea_icons/2.png", (player) => {
        uiManager.open(player, config.uiNames.Sell.EditCategory, catid)
    })
    form.button(`§bEdit Values\n§7Edit this item's values`, 'textures/azalea_icons/ClickyClick', (player) => {
        let f = new ModalFormData();
        f.title('Edit Values')
        f.textField('Display', 'Edit display..', item.data.display)
        f.textField('Price', 'Edit price..', item.data.price)
        f.show(player).then((res) => {
            let [display, price] = res.formValues
            if(!isNumeric(price)) return player.error('Price is not numeric');
            if(!display) return player.error('Please enter a display');
            sell.editItem(id,display,price)
        })
    })
    form.button(`§dEdit Icon\n§7Edit this item's icon`, item.data.icon ? item.data.icon : null, (player) => {
        uiManager.open(player, config.uiNames.IconViewer, 'azalea_icons', 'sell_item', id, cat.id);
    })
    form.show(player)
})