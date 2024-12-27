import uiManager from "../../uiManager";
import { prismarineDb } from "../../lib/prismarinedb";
import { ActionForm } from "../../lib/prismarinedb";
import config from "../../apis/config";

uiManager.addUI(config.uiNames.Economy.Edit, "Economy Edit", (player, currency)=>{
    const form = new ActionForm()
    form.title(`§d${currency.displayName}`)
    form.button("§cBack\n§7Go back a page", 'textures/azalea_icons/2.png', (player)=>{
            uiManager.open(player, config.uiNames.Economy.Root)
        })
    form.button(`§dEdit Values\n§7Edit values of this currency`, 'textures/azalea_icons/9-old.png', (player)=>{
        uiManager.open(player, config.uiNames.Economy.Add, currency)
    })
    form.button(`§cRemove\n§7Delete this currency`, 'textures/azalea_icons/Delete.png', (player)=>{
        prismarineDb.economy.deleteCurrency(currency.scoreboard)
    })
    form.show(player)
})