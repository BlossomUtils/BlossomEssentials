import { prismarineDb } from "../../../lib/prismarinedb";
import { ActionForm } from "../../../lib/form_func";
import uiManager from "../../../uiManager";
import config from "../../../apis/config";
import warnings from "../../../apis/warnings";

uiManager.addUI(config.uiNames.Moderation.Warnings.Root, 'meow', (player) => {
    let form = new ActionForm()
    form.title('§dWarnings')
    form.button('§l§aCreate Warning\n§r§7[Create Warning]', null, (player) => {
        uiManager.open(player, config.uiNames.Moderation.Warnings.Add)
    })
    try {
        const allWarnings = warnings.getAllWarnings?.() || [];
        for(const w of allWarnings) {
            if (w && w.data) {
                form.button(`§d${w.data.name}\n§7${w.data.reason}`, null, (player) => {
                    uiManager.open(player, config.uiNames.Moderation.Warnings.View, w.id)
                })
            }
        }
    } catch (error) {
        console.warn(`Failed to load warnings: ${error}`);
    }
    
    form.show(player)
})