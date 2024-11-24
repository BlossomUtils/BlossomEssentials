import config from "../../apis/config"
import warpAPI from "../../apis/warpAPI";
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.Warps.Remove, "Warps UI", (player) => {
    const list = warpAPI.getAll();
    let form = new ActionForm();
    form.title("§dRemove Warps");

    form.button(`§cBack\n§7[ Go Back ]`, null, (player) => {
        uiManager.open(player, config.uiNames.Warps.Root);
    });
    for (const doc of list) {
        form.button(`§d${doc.data.name}\n§7[ Click to remove ]`, null, (player) => {
            warpAPI.remove(doc.data.name, player)
        });
    }

    form.show(player);
});