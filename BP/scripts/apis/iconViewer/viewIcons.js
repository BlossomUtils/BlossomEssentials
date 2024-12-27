import icons from '../icons'
import { ChestFormData } from '../../lib/chestUI'
import uiManager from '../../uiManager'
import { ActionForm } from '../../lib/prismarinedb'
import config from '../config'
import { getPack } from '../../icons/iconPack'
import UIBuilderV2 from '../UIBuilderV2'

uiManager.addUI(config.uiNames.IconViewer, "View icons", (player, set = "azalea_icons", ui, button) => {
    let form = new ChestFormData("54")
    let pack = getPack(set)
    if (!pack) throw new Error("No pack defined/Pack defined is invalid")
    form.title("Icon Viewer")
    for(let i = 0;i < 54;i++) {
        form.button(i, `§cX`, [], `textures/blocks/glass_gray`, 1, false, ()=>{})
    }
    pack.icons.slice(0, 54).forEach((icon, i) => {
        form.button(
            i,
            `${pack.namespace}:${icon.name}`,
            ["Add this icon"],
            `${icon.path}`,
            1,
            false,
            () => {
                UIBuilderV2.editButton(button.id, ui.id, button.text, button.subtext, button.action, icon.path, button.requiredTag)
                uiManager.open(player, config.uiNames.UIBuilderV2.EditButton, ui, button)
            }
        );
    });
    if (pack.nextPack) {
    form.button(50, `§aNext Page`, [`§7Go to the next page`], `textures/blocks/glass_lime`, 1, false, () => {
        if(!ui) {
            uiManager.open(player, config.uiNames.IconViewer, pack.nextPack)
        } else {
            uiManager.open(player, config.uiNames.IconViewer, pack.nextPack, ui, button)
        }       
    })
}
if (pack.previousPack) {
    form.button(48, `§cPrevious Page`, [`§7Go to the previous page`], `textures/blocks/glass_red`, 1, false, () => {
        if(!ui) {
            uiManager.open(player, config.uiNames.IconViewer, pack.previousPack)
        } else {
            uiManager.open(player, config.uiNames.IconViewer, pack.previousPack, ui, button)
        }       
    })
}

    form.show(player)
})
