import { ModalFormData } from '@minecraft/server-ui'
import uiManager from '../../../uiManager'
import config from '../../../apis/config'
import reports from '../../../apis/reports'

let types = ['Player', 'Bug']
uiManager.addUI(config.uiNames.Moderation.Reports.Create, 'Report creator', (player) => {
    let form = new ModalFormData()
    form.title('Create Report')
    form.textField('Title', 'Report title..', null)
    form.textField('Body', 'Report body..', null)
    form.dropdown('Type', types, 0)
    form.show(player).then((res) => {
        if(res.canceled) return uiManager.open(player, config.uiNames.Moderation.Reports.Dashboard)
        let [ title, body ] = res.formValues
        let type = types[res.formValues[2]]
        if(!title) return player.error('Title required')
        if(!body) return player.error('Body required')
        reports.create(player, title, type, body)
        player.success('Report created!')
        uiManager.open(player, config.uiNames.Moderation.Reports.Dashboard)
    })
})