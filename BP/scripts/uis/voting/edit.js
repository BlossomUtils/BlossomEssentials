import { ActionForm } from "../../lib/prismarinedb";
import { ModalFormData } from "@minecraft/server-ui";
import uiManager from "../../uiManager";
import config from "../../apis/config";
import voting from "../../apis/voting";

uiManager.addUI(config.uiNames.Voting.Edit, 'edit referendum', (player,id) => {
    let r = voting.get(id)
    if(!r) return;
    let form = new ActionForm();
    form.title('Edit Referendum')
    form.button(`§dEdit Values`, 'textures/azalea_icons/ClickyClick', (player) => { 
        let f = new ModalFormData();
        f.title('Edit Values')
        f.textField('Title', `The thing people will see before click`, r.data.title)
        f.textField('Body', 'People will see this after clicking', r.data.body)
        f.show(player).then((res) => {
            let[title,body] = res.formValues;
            if(!title || !body) return player.error('Missing fields');
            voting.edit(id,title,body)
            uiManager.open(player, config.uiNames.Voting.Edit, id)
        })
    })
    form.button(`§bEdit Icon\n§7Edit referendum's icon`, r.data.icon ? r.data.icon : null, (player) => {
        uiManager.open(player, config.uiNames.IconViewer, 'azalea_icons', 'vote', r.id)
    })
    form.button(`§cDelete\n§7Delete this referendum`, 'textures/azalea_icons/Delete', (player)=>{
        voting.delete(id)
        uiManager.open(player, config.uiNames.Voting.Admin)
    })
    form.show(player)
})