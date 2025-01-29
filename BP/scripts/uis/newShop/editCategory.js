import shop from "../../apis/shop";
import { ActionForm } from "../../lib/prismarinedb";
import { prismarineDb } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";
import config from "../../apis/config";
import { ModalForm } from "../../lib/form_func";
import { isNumeric } from "../../functions";

uiManager.addUI(config.uiNames.NewShop.EditCategory, 'Edit category', (player, id) => {
    let cat = shop.get(id)
    let form = new ActionForm()
    form.title('§dEdit Category')
    form.button(`§cBack\n§7Go to previous UI`, "textures/azalea_icons/2.png", (player)=>{
            uiManager.open(player, config.uiNames.NewShop.Admin)
        })
    form.button(`§dEdit Values\n§7Edit this category's values`, 'textures/azalea_icons/ClickyClick', (player) => {
        let form2 = new ModalForm();
        let cur = prismarineDb.economy.getCurrencies().findIndex(_=>_.scoreboard == cat.data.currency)
        form2.title('Create Category')
        form2.textField(`Name`, 'Name here..', cat.data.name)
        form2.dropdown("Currency", prismarineDb.economy.getCurrencies().map(_ => {
            return { option: `${_.displayName}`, callback() { } }
        }), cur)
        form2.textField('Description', 'Description here..', cat.data.description)
        form2.show(player, false, (player, res) => {
            let [name, i, description] = res.formValues
            if (!name || !description) return player.error('Please enter all fields');
            let currency = prismarineDb.economy.getCurrencies()[i]
            let cat2 = shop.editCategory(cat.id,name, description, currency.scoreboard, null)
            if (!cat2) return player.error('Something went wrong')
            form.show(player)
        })
    })
    form.button(`§dEdit Icon\n§7Edit this category's icon`, cat.data.icon ? cat.data.icon : null, (player) => {
        uiManager.open(player, config.uiNames.IconViewer, 'azalea_icons', 'shop_category', cat.id)
    })
    form.button(`§dEdit Items\n§7Edit this category's items`, 'textures/azalea_icons/EditShop', (player) => {
        function parseItemID(id) {
            let text = id.split(':')[1];
            return text.split('_').map(_=>`${_[0].toUpperCase()}${_.substring(1)}`).join(' ');
        }
        let f = new ActionForm();
        f.title('Edit Items')
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
                f2.button(`§b${item[0].nameTag ? item[0].nameTag : parseItemID(item[0].typeId)} x${item[0].amount}\n§7${item[0].typeId}`, null, (player)=>{
                    let f3 = new ModalForm();
                    f3.title('Select Price')
                    f3.textField('Item Price', 'Price of item.. Example: 500', null)
                    f3.show(player, false, (player,res)=>{
                        let price = res.formValues[0]
                        if(!isNumeric(price)) return player.error('Must be a number')
                        shop.addItem(item[0].typeId, item[0].typeId, cat.id, price)
                    })
                })
            }
            f2.show(player, false, (player)=>{
                
            })
        })
        for (const i of cat.data.items) {
            let item = shop.get(i)
            if(item.data.type != 'Item') continue;
            f.button(`§d${item.data.display}\n§7${item.data.price} ${prismarineDb.economy.getCurrency(cat.data.currency).displayName}`, item.data.icon ? item.data.icon : null, (player)=>{
                uiManager.open(player, config.uiNames.NewShop.EditItem, item.id, cat.id)
            })
        }
        f.show(player)
    })
    form.button(`§cDelete Category\n§7Delete this category`, 'textures/azalea_icons/Delete', (player)=>{
        shop.removeCategory(cat.id)
        uiManager.open(player, config.uiNames.NewShop.Admin)
    })
    form.show(player)
})