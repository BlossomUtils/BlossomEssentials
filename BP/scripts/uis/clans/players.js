import { ActionForm } from "../../lib/prismarinedb";
import clanAPI from "../../apis/clanAPI";
import uiManager from "../../uiManager";
import config from "../../apis/config";
import moment from "../../lib/moment"

uiManager.addUI(config.uiNames.Clans.players, "Clan players", (player, clanID) => {
    let form = new ActionForm();
    let clan = clanAPI.getClanByID(clanID)
    let players = clan.data.players
    form.title("§dPlayers")
    form.button("§cBack\n§7Go back to clans ui", null, (player) => {
        uiManager.open(player, config.uiNames.Clans.root)
    })
    for (const plr of players) {
        if (!clan) return;
        if (plr.permission === "Member") {
            form.button(`§d${plr.name}\n§7[ Joined ${moment(plr.joinDate).fromNow()} ]`, null, (player) => {
                uiManager.open(player, config.uiNames.Clans.editPlayer, plr.id, plr.name, clan.id)
            })
        }
    }
    form.show(player)
})