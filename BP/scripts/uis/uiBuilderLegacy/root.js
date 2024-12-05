// Added in v0.1
import { system, world } from "@minecraft/server";
import uiBuilder from "../../apis/uiBuilder";
import { ActionForm } from "../../lib/form_func";
import uiManager from "../../uiManager";
import moment from '../../lib/moment'
import { ChestFormData } from "../../lib/chestUI"
import config from "../../apis/config";
uiManager.addUI(config.uiNames.UIBuilder.Root, "UI Builder Root", (player)=>{
    let form = new ActionForm();
    form.title("§f§u§l§l§s§c§r§e§e§n§rUI Builder");
    form.button(`§aAdd\n§r§7Add a UI`, null, (player)=>{
        uiManager.open(player, config.uiNames.UIBuilder.Add);
    })
    // form.button(`§6Search\n§r§7Search your UIs`, icons.resolve("Packs/Asteroid/spyglass_flat"), (player)=>{
    //     uiManager.open(player, config.uiNames.UIBuilderSearch);
    // })
    for(const ui of uiBuilder.getUIs().sort((a,b)=>b.updatedAt-a.updatedAt)) {
        form.button(`§b${ui.data.name}\n§r§7${moment(ui.updatedAt).fromNow()}${ui.data.scriptevent.length <= 16 ? ` §f| §7${ui.data.scriptevent}` : ``}`, `textures/azalea_icons/ClickyClick`, (player)=>{
            uiManager.open(player, config.uiNames.UIBuilder.Edit, ui.id)
        })
    }
    form.show(player, false, ()=>{})
    // let chestForm = new ChestFormData("45");
    // for(let i = 0;i < 9;i++) {
    //     chestForm.button(i, "§c§lX", [], `textures/blocks/glass_gray`);
    // }
    // for(let i = 36;i < 45;i++) {
    //     chestForm.button(i, "§c§lX", [], `textures/blocks/glass_gray`);
    // }

    // chestForm.show(player)
    // let actionForm = new ActionForm();
    // actionForm.title("§f§u§l§l§s§c§r§e§e§n§r§cGUIs");
    // actionForm.button("§a§lAdd a form\n§7Create a UI", icons.resolve("leaf/image-740"), (player)=>{

    // })
})