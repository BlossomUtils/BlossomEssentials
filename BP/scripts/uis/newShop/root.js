import shop from "../../apis/shop";
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";
import config from "../../apis/config";

uiManager.addUI(config.uiNames.NewShop.Root, 'New shop root', (player) => {
    let form = new ActionForm();
    let docs = shop.db.findDocuments({ type: 'Category' })
    form.title('Shop')
    if (player.hasTag('admin')) {
        form.button(`§dAdmin View\n§7Edit the shop`, 'textures/azalea_icons/EditShop', (player) => {
            uiManager.open(player, config.uiNames.NewShop.Admin)
        })
    } else {
        form.button(`§cClose\n§7Close UI`, "textures/azalea_icons/2.png", (player) => { })
    }
    for (const doc of docs) {
        if (doc.data.requiredTag) {
            if (!player.hasTag(doc.data.requiredTag)) continue;
            form.button(`${doc.data.name}\n§7${doc.data.description ? doc.data.description : '\uE565 ' + doc.data.currency}`, doc.data.icon ? doc.data.icon : null, (player) => {
                uiManager.open(player, config.uiNames.NewShop.ViewCategory, doc.id)
            })
        } else {
            form.button(`${doc.data.name}\n§7${doc.data.description ? doc.data.description : '\uE565 ' + doc.data.currency}`, doc.data.icon ? doc.data.icon : null, (player) => {
                uiManager.open(player, config.uiNames.NewShop.ViewCategory, doc.id)
            })
        }
    }
    form.show(player)
})