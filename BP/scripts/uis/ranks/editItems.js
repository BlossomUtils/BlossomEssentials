import config from "../../apis/config"
import ranks from "../../apis/ranks";
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.Ranks.EditItems, "Ranks UI", (player) => {
    const list = ranks.getAll();
    let form = new ActionForm();
    form.title("§dRanks");

    form.button(`§cBack\n§7[ Go Back ]`, null, (player) => {
        uiManager.open(player, config.uiNames.Ranks.Root)
    });
    for (const doc of list) {
        form.button(`§d${doc.data.tag}\n§7[ Click to edit ]`, null, (player) => {
            uiManager.open(player, config.uiNames.Ranks.Edit, doc.data.tag, doc.data.display)
        });
    }

    form.show(player);
});