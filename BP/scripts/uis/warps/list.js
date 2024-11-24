import config from "../../apis/config"
import warpAPI from "../../apis/warpAPI";
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.Warps.List, "Warps UI", (player) => {
    const list = warpAPI.getAll();
    let form = new ActionForm();
    form.title("§dWarps");

    form.button(`§cBack\n§7[ Go Back ]`, null, (player) => {});
    for (const doc of list) {
        form.button(`§d${doc.data.name}\n§7[ Click to teleport ]`, null, (player) => {
            warpAPI.tpTo(doc.data.name, player)
        });
    }

    form.show(player);
});