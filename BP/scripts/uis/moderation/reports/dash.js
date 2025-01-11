import { ActionForm } from "../../../lib/form_func";
import uiManager from "../../../uiManager";
import config from "../../../apis/config";
import reports from "../../../apis/reports";

uiManager.addUI(config.uiNames.Moderation.Reports.Dashboard, 'Reports admin dashboard', (player) => {
    let form = new ActionForm();
    form.title('Reports')
    form.button('§aCreate\n§7[ Create Report ]', 'textures/azalea_icons/1.png', (player) => {
        uiManager.open(player, config.uiNames.Moderation.Reports.Create)
    })
    for(const report of reports.getFromPlayer(player)) {
        form.button(`§a${report.data.title}`, null, (player) => {
            uiManager.open(player, config.uiNames.Moderation.Reports.View, report.id)
        })
    }
    form.show(player)
})