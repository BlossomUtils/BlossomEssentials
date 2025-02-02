import { ModalFormData } from "@minecraft/server-ui";
import { ActionForm } from "../../lib/prismarinedb";
import events from "../../apis/events";
import uiManager from "../../uiManager";
import config from "../../apis/config";

uiManager.addUI(config.uiNames.Events.Edit, 'events edit', (player,id)=>{
    let ev = events.db.getByID(id)
    if(!ev) return;
    let form = new ActionForm();
    form.title(ev.data.display)
    form.button(`§dEdit Actions\n§7Edit this event's actions`, `textures/blossom_icons/event`, (player)=>{
        let f = new ActionForm();
        f.title('Edit Actions')
        f.button(`§aAdd\n§7Add an action`, 'textures/blossom_icons/add', (player) => {
            let f2 = new ModalFormData();
            let td = ['Killer', 'Killed']
            let ts = ['killer', 'killed']
            f2.title('Add Action')
            f2.textField(`Action`, 'Enter action here..', undefined)
            f2.dropdown(`Type`, td, 0)
            f2.show(player).then((res) => {
                let[action,t] = res.formValues;
                if(!action) return player.error('Enter an action')
                let type = ts[t]
                events.addAction(ev.id,action,type)
                uiManager.open(player, config.uiNames.Events.Edit, id)
            })
        })
        for(const action of ev.data.killedActions) {
            f.button(`§c${action}\n§7Killed Action`, `textures/blossom_icons/sword`, (player)=>{
                let f2 = new ActionForm();
                f2.title('Edit Action')
                f2.button(`§cBack\n§7Previous UI`, 'textures/azalea_icons/2', (player) => {
                    uiManager.open(player, config.uiNames.Events.Edit, id)
                })
                f2.button(`§dEdit`, 'textures/blossom_icons/edit', (player) => {
                    let f3 = new ModalFormData();
                    f3.title('Edit')
                    f3.textField(`Action`, `Edit action..`, action)
                    f3.show(player).then((res) => {
                        let[newaction] = res.formValues;
                        if(!newaction) return player.error('Enter action');
                        events.editAction(id,action,newaction,'killed')
                        uiManager.open(player, config.uiNames.Events.Edit, id)
                    })
                })
                f2.button(`§cDelete`, 'textures/azalea_icons/Delete', (player) => {
                    events.removeAction(id,action,'killed')
                    uiManager.open(player, config.uiNames.Events.Edit, id)
                })
                f2.show(player)
            })
        }
        for(const action of ev.data.killerActions) {
            f.button(`§c${action}\n§7Killer Action`, `textures/blossom_icons/sword`, (player)=>{
                let f2 = new ActionForm();
                f2.title('Edit Action')
                f2.button(`§cBack\n§7Previous UI`, 'textures/azalea_icons/2', (player) => {
                    uiManager.open(player, config.uiNames.Events.Edit, id)
                })
                f2.button(`§dEdit`, 'textures/blossom_icons/edit', (player) => {
                    let f3 = new ModalFormData();
                    f3.title('Edit')
                    f3.textField(`Action`, `Edit action..`, action)
                    f3.show(player).then((res) => {
                        let[newaction] = res.formValues;
                        if(!newaction) return player.error('Enter action');
                        events.editAction(id,action,newaction,'killer')
                        uiManager.open(player, config.uiNames.Events.Edit, id)
                    })
                })
                f2.button(`§cDelete`, 'textures/azalea_icons/Delete', (player) => {
                    events.removeAction(id,action,'killer')
                    uiManager.open(player, config.uiNames.Events.Edit, id)
                })
                f2.show(player)
            })
        }
        f.show(player)
    })
    form.button(`§cDelete\n§7[ Delete Event ]`, 'textures/azalea_icons/Delete', (player) => {
        events.remove(id)
        uiManager.open(player, config.uiNames.Events.Root)
    })
    form.show(player)
})