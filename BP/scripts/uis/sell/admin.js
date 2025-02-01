import { ActionForm, prismarineDb } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";
import config from "../../apis/config";
import sell from "../../apis/sell";
import { ModalFormData } from "@minecraft/server-ui";

uiManager.addUI(config.uiNames.Sell.Admin, 'sell admin', (player) => {
    let form = new ActionForm();
    form.title('Sell Admin')
    form.button(`§cBack\n§7Go to previous UI`, "textures/azalea_icons/2.png", (player) => {
        uiManager.open(player, config.uiNames.Sell.Root)
    })
    form.button('§aAdd Category\n§7Create a category', 'textures/azalea_icons/1', (player) => {
        let f = new ModalFormData()
        f.title("Add Category")
        f.textField(`Name§c*`, `Enter category name..`, null)
        f.dropdown(`Currency§c*`, prismarineDb.economy.getCurrencies().map(_ => _.displayName), 0)
        f.textField(`Description§c*`, `Enter category description..`, null)
        f.textField(`Required tag`, `Leave blank if no required tag`, null)
        f.show(player).then((res) => {
            let [name, i, description, requiredtag] = res.formValues
            let currency = prismarineDb.economy.getCurrencies()[i]
            if (!name || !description) return player.error('Missing fields')
            sell.addCategory(name, currency.scoreboard, description, requiredtag)
            uiManager.open(player, config.uiNames.Sell.Admin)
        })
    })
    for (const cat of sell.db.findDocuments({ type: 'Category' })) {
        form.button(`${cat.data.name}\n§7${cat.data.description ? cat.data.description : '\uE565 ' + cat.data.currency}`, cat.data.icon ? cat.data.icon : null, (player) => {
            uiManager.open(player, config.uiNames.Sell.EditCategory, cat.id)
        })
    }
    form.show(player)
})