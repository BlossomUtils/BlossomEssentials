import icons from '../icons'
import { ChestFormData } from '../../lib/chestUI'
import uiManager from '../../uiManager'
import { ActionForm } from '../../lib/prismarinedb'
import config from '../config'
import { getPack } from '../../icons/iconPack'
import UIBuilderV2 from '../UIBuilderV2'
import shop from '../shop'
import sell from '../sell'

uiManager.addUI(config.uiNames.IconViewer, "View icons", (player, set = "azalea_icons", type = null, ui = null, button = null) => {
    let form = new ChestFormData("54")
    let pack = getPack(set)
    if (!pack) throw new Error("No pack defined/Pack defined is invalid")
    form.title("Icon Viewer")
    for(let i = 0;i < 54;i++) {
        form.button(i, `§cX`, [], `textures/blocks/glass_gray`, 1, false, ()=>{
            uiManager.open(player, config.uiNames.IconViewer, set, type, ui, button)
        })
    }
    pack.icons.slice(0, 54).forEach((icon, i) => {
        form.button(
            i,
            `${pack.namespace}:${icon.name}`,
            ["Add this icon"],
            `${icon.path}`,
            1,
            false,
            () => {
                if(type == 'uiBuilder') {
                UIBuilderV2.editButton(button.id, ui.id, button.text, button.subtext, icon.path, button.requiredTag)
                uiManager.open(player, config.uiNames.UIBuilderV2.EditButton, ui, button)
                }
                if(type == 'shop_category') {
                    let cat = shop.get(ui)
                    shop.editCategory(ui,cat.data.name,cat.data.description,cat.data.currency,icon.path)
                    uiManager.open(player, config.uiNames.NewShop.EditCategory, cat.id)
                }
                if(type == 'shop_item') {
                    let item = shop.get(ui)
                    shop.editItem(ui,item.data.display,item.data.price,icon.path)
                    uiManager.open(player, config.uiNames.NewShop.EditItem, ui, button)
                }
                if(type == 'sell_item') {
                    let item = sell.get(ui)
                    sell.editItem(ui,item.data.display,item.data.price,icon.path)
                    uiManager.open(player, config.uiNames.Sell.EditItem, ui, button)
                }
                if(type == 'sell_category') {
                    let item = sell.get(ui)
                    sell.editCategory(ui,item.data.name,item.data.currency,item.data.description,null,icon.path)
                    uiManager.open(player, config.uiNames.Sell.EditCategory, ui)
                }
            }
        );
    });
    if (pack.nextPack) {
    form.button(50, `§aNext Page`, [`§7Go to the next page`], `textures/blocks/glass_lime`, 1, false, () => {
        if(!ui) {
            uiManager.open(player, config.uiNames.IconViewer, pack.nextPack, type)
        } else {
            uiManager.open(player, config.uiNames.IconViewer, pack.nextPack, type, ui, button)
        }       
    })
}
if (pack.previousPack) {
    form.button(48, `§cPrevious Page`, [`§7Go to the previous page`], `textures/blocks/glass_red`, 1, false, () => {
        if(!ui) {
            uiManager.open(player, config.uiNames.IconViewer, pack.previousPack, type)
        } else {
            uiManager.open(player, config.uiNames.IconViewer, pack.previousPack, type, ui, button)
        }       
    })
}

    form.show(player)
})
