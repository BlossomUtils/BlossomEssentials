import uiManager from "../../../uiManager";
import platformAPI from "../../../apis/platformAPI";
import { ActionForm } from "../../../lib/prismarinedb";
import config from "../../../apis/config";

uiManager.addUI(config.uiNames.platformSettings.Whitelist.Root, "Platform settings root", (player) => {
    let form = new ActionForm();
    form.title("Platform Whitelist");
    form.button(`§cBack\n§7Go back to platform settings`, null, (player) => {
        uiManager.open(player, config.uiNames.platformSettings.Root)
    })
    form.button(`§dAdd\n§7Add someone to the Whitelist`, null, (player) => {
        uiManager.open(player, config.uiNames.platformSettings.Whitelist.Add)
    })
    form.button(`§dRemove\n§7Remove someone from the Whitelist`, null, (player) => {
        uiManager.open(player, config.uiNames.platformSettings.Whitelist.Remove)
    })
    form.show(player)
})