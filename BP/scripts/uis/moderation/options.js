import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";
import config from "../../apis/config";
import warnings from "../../apis/warnings";
import bans from "../../apis/bans";
import { world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import playerAPI from "../../apis/playerAPI";

uiManager.addUI(config.uiNames.Moderation.Players.Options, 'meow', (player, name) => {
    let form = new ActionForm()
    let plr = playerAPI.verify(name)
    form.title('§dModeration Options')
    form.button('§cBan', null, (player) => {
        let form2 = new ModalFormData()
        form2.title('§dBan Player')
        form2.textField('§dReason', '§7Enter the reason for the ban', null)
        form2.show(player).then((res) => {
            if(res.canceled) return uiManager.open(player, config.uiNames.Moderation.Players.Root);
            let [reason] = res.formValues;
            if(!plr) return player.error('Player not found!');
            if(plr.hasTag('admin')) return player.error(`You can't ban admins!`);
            bans.ban(plr, reason, player)
            player.success('Ban created successfully!')
            uiManager.open(player, config.uiNames.Moderation.Bans.Root)
        })
    })
    form.button('§cKick', null, (player) => {
        player.runCommandAsync(`kick ${name} You have been kicked by an admin!`)
    })
    form.button('§cWarn', null, (player) => {
        let form2 = new ModalFormData()
        form2.title('§dWarn Player')
        form2.textField('§dReason', '§7Enter the reason for the warning', null)
        form2.show(player).then((res) => {
            if(res.canceled) return uiManager.open(player, config.uiNames.Moderation.Warnings.Root)
            let reason = res.formValues[0]
            warnings.add(name, reason, player)
            player.success('Warning created successfully!')
            form.show(player)
        })
    })
    form.show(player)
})
