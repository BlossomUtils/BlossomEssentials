import leaderboards from "../../apis/leaderboards";
import config from "../../apis/config";
import uiManager from "../../uiManager";
import { ModalFormData } from "@minecraft/server-ui";
import { prismarineDb, colors } from "../../lib/prismarinedb";

uiManager.addUI(config.uiNames.Leaderboards.Edit, 'leaderboards', (player,id)=>{
    let form = new ModalFormData();
    let lb = leaderboards.db.getByID(id)
    form.title('Edit Leaderboard')
    form.textField(`First Line`, 'Edit first line..', lb.data.firstLine)
    form.toggle(`Offline disabled?`, lb.data.offlineDisabled)
    form.dropdown(`Theme`, colors.getColorNamesColored(), colors.getColorCodes().findIndex(_=>_==lb.data.theme))
    form.show(player).then((res) => {
        let[line,offline,t] = res.formValues
        let theme = colors.getColorCodes()[t]
        leaderboards.edit(id,line,offline,theme)
    })
})