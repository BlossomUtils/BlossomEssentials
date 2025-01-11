import { ActionForm } from "../../../../lib/form_func";
import uiManager from "../../../../uiManager";
import config from "../../../../apis/config";
import reports from "../../../../apis/reports";

uiManager.addUI(config.uiNames.Moderation.Reports.Admin.Dashboard, 'Reports admin dashboard', (player) => {
    let form = new ActionForm();
    form.title('Reports')
    form.button('§cBack\n§7[ Go back ]', 'textures/azalea_icons/2.png', (player) => {
        uiManager.open(player, config.uiNames.Config.Moderation)
    })
    for(const report of reports.getAll()) {
        form.button(`§a${report.data.title}\n§7Made by ${report.data.player}`, null, (player) => {
            uiManager.open(player, config.uiNames.Moderation.Reports.Admin.View, report.id)
        })
    }
    form.show(player)
})