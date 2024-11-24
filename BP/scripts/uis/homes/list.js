import config from "../../apis/config"
import homeAPI from "../../apis/homeAPI";
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";
import moment from '../../lib/moment'

uiManager.addUI(config.uiNames.Homes.List, "Warps UI", (player) => {
    const list = homeAPI.findAllFromPlayer(player.name)
    let form = new ActionForm();
    form.title("§dHomes");

    form.button(`§cBack\n§7[ Go Back ]`, null, (player) => {
        uiManager.open(player, config.uiNames.Homes.Root)
    });
    for (const doc of list) {
        form.button(`§d${doc.data.name}\n§7[ Created ${moment(doc.updatedAt).fromNow()} ]`, null, (player) => {
            homeAPI.teleportTo(player, doc.data.name)
            player.success(`Teleported to home with name: ${doc.data.name}`)
        });
    }

    form.show(player);
});