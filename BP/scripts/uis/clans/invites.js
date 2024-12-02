import { ActionForm } from "../../lib/prismarinedb";
import clanAPI from "../../apis/clanAPI";
import uiManager from "../../uiManager";
import config from "../../apis/config";

uiManager.addUI(config.uiNames.Clans.invites, "Clan invites", (player)=>{
    let form = new ActionForm();
    let invites = clanAPI.getInvites(player)
    form.title("§dInvites")
    form.button("§cBack\n§7Go back to clans ui", null, (player)=>{
        uiManager.open(player, config.uiNames.Clans.root)
    })
    for (const inv of invites) {
        let clan = clanAPI.getClanByID(inv.data.clan)
        if(!clan) return;
        form.button(`§d${clan.data.name}\n§7[ Join clan ]`, null, (player)=>{
            uiManager.open(player, config.uiNames.Clans.viewInvite, inv)
        })
    }
    form.show(player)
})