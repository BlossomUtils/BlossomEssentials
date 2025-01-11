import uiManager from "../../uiManager";
import config from "../../apis/config";
import { ActionForm } from "../../lib/form_func";
import { world } from "@minecraft/server";

uiManager.addUI(config.uiNames.Moderation.Players.Root, 'meow', (player) => {
    let form = new ActionForm()
    form.title('§dModeration')
    form.button('§cBack', null, (player) => {
        uiManager.open(player, config.uiNames.Config.Moderation)
    })
    for(const plr of world.getPlayers()) {
        if(plr.hasTag('admin')) continue;
        form.button(`§d${plr.name}`, null, (player) => {
            uiManager.open(player, config.uiNames.Moderation.Players.Options, plr.name)
        })
    }
    form.show(player)
})