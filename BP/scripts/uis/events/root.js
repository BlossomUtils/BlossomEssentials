import { ActionForm } from "../../lib/prismarinedb";
import events from "../../apis/events";
import uiManager from "../../uiManager";
import config from "../../apis/config";

uiManager.addUI(config.uiNames.Events.Root, 'events root', (player)=>{
    let form = new ActionForm();
    form.title('Events')
    form.button('§aAdd\n§7Add an event', 'textures/blossom_icons/add', (player) => {
        uiManager.open(player, config.uiNames.Events.Add)
    })
    for (const event of events.getAll()) {
        form.button(`§d${event.data.display}\n§7Kill Event`, 'textures/blossom_icons/sword', (player)=>{
            uiManager.open(player, config.uiNames.Events.Edit, event.id)
        })
    }
    form.show(player)
})