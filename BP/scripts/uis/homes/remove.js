import config from "../../apis/config"
import homeAPI from "../../apis/homeAPI";
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.Homes.Remove, "Homes UI", (player) => {
    const list = homeAPI.findAllFromPlayer(player.name)
    let form = new ActionForm();
    form.title("§dHomes");

    form.button(`§cBack\n§7[ Go Back ]`, null, (player) => {
        uiManager.open(player, config.uiNames.Homes.Root)
    });
    for (const doc of list) {
        form.button(`§d${doc.data.name}\n§7[ Click to remove ]`, null, (player) => {
            player.success(`Deleted home with name ${doc.data.name}`)
            homeAPI.remove(player, doc.data.name)
        });
    }

    form.show(player);
});