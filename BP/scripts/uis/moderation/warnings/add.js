import { ModalFormData } from "@minecraft/server-ui";
import warnings from "../../../apis/warnings";
import uiManager from "../../../uiManager";
import config from "../../../apis/config";
import { world } from "@minecraft/server";

uiManager.addUI(config.uiNames.Moderation.Warnings.Add, 'meow', (player) => {
    let form = new ModalFormData()
    let players = world.getPlayers()
    let display = players.map(plr => plr.name)
    form.title('§dCreate Warning')
    form.dropdown('§dPlayer', display, 0)
    form.textField('§dReason', '§7Enter the reason for the warning', null)
    form.show(player).then((res) => {
        if(res.canceled) return uiManager.open(player, config.uiNames.Moderation.Warnings.Root);
        let [plr, reason] = res.formValues;
        let plar = players[plr]
        if(!plar) return player.error('Player not found!');
        if(plar.hasTag('admin')) return player.error(`You can't warn admins!`);
        warnings.add(plar.name, reason, player)
        player.success('Warning created successfully!')
        uiManager.open(player, config.uiNames.Moderation.Warnings.Root)
    })
})