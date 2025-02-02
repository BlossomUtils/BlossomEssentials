import { ModalFormData } from "@minecraft/server-ui";
import config from "../../apis/config";
import uiManager from "../../uiManager";
import events from "../../apis/events";

uiManager.addUI(config.uiNames.Events.Add, 'events add', (player) => {
    let form = new ModalFormData();
    let types = ['kill']
    form.title('Add Event')
    form.textField(`Display`, `Enter display..`, undefined)
    form.dropdown(`Type`, types, 0)
    form.show(player).then((res) => {
        let[display,t] = res.formValues
        let type = types[t]
        if(!display) return player.error('Enter a display');
        events.create(display,type)
        uiManager.open(player, config.uiNames.Events.Root)
    })
})