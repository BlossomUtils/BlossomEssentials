import { ActionForm } from "../../../lib/prismarinedb";
import uiManager from "../../../uiManager";
import config from "../../../apis/config";

uiManager.addUI(config.uiNames.Config.Announcements.Root, 'announcements root', (player)=>{
    let form = new ActionForm();
    form.title('Announcements')
    form.button('§dSend\n§7Send announcement to players', 'textures/azalea_icons/Chat', (player)=>{
        uiManager.open(player, config.uiNames.Config.Announcements.Send)
    })
    form.button('§dConfigure\n§7Set config for announcements', 'textures/items/settings', (player)=>{
        uiManager.open(player, config.uiNames.Config.Announcements.Options)
    })
    form.show(player)
})