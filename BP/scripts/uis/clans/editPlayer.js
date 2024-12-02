import { ActionForm } from "../../lib/prismarinedb";
import clanAPI from "../../apis/clanAPI";
import uiManager from "../../uiManager";
import config from "../../apis/config";
import playerStorage from "../../apis/playerStorage";

uiManager.addUI(config.uiNames.Clans.editPlayer, "View Clan invite", (player, playerID, PlayerName, clanID)=>{
    let form = new ActionForm();
    let clan = clanAPI.getClanByID(clanID)
    form.title("§dEdit Player")
    form.body(`Player: ${PlayerName}`)
    form.button("§4Back\n§7Go back to players ui", null, (player)=>{
        uiManager.open(player, config.uiNames.Clans.players, clanID)
    })
    form.button("§4Kick\n§7Kick this player", null, (player)=>{
        clanAPI.kickPlayerFromClan(playerID, clan.id)
        player.success("Kicked player from clan")
    })
    form.button("§cTransfer ownership\n§7Warning: You will become a member!", null, (player)=>{
        for (const plr of clan.data.players) {
            if (plr.id === playerID) {
                plr.permission = "Owner"
            }
            if (plr.id === playerStorage.getID(player)) {
                plr.permission = "Member"
            }
            clanAPI.db.overwriteDataByID(clan.id, clan.data)
        }
        player.success(`Transferred ownership of clan to ${PlayerName}`)
    })
    form.show(player)
})