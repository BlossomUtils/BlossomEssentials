import { ActionForm } from "../../lib/prismarinedb";
import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";
import shop from "../../apis/shop";
import config from "../../apis/config";
import { isNumeric } from "../../functions";

uiManager.addUI(config.uiNames.NewShop.EditItem, 'edit item', (player, id, catid) => {
    let form = new ActionForm();
    form.title('§dEdit item')
    let item = shop.get(id)
    let cat = shop.get(catid)
    form.button(`§cBack\n§7Go to previous UI`, "textures/azalea_icons/2.png", (player)=>{
        uiManager.open(player, config.uiNames.NewShop.EditCategory, catid)
    })
    form.button(`§dEdit values\n§7Edit values of this item`, `textures/azalea_icons/ClickyClick`, (player) => {
        let f = new ModalForm();
        f.title('§dEdit values')
        f.textField('Display', 'Enter display..', item.data.display)
        f.textField('Price', 'Enter price..', item.data.price)
        f.show(player, false, (player, res) => {
            let [display, price] = res.formValues
            if(!display) return player.error('Enter display')
            if(!isNumeric(price)) return player.error('Price must be a number');
            shop.editItem(id,display,price)
            form.show(player)
        })
    })
    form.button(`§dEdit Icon\n§7Edit this items's icon`, item.data.icon ? item.data.icon : null, (player) => {
        uiManager.open(player, config.uiNames.IconViewer, 'azalea_icons', 'shop_item', item.id, catid)
    })
    form.show(player)
})