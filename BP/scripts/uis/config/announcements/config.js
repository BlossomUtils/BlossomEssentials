import { ModalFormData } from "@minecraft/server-ui";
import uiManager from "../../../uiManager";
import modules from "../../../apis/modules";
import config from "../../../apis/config";

uiManager.addUI(config.uiNames.Config.Announcements.Options, 'announcements config', (player) => {
    let i;
    if (modules.get('announcementType') === 'chat') i = 0;
    if (modules.get('announcementType') === 'actionbar') i = 1;
    if (modules.get('announcementType') === 'ui') i = 2;
    let types = [{ val: 'chat', display: 'Chat' }, { val: 'actionbar', display: 'Actionbar' }, { val: 'ui', display: 'UI' }]
    let form = new ModalFormData();
    form.title('Announcement config')
    form.dropdown('Type', types.map(_ => _.display), i)
    form.show(player).then((res) => {
        let [i2] = res.formValues
        let type = types[i2]
        if(!type) return
        modules.set('announcementType', type.val)
        uiManager.open(player, config.uiNames.Config.Announcements.Root)
    })
})