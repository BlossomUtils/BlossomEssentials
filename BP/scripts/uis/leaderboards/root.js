import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";
import config from "../../apis/config";
import leaderboards from "../../apis/leaderboards";

uiManager.addUI(config.uiNames.Leaderboards.Root, 'leaderbiards orot', (player)=>{
    let form = new ActionForm();
    form.title('Leaderboards')
    form.button(`Back`, null, (player)=>{
        uiManager.open(player, config.uiNames.Config.Extra)
    })
    for(const lb of leaderboards.getAll()) {
        form.button(`${lb.data.scoreboard}`, 'textures/blossom_icons/medal', (player)=>{
            uiManager.open(player,config.uiNames.Leaderboards.Edit,lb.id)
        })
    }
    form.show(player)
})