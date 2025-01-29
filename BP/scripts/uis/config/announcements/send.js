import { ModalFormData } from "@minecraft/server-ui";
import uiManager from "../../../uiManager";
import config from "../../../apis/config";
import { announcement } from "./index";

uiManager.addUI(config.uiNames.Config.Announcements.Send, 'send announcement', (player)=>{
    let form = new ModalFormData();
    form.title('Send announcement')
    form.textField('Text', 'Enter text..', undefined)
    form.show(player).then((res) => {
        let [ text ] = res.formValues
        if(!text) return player.error('No text entered');
        announcement(text)
    })
})