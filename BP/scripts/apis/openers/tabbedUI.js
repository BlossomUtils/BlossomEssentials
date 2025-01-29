import tabbedUIBuilder from "../tabbedUIBuilder";
import { ActionForm } from "../../lib/form_func";
import UIBuilderV2 from "../UIBuilderV2";
import blossomFormatting from "../blossomFormatting";
import { system } from "@minecraft/server";
import actionParser from "../actionParser";

function openTabUI(tabUI, entity, tabIndex = 0) {
    let form = new ActionForm()
    if (tabUI.data.tabs.length) {
        for (let i = 0; i < tabUI.data.tabs.length; i++) {
            form.button(`§t§a§b${tabIndex == i ? `§a§c§t§i§v§e` : ''}§r§f${blossomFormatting.format(tabUI.data.tabs[i].title, entity)}`, null, (player) => {
                openTabUI(tabUI, entity, i)
            })
        }
    }
    let tab = tabUI.data.tabs[tabIndex];
    form.title(`§t§a§b§b§e§d§r§f${tab && tab.title ? blossomFormatting.format(tab.title, entity) : "No Tab"}`);
    if (tab && tab.ui) {
        let ui = UIBuilderV2.getUIbyID(tab.ui)
        if (ui) {
            if (ui.data.body) form.body(ui.data.body);

            for (const button of ui.data.buttons) {
                if(button.requiredTag && !entity.hasTag(button.requiredTag)) continue;
                form.button(blossomFormatting.format(`${button.text}${button.subtext ? `\n§r§7${button.subtext}` : ``}`, entity), button.icon ? button.icon : null, (player) => {
                    for(const action of button.actions) {
                        actionParser.runAction(entity, action)
                    }
                })
            }
        }
    }
    form.show(entity, false, () => { })
}

system.afterEvents.scriptEventReceive.subscribe(e => {
    if (e.sourceEntity && e.sourceEntity.typeId == "minecraft:player") {
        if (e.id == "blossom:open_tabbed") {
            let tabUI = tabbedUIBuilder.db.findFirst({ id: e.message });
            if (!tabUI) return e.sourceEntity.sendMessage('not tab ui :3');
            openTabUI(tabUI, e.sourceEntity)
        }
    }
})
