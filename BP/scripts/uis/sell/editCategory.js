import { ModalFormData } from "@minecraft/server-ui";
import { ActionForm, prismarineDb } from "../../lib/prismarinedb";
import sell from "../../apis/sell";
import config from "../../apis/config";
import uiManager from "../../uiManager";
import { isNumeric } from "../../functions";

uiManager.addUI(config.uiNames.Sell.EditCategory, 'Edit Category', (player, id) => {
    let form = new ActionForm();
    let cat = sell.get(id)
    if (!cat) return player.error('Category not found');
    form.title('§dEdit Category')
    form.button(`§cBack\n§7Go to previous UI`, "textures/azalea_icons/2.png", (player) => {
        uiManager.open(player, config.uiNames.Sell.Admin)
    })
    form.button(`§bEdit Values\n§7Edit values of category`, `textures/azalea_icons/ClickyClick`, (player) => {
        let f = new ModalFormData();
        let currencies = prismarineDb.economy.getCurrencies()
        f.title('Edit Values')
        f.textField(`Name§c*`, `Enter category name..`, cat.data.name)
        f.dropdown(`Currency§c*`, currencies.map(_ => _.displayName), currencies.findIndex(_ => _.scoreboard == cat.data.currency))
        f.textField(`Description§c*`, `Enter category description..`, cat.data.description)
        f.textField(`Required tag`, `Leave blank if no required tag`, cat.data.requiredTag)
        f.show(player).then((res) => {
            let [name, i, description, requiredtag] = res.formValues
            let currency = prismarineDb.economy.getCurrencies()[i]
            if (!name || !description) return player.error('Missing fields')
            sell.editCategory(id, name, currency.scoreboard, description, requiredtag, null)
            uiManager.open(player, config.uiNames.Sell.EditCategory, id)
        })
    })
    form.button(`§dEdit Icon\n§7Edit this category's icon`, cat.data.icon ? cat.data.icon : null, (player) => {
        uiManager.open(player, config.uiNames.IconViewer, 'azalea_icons', 'sell_category', cat.id)
    })
    form.button(`§aEdit Items\n§7Edit items in this category`, 'textures/azalea_icons/EditShop', (player) => {
        function parseItemID(id) {
            let text = id.split(':')[1];
            return text.split('_').map(_=>`${_[0].toUpperCase()}${_.substring(1)}`).join(' ');
        }
        let f = new ActionForm();
        f.title('Edit Items')
        f.button(`§cBack\n§7Go to previous UI`, "textures/azalea_icons/2.png", (player) => {
            uiManager.open(player, config.uiNames.Sell.EditCategory, id)
        })
        f.button(`§aAdd Item\n§7Add an item to the category`, `textures/azalea_icons/1.png`, (player) => {
            let inv = player.getComponent('inventory');
            let items = [];
            for(let i = 0;i < inv.container.size;i++) {
                if(inv.container.getItem(i)) items.push([inv.container.getItem(i), i])
            }
            let f2 = new ActionForm();
            f2.button("§cBack\n§7Go back", `textures/blocks/barrier`, (player)=>{
                f.show(player)
            })
            for(const item of items) {
                f2.button(`§b${item[0].nameTag ? item[0].nameTag : parseItemID(item[0].typeId)}\n§7${item[0].typeId}`, null, (player)=>{
                    let f3 = new ModalFormData();
                    f3.title('Select Price')
                    f3.textField('Item Price', 'Price of item.. Example: 500', null)
                    f3.show(player).then((res) => {
                        let price = res.formValues[0]
                        if(!isNumeric(price)) return player.error('Must be a number')
                        sell.addItem(item[0].typeId, item[0].nameTag ? item[0].nameTag : parseItemID(item[0].typeId), cat.id, price)
                    })
                })
            }
            f2.show(player, false, (player)=>{
                
            })
        })
        for(const i of cat.data.items) {
            let item = sell.get(i)
            f.button(`§b${item.data.display}\n§7${item.data.price} ${prismarineDb.economy.getCurrency(item.data.currency).displayName}`, item.data.icon ? item.data.icon : null, (player)=>{
                uiManager.open(player, config.uiNames.Sell.EditItem, item.id, cat.id)
            })
        }
        f.show(player)
    })
    form.button(`§cRemove Category\n§7Delete this category`, 'textures/azalea_icons/Delete', (player)=>{
        sell.remove(id)
        uiManager.open(player, config.uiNames.Sell.Admin)
    })
    form.show(player)
})