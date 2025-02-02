import { ActionForm } from "../../lib/prismarinedb";
import voting from "../../apis/voting";
import uiManager from "../../uiManager";
import config from "../../apis/config";

uiManager.addUI(config.uiNames.Voting.Admin, 'voting admin', (player) => {
    let form = new ActionForm();
    form.title('Voting Admin')
    form.button('§cBack\n§7Back to previous UI', 'textures/azalea_icons/2', (player) => {
        uiManager.open(player, config.uiNames.Voting.Root)
    })
    form.button(`§aStart\n§7Start a referendum`, 'textures/azalea_icons/1', (player) => {
        uiManager.open(player, config.uiNames.Voting.Start)
    })
    for (const r of voting.db.findDocuments({ type: 'Referendum' })) {
        form.button(`§d${r.data.title}\n§7[ Edit Referendum ]`, r.data.icon ? r.data.icon : null, (player) => {
            uiManager.open(player, config.uiNames.Voting.Edit, r.id)
        })
    }
    form.show(player)
})