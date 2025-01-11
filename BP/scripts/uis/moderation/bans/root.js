import { prismarineDb, ActionForm } from "../../../lib/prismarinedb";
import config from "../../../apis/config";
import bans from "../../../apis/bans";
import uiManager from "../../../uiManager";

uiManager.addUI(config.uiNames.Moderation.Bans.Root, 'Bans', (player) => {
    let form = new ActionForm()
    form.title('Bans')
    form.button('§aCreate\n§7[ Create Ban ]', 'textures/blossom_icons/features.png', (player) => {
        uiManager.open(player, config.uiNames.Moderation.Bans.Create)
    })
    for(const ban of bans.getAll()) {
        form.button(`§a${ban.data.playerName}\n§7${ban.data.reason}`, null, (player) => {
            uiManager.open(player, config.uiNames.Moderation.Bans.View, ban.id)
        })
    }
    form.show(player)
})