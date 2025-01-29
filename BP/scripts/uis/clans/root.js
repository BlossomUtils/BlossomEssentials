import { prismarineDb } from "../../lib/prismarinedb";
import clanAPI from "../../apis/clanAPI";
import uiManager from "../../uiManager";
import config from "../../apis/config";
import { ActionForm } from "../../lib/form_func";
import playerStorage from "../../apis/playerStorage";

uiManager.addUI(config.uiNames.Clans.root, "Clans root", (player) => {
    let form = new ActionForm();
    let id = playerStorage.getID(player)
    let clan = clanAPI.getClanbyPlayer(player);


    let title;
    if (!clan) {
        title = "§dClans"
    } else {
        title = `§d${clan.data.name}`
    }
    form.title(`${title}`)
    if (!clan) {
        form.button("§aCreate\n§7Create a clan", null, (player) => {
            uiManager.open(player, config.uiNames.Clans.create)
        })
        form.button("§dInvites\n§7View clan invites", null, (player) => {
            uiManager.open(player, config.uiNames.Clans.invites)
        })
    }
    if (clan) {
        for (const plr of clan.data.players) {
            if (plr.id === id) {
                form.button("§aClan Base\n§7Teleport to clan base", null, (player) => {
                    clanAPI.teleportToClanBase(clan.id, player)
                    player.success("Teleported to clan base!")
                })
                form.button("§aChat\n§7Toggle clan chat", null, (player) => {
                    if(player.hasTag('clanChat')) {
                        player.removeTag('clanChat')
                    } else {
                        player.addTag('clanChat')
                    }
                })
                if (plr.permission === "Owner") {
                    form.button("§2Players\n§7View all players", null, (player) => {
                        uiManager.open(player, config.uiNames.Clans.players, clan.id)
                    })
                    form.button("§bInvite\n§7Invite someone to the clan", null, (player) => {
                        uiManager.open(player, config.uiNames.Clans.invite)
                    })
                    form.button("§4Set clan base\n§7Set the base of the clan", null, (player) => {
                        clanAPI.setClanBase(clan.id, player.location, player.dimension.id)
                        player.success(`Set clan base to ${player.location.x}, ${player.location.y}, ${player.location.z}`)
                    })
                    form.button("§dDisband clan\n§7Disband the clan", null, (player) => {
                        clanAPI.deleteClan(clan.id)
                        player.success("Clan disbanded")
                    })
                } else {
                    form.button("§dLeave clan\n§7Leave the clan", null, (player) => {
                        clanAPI.kickPlayerFromClan(id, clan.id)
                        player.success("Left clan")
                    })
                }
            }
        }
    }
    form.show(player)
})