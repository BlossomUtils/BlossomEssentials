import config from "../../apis/config";
import UIBuilderV2 from "../../apis/UIBuilderV2";
import { ActionForm } from "../../lib/form_func";
import uiManager from "../../uiManager";
import moment from "../../lib/moment"


uiManager.addUI(config.uiNames.UIBuilderV2.EditButtons, "UI builder v2 edit buttons", (player, ui)=>{
    let form = new ActionForm();
    let pre = `§r`;
    if (!ui) return;
    if (ui.data.layout == 1) pre = `§g§r§i§d§u§i§r`;
    if (ui.data.layout == 2) pre = `§f§u§l§l§s§c§r§e§e§n§r`;
    if (ui.data.layout == 3) pre = `§t§e§s§t§r`
    form.title(`${pre}§dUI Builder V2`)
    form.button("§cBack\n§7Go back to edit UI", `textures/azalea_icons/Delete.png`, (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderV2.Edit, ui)
    })
    form.button("§aAdd button\n§7Add a button to this UI", `textures/azalea_icons/1.png`, (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderV2.AddButton, ui)
    })
    for (const button of ui.data.buttons) {
        if(!button.id) {
            button.id = UIBuilderV2.generateUUID()
            UIBuilderV2.db.overwriteDataByID(ui.id, ui.data)
        }
        form.button(`${button.text}\n§7${button.subtext}`, button.icon ? button.icon : null, (player)=>{
            uiManager.open(player, config.uiNames.UIBuilderV2.EditButton, ui, button)
        })
    }
    form.show(player, false, (player, response)=>{})
})