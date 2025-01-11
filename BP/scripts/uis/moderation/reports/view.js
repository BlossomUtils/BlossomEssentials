import { ActionForm } from "../../../lib/form_func";
import uiManager from "../../../uiManager";
import config from "../../../apis/config";
import reports from "../../../apis/reports";

uiManager.addUI(config.uiNames.Moderation.Reports.View, 'Report viewer', (player, id) => {
    let report = reports.get(id)
    let form = new ActionForm();
    form.title(`${report.data.title}`)
    form.body(`§dMade by ${report.data.player}
Body: ${report.data.body}
Type: ${report.data.type}`)
    form.button(`§cBack\n§7[ Go back ]`, 'textures/azalea_icons/2.png', (player) => {
        uiManager.open(player, config.uiNames.Moderation.Reports.Dashboard)
    })
    form.show(player)
})