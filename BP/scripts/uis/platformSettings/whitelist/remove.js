import uiManager from "../../../uiManager";
import platformAPI from "../../../apis/platformAPI";
import { ActionForm } from "../../../lib/prismarinedb";
import config from "../../../apis/config";

uiManager.addUI(config.uiNames.platformSettings.Whitelist.Remove, "Platform settings root", (player) => {
    let form = new ActionForm();
    form.title("Platform Whitelist");
    for (const doc of platformAPI.getDb()) {
        form.button(`§c${doc.data.name}\n§7[ Remove ]`, null, (player) => {
            platformAPI.removeFromWhitelist(doc.data.name)
            uiManager.open(player, config.uiNames.platformSettings.Whitelist.Root)
        })
    }
    form.show(player)
})