import config from "../../apis/config";
import uiManager from "../../uiManager";
import { ActionForm } from "../../lib/prismarinedb";
import homeAPI from "../../apis/homeAPI";

uiManager.addUI(config.uiNames.Homes.Root, "homes root", (player, shared = false) => {
    let form = new ActionForm();
    form.title("§dHomes")
    if (shared == false) {
        form.button(`§dAdd\n§7Add a home`, "textures/azalea_icons/1.png", (player) => {
            uiManager.open(player, config.uiNames.Homes.Add)
        })
        form.button(`§dShared\n§7View shared homes`, "textures/azalea_icons/11.png", (player) => {
            uiManager.open(player, config.uiNames.Homes.Root, true)
        })
    } else {
        form.button(`§dBack\n§7View your homes`, "textures/azalea_icons/2.png", (player) => {
            uiManager.open(player, config.uiNames.Homes.Root, false)
        })
    }
    if (shared == false) {
        for (const home of homeAPI.findAllFromPlayer(player.name)) {
            form.button(`§d${home.data.name}\n§7View home`, `textures/azalea_icons/ClickyClick.png`, (player) => {
                uiManager.open(player, config.uiNames.Homes.View, home.id)
            })
        }
    } else {
        for (const home of homeAPI.getShared(player.name)) {
            form.button(`§d${home.data.name}\n§7View shared home`, `textures/azalea_icons/ClickyClick.png`, (player) => {
                uiManager.open(player, config.uiNames.Homes.View, home.id, true)
            })
        }
    }

    form.show(player)
})