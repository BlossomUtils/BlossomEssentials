import { ActionForm } from "../../lib/prismarinedb";
import voting from "../../apis/voting";
import uiManager from "../../uiManager";
import config from "../../apis/config";

uiManager.addUI(config.uiNames.Voting.Root, 'Voting root', (player) => {
    let form = new ActionForm();
    form.title('Voting')
    if(player.hasTag('admin')) {
        form.button('§dAdmin View\n§7Do admin stuff', 'textures/azalea_icons/Settings', (player) => {
            uiManager.open(player, config.uiNames.Voting.Admin)
        })
    } else {
        form.button('Close UI')
    }
    for(const r of voting.db.findDocuments({type:'Referendum'})) {
        let ref = r.data
        form.button(`§d${ref.title}\n§r§7${ref.body}`, ref.icon ? ref.icon : null, (player)=>{
            uiManager.open(player, config.uiNames.Voting.View, r.id)
        })
    }
    form.show(player)
})