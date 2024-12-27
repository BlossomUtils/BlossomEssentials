import uiManager from "../../uiManager";
import { prismarineDb } from "../../lib/prismarinedb";
import { ActionForm } from "../../lib/prismarinedb";
import config from "../../apis/config";

uiManager.addUI(config.uiNames.Economy.Root, "Economy Root", (player) => {
    let form = new ActionForm();
    form.title("Economy")
    form.button("§cBack\n§7Go back to main page", 'textures/azalea_icons/2.png', (player)=>{
        uiManager.open(player, config.uiNames.Config.Extra)
    })
    form.button("§aAdd\n§7Add a new currency", 'textures/azalea_icons/1.png', (player)=>{
        uiManager.open(player, config.uiNames.Economy.Add)
    })
    for (const Currency of prismarineDb.economy.getCurrencies()) {
        form.button(`§d${Currency.displayName}\n§7Scoreboard: ${Currency.scoreboard}`, null, (player)=>{
            uiManager.open(player, config.uiNames.Economy.Edit, Currency)
        })
    }
    form.show(player)
})