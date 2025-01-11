import { ModalFormData } from "@minecraft/server-ui";
import uiManager from "../../../uiManager";
import config from "../../../apis/config";
import bans from "../../../apis/bans";
import { world } from "@minecraft/server";

uiManager.addUI(config.uiNames.Moderation.Bans.Create, 'Create Ban', (player) => {
    let form = new ModalFormData();
    let players = world.getPlayers()
    let display = players.map(plr => plr.name)
    form.title('Ban Player')
    form.dropdown('Player', display, 0)
    form.textField('Reason', 'Ban reason..', null)
    form.show(player).then((res) => {
        if(res.canceled) return uiManager.open(player, config.uiNames.Moderation.Bans.Root);
        let [plr, reason] = res.formValues;
        let plar = players[plr]
        if(!plar) return player.error('Player not found!');
        if(plar.hasTag('admin')) return player.error(`You can't ban admins!`);
        bans.ban(plar, reason, player)
        player.success('Ban created successfully!')
        uiManager.open(player, config.uiNames.Moderation.Bans.Root)
    })
})