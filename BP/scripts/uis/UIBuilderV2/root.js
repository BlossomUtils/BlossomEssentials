import config from "../../apis/config";
import UIBuilderV2 from "../../apis/UIBuilderV2";
import { ActionForm } from "../../lib/form_func";
import uiManager from "../../uiManager";
import moment from "../../lib/moment"


uiManager.addUI(config.uiNames.UIBuilderV2.Root, "UI builder v2 root", (player)=>{
    let form = new ActionForm();
    form.title("§f§u§l§l§s§c§r§e§e§n§r§dUI Builder V2")
    form.button("§cLegacy Forms\n§7Use legacy forms", `textures/azalea_icons/FormsV2.png`, (player)=>{
        uiManager.open(player, config.uiNames.UIBuilder.Root)
    })
    form.button("§aAdd UI\n§7Add a UI", `textures/azalea_icons/1.png`, (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderV2.Add)
    })
    for (const ui of UIBuilderV2.getUIs()) {
        form.button(`§d${ui.data.name}\n§7§d${ui.data.scriptevent} §7| §eLast updated ${moment(ui.updatedAt).fromNow()}`, `textures/azalea_icons/GUIMaker/FormsV2.png`, (player)=>{
            uiManager.open(player, config.uiNames.UIBuilderV2.Edit, ui)
        })
    }
    form.show(player, false, (player, response)=>{})
})