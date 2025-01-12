import tpa from "../../apis/tpa";
import uiManager from "../../uiManager";
import config from "../../apis/config";
import { ModalFormData } from "@minecraft/server-ui";
import { world } from "@minecraft/server";

uiManager.addUI(config.uiNames.TPA.Request, 'tpa requests', (player) => {
    let form = new ModalFormData()
    let players = world.getPlayers()
    let display = players.map(plr => plr.name)
    form.title('TPA Request')
    form.dropdown('Player', display, 0)
    form.show(player).then((res) => {
        if(res.canceled) return;
        let [plr] = res.formValues
        let plar = players[plr]
        if(!plar) return player.error('Player not found!')
        tpa.request(player, plar.name)
        player.success('TPA request sent!')
    })
})