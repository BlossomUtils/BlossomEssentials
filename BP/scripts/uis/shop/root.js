import config from '../../apis/config'
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";
import './add'
import './items'
import './removeItems'
import './edit'
import './editItems'
import './buyQuantity'
import './editCurrency'

uiManager.addUI(config.uiNames.Shop.Root, "Shop root", (player)=>{
    let form = new ActionForm();
    form.title("§bShop Config")
    form.button(`§bAdd\n§7Add an item`, null, (player)=>{
        uiManager.open(player, config.uiNames.Shop.Add)
    })
    form.button(`§bRemove\n§r§7Remove an item`, null, (player)=>{
        uiManager.open(player, config.uiNames.Shop.RemoveItems)
    })
    form.button(`§bEdit\n§r§7Edit an item`, null, (player)=>{
        uiManager.open(player, config.uiNames.Shop.EditItems)
    })
    form.button(`§bEdit Currency\n§r§7Edit the scoreboard objective`, null, (player)=>{
        uiManager.open(player, config.uiNames.Shop.editCurrency)
    })
    form.show(player)
})