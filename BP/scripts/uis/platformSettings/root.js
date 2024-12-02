import uiManager from "../../uiManager";
import platformAPI from "../../apis/platformAPI";
import { ActionForm } from "../../lib/prismarinedb";
import config from "../../apis/config";

uiManager.addUI(config.uiNames.platformSettings.Root, "Platform settings root", (player) =>{
    let form = new ActionForm();
    form.title("Platform Settings")
    form.button(`§dWhitelist\n§7Exempt people from bans`, null, (player)=>{
        uiManager.open(player, config.uiNames.platformSettings.Whitelist.Root)
    })
    for (const plf of platformAPI.platforms) {
        form.button(`§d${plf}\n§7Edit ${plf} settings`, null, (player)=>{
            uiManager.open(player, config.uiNames.platformSettings.Edit, plf)
        })
    }
    form.show(player)
})