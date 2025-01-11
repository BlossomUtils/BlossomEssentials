import { ActionForm } from "../../../lib/form_func";
import warnings from "../../../apis/warnings";
import uiManager from "../../../uiManager";
import config from "../../../apis/config";

uiManager.addUI(config.uiNames.Moderation.Warnings.View, 'view wranign', (player, id) => {
    let w = warnings.getWarn(id)
    let form = new ActionForm()
    form.title(`${w.data.name}`)
    form.body(`§dReason: ${w.data.reason}\n§dIssued By: ${w.data.admin}`)
    form.button(`§l§cRemove\n§r§7[Remove Warning]`, null, (player) => {
        warnings.remove(w.id)
        uiManager.open(player, config.uiNames.Moderation.Warnings.Root)
    })
    form.button(`§l§aBack\n§r§7[Back]`, null, (player) => {
        uiManager.open(player, config.uiNames.Moderation.Warnings.Root)
    })
    form.show(player)
})