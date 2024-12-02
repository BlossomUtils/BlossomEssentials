import { ActionForm } from "../../lib/prismarinedb";
import clanAPI from "../../apis/clanAPI";
import uiManager from "../../uiManager";
import config from "../../apis/config";

uiManager.addUI(config.uiNames.Clans.viewInvite, "View Clan invite", (player, invite)=>{
    let form = new ActionForm();
    let clan = clanAPI.getClanByID(invite.data.clan)
    form.title("§dInvite")
    form.body(`Invited to: ${clan.data.name}`)
    form.button("§aAccept\n§7Accept this invite", null, (player)=>{
        clanAPI.joinPlayertoClan(player, clan.id)
        clanAPI.inviteDb.deleteDocumentByID(invite.id)
        player.success(`Joined clan: ${clan.data.name}`)
        uiManager.open(player, config.uiNames.Clans.root)
    })
    form.button("§cDecline\n§7Decline this invite", null, (player)=>{
        clanAPI.inviteDb.deleteDocumentByID(invite.id)
        player.success(`Declined invite to ${clan.data.name}`)
        uiManager.open(player, config.uiNames.Clans.invites)
    })
    form.show(player)
})