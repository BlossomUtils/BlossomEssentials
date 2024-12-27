import uiManager from "../../uiManager";
import { prismarineDb } from "../../lib/prismarinedb";
import { ModalForm } from "../../lib/form_func";
import config from "../../apis/config";

uiManager.addUI(config.uiNames.Economy.Add, "Economy add", (player, currency)=>{
    let form = new ModalForm()
    let display = currency ? currency.displayName : undefined
    let scoreboard = currency ? currency.scoreboard : undefined
    form.title("Add Currency")
    form.textField("Display Name", "Example: Money", display)
    form.textField("Scoreboard", "Example: money", scoreboard)
    form.show(player, false, (player, response)=>{
        if(currency) {
            prismarineDb.economy.editDisplayName(currency.scoreboard, response.formValues[0])
            prismarineDb.economy.editScoreboard(currency.scoreboard, response.formValues[1])
            player.success("Edited currency")
        } else {
            prismarineDb.economy.addCurrency(response.formValues[1], null, response.formValues[0])
            player.success("Created new currency")
        }
    })
})