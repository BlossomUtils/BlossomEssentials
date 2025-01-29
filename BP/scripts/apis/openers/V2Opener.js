import { ActionForm as buttonform } from "../../lib/form_func";
import actionParser from "../actionParser";
import blossomFormatting from "../blossomFormatting";

class V2Opener {
    open(ui, plr) {
        let form = new buttonform();
        let pre = `§r`;
        if (!ui) return;
        if (ui.layout == 1) pre = `§g§r§i§d§u§i§r`;
        if (ui.layout == 2) pre = `§f§u§l§l§s§c§r§e§e§n§r`;
        if (ui.layout == 3) pre = `§t§e§s§t§r`

        form.title(`${pre}${blossomFormatting.format(ui.name, plr)}`)
        if (ui.body) form.body(ui.body);
        if (ui.buttons.length === 0) form.button(`Close UI`, `textures/azalea_icons/Delete.png`, (player) => { })
        for (const button of ui.buttons) {
            if(button.requiredTag && !plr.hasTag(button.requiredTag)) continue;
            form.button(`${blossomFormatting.format(button.text, plr)}\n§7${blossomFormatting.format(button.subtext ? button.subtext : ``, plr)}`, button.icon ? button.icon : null, (player) => {
                if(!button.actions) return actionParser.runAction(player, button.action);
                for(const action of button.actions) {
                    actionParser.runAction(player, action)
                }
            })
        }
        form.show(plr, false, (player, response) => {})
    }
}

export default new V2Opener();