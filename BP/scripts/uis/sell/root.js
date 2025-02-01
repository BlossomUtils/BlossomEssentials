import { ActionForm } from "../../lib/prismarinedb";
import sell from "../../apis/sell";
import config from "../../apis/config";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.Sell.Root, 'Sell root', (player) => {
    let form = new ActionForm();
    form.title('Sell')
    if (player.hasTag('admin')) {
        form.button(`§dAdmin View\n§7Edit the sell shop`, 'textures/azalea_icons/EditShop', (player) => {
            uiManager.open(player, config.uiNames.Sell.Admin)
        })
    } else {
        form.button(`§cClose\n§7Close UI`, "textures/azalea_icons/2.png", (player) => { })
    }
    for (const doc of sell.db.findDocuments({ type: 'Category' })) {
        if (doc.data.requiredTag) {
            if (!player.hasTag(doc.data.requiredTag)) continue;
            form.button(`${doc.data.name}\n§7${doc.data.description ? doc.data.description : '\uE565 ' + doc.data.currency}`, doc.data.icon ? doc.data.icon : null, (player) => {
                uiManager.open(player, config.uiNames.Sell.ViewCategory, doc.id)
            })
        } else {
            form.button(`${doc.data.name}\n§7${doc.data.description ? doc.data.description : '\uE565 ' + doc.data.currency}`, doc.data.icon ? doc.data.icon : null, (player) => {
                uiManager.open(player, config.uiNames.Sell.ViewCategory, doc.id)
            })
        }
    }
    form.show(player)
})