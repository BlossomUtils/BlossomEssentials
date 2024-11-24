import * as config from '../../config'
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";
import './add'
import './items'
import './removeItems'
import './edit'
import './editItems'
import './buyQuantity'
import './editCurrency'

uiManager.addUI("admin.shop | admin.shop.root", "Shop root", (player)=>{
    let form = new ActionForm();
    form.title("§bShop Config")
    form.button(`§bAdd\n§7Add an item`, null, (player)=>{
        uiManager.open(player, "admin.shop.addItem")
    })
    form.button(`§bRemove\n§r§7Remove an item`, null, (player)=>{
        uiManager.open(player, "admin.shop.remove")
    })
    form.button(`§bEdit\n§r§7Edit an item`, null, (player)=>{
        uiManager.open(player, "admin.shop.edit.list")
    })
    form.button(`§bEdit Currency\n§r§7Edit the scoreboard objective`, null, (player)=>{
        uiManager.open(player, "admin.shop.editCurrency")
    })
    form.show(player)
})