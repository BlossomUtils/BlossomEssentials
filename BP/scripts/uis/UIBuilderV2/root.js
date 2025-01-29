import config from "../../apis/config";
import UIBuilderV2 from "../../apis/UIBuilderV2";
import { ActionForm } from "../../lib/form_func";
import uiManager from "../../uiManager";
import moment from "../../lib/moment"
import { TabUI } from "../../lib/tabbedUI";
import tabManager from '../../apis/tabbedUI'
import tabbedUIBuilder from "../../apis/tabbedUIBuilder";

let tabbedUI = tabManager.create('+BLSM:uiBuilderV2')
tabbedUI.registerTab('\uE180 UIs', (player) => {
    const buttons = [{
        text: '§cLegacy Forms\n§7Use legacy forms',
        iconPath: 'textures/azalea_icons/FormsV2.png',
        callback: (player) => {
            uiManager.open(player, config.uiNames.UIBuilder.Root)
        }
    }]
    buttons.push({
        text: '§aAdd UI\n§7Add a UI',
        iconPath: 'textures/azalea_icons/1.png',
        callback: (player) => {
            uiManager.open(player, config.uiNames.UIBuilderV2.Add)
        }
    })
    for(const ui of UIBuilderV2.getUIs()) {
        buttons.push({
            text: `§d${ui.data.name}\n§7§d${ui.data.scriptevent} §7| §eLast updated ${moment(ui.updatedAt).fromNow()}`,
            iconPath: `textures/azalea_icons/GUIMaker/FormsV2.png`,
            callback: (player) => {
                uiManager.open(player, config.uiNames.UIBuilderV2.Edit, ui)
            }
        })
    }
    return {
        buttons
    }
})
tabbedUI.registerTab('\uE540 Tabbed', (player) => {
    const buttons = [{
        text: '§aAdd UI\n§7Add a tabbed UI',
        iconPath: 'textures/azalea_icons/1.png',
        callback: (player) => {
            uiManager.open(player, config.uiNames.UIBuilderV2.Tabbed.Add)
        }
    }]
    for (const tabui of tabbedUIBuilder.db.findDocuments()) {
        buttons.push({
            text: `§a${tabui.data.id}\n§7Edit this tab ui`,
            iconPath: null,
            callback(player) {
                uiManager.open(player, config.uiNames.UIBuilderV2.Tabbed.View, tabui.data.id)
            }
        })
    }
    return {
        buttons
    };
})
uiManager.addUI(config.uiNames.UIBuilderV2.Root, "UI builder v2 root", (player)=>{
    tabbedUI.open(player)
})