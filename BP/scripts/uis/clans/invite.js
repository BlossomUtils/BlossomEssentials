import { ActionForm } from "../../lib/prismarinedb";
import clanAPI from "../../apis/clanAPI";
import uiManager from "../../uiManager";
import config from "../../apis/config";
import { world as server } from '@minecraft/server'
import playerStorage from "../../apis/playerStorage";

uiManager.addUI(config.uiNames.Clans.invite, "Clan invites", (player) => {
    let form = new ActionForm();
    let invites = clanAPI.getInvites(player)
    form.title("§dInvites")
    form.button("§cBack\n§7Go back to clans ui", null, (player) => {
        uiManager.open(player, config.uiNames.Clans.root)
    })
    for (const plr of server.getPlayers()) {
        let clan = clanAPI.getClanbyPlayer(player)
        const isInClan = clan.data.players.some(member => member.name === plr.name);
        const hasBeenInvited = clanAPI.inviteDb.findFirst({ toPlayer: playerStorage.getID(plr) })
        if (!hasBeenInvited) {
            if (!isInClan) {
                form.button(`§a${plr.name}\n§7[ Invite Player ]`, null, (player) => {
                    clanAPI.inviteToClan(plr, player);
                    plr.info(`${player.name} just invited you to the clan ${clan.data.name}`)
                    uiManager.open(player, config.uiNames.Clans.root);
                });
            }
        }
    }
    form.show(player)
})