import { ModalFormData } from "@minecraft/server-ui";
import bans from "../../../apis/bans";
import config from "../../../apis/config";
import { ActionForm } from "../../../lib/prismarinedb";
import uiManager from "../../../uiManager";

uiManager.addUI(config.uiNames.Moderation.Bans.View, 'View ban', (player, id) => {
    let form = new ActionForm();
    let ban = bans.get(id);
    form.title(`${ban.data.playerName}`)
    form.body(`Reason: ${ban.data.reason}`)
    form.button(`§aUnban\n§7[Unban Player]`, `textures/azalea_icons/5.png`, (player) => {
        bans.unban(ban.id)
        player.success('Player unbanned successfully!')
        uiManager.open(player, config.uiNames.Moderation.Bans.Root)
    })
    form.button(`§bEdit Reason\n§7[Edit ban reason]`, `textures/azalea_icons/3.png`, (player) => {
        let form = new ModalFormData()
        form.title('Edit Reason')
        form.textField('Reason', '', ban.data.reason)
        form.show(player).then((res) => {
            if(res.canceled) return uiManager.open(player, config.uiNames.Moderation.Bans.View, id);
            let reason = res.formValues[0]
            bans.edit(id, reason)
            player.success(`Edited ban reason: ${reason}`)
            uiManager.open(player, config.uiNames.Moderation.Bans.View, id);
        })
    })
    form.show(player)
})