import { ModalFormData } from "@minecraft/server-ui";
import uiManager from "../../uiManager";
import config from "../../apis/config";
import modules from "../../apis/modules";

uiManager.addUI(config.uiNames.Config.XRay, 'XRAY CONFIG', (player) => {
    let form = new ModalFormData();
    form.title('Xray Config')
    form.textField(`Message`, 'Enter xray alert message..', modules.get('xrayAlertMessage'))
    form.toggle(`Enabled`, modules.get(`xrayAlerts`))
    form.show(player).then((res) => {
        let[message,enabled] = res.formValues
        if(!message) return player.error('No message in message field. Please enter message');
        modules.set(`xrayAlertMessage`, message)
        modules.set(`xrayAlerts`, enabled)
        return uiManager.open(player, config.uiNames.Config.Extra)
    })
})