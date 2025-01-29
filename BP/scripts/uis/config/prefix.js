import { ModalFormData } from "@minecraft/server-ui";
import config from "../../apis/config";
import uiManager from "../../uiManager";
import modules from "../../apis/modules";

uiManager.addUI(config.uiNames.Config.Prefix, 'change prefix', (player)=>{
    let form = new ModalFormData();
    form.title('change prefix')
    form.textField('New Prefix', 'Prefix here..', modules.chatPrefix)
    form.show(player).then((res) => {
        let [pr] = res.formValues
        if(!pr) return player.error('Nothing entered idot');
        modules.set('chatPrefix', pr)
    })
})