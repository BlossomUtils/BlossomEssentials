import { world } from '@minecraft/server'
import { ActionFormData } from '@minecraft/server-ui'
import uiManager from '../../uiManager'

uiManager.addUI('json_ui_test', 'Json UI testing', (player) => {
    const customUI = new ActionFormData()
        .title('meow')
        .body('')
        .button(`button`)
        .show(player)
})