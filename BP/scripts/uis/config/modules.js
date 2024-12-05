import uiManager from "../../uiManager";
import moduleAPI from "../../apis/modules";
import config from "../../apis/config";
import { ModalForm } from '../../lib/form_func'
import * as mc from '@minecraft/server'

let toggleOptions = [
    { display: "Chat Ranks", property: "chatRanks", order: "0" },
    { display: "Binding", property: "binding", order: "1" },
    { display: "Platform Settings", property: "platform", order: "2" }
]

uiManager.addUI(config.uiNames.Config.Modules, "Change modules", (player) => {
    let modalForm = new ModalForm();
    modalForm.title("§t§e§s§t§dModules")
    for (const option of toggleOptions) {
        modalForm.toggle(option.display, moduleAPI.gdp(option.property))
    }
    modalForm.submitButton("Send");
    modalForm.show(player).then(res => {
        if (res.canceled) return uiManager.open(player, config.uiNames.Config.Root);

        for (const option of toggleOptions) {
            mc.world.setDynamicProperty(option.property, res.formValues[option.order])
        }
        moduleAPI.updateAll();
        uiManager.open(player, config.uiNames.Config.Root)
    });
})