import './root'
import './send'
import './config'
import { world } from '@minecraft/server'
import modules from '../../../apis/modules'
import { ActionForm } from '../../../lib/prismarinedb'

function announcement(text) {
    if(modules.get('announcementType') === 'chat') return world.sendMessage(`§d§lANNOUNCEMENT§f §8>> §f§7${text}`);
    if(modules.get('announcementType') === 'actionbar') {
        for(const plr of world.getPlayers()) {
            plr.onScreenDisplay.setActionBar(`§d§lANNOUNCEMENT§f §8>> §f§7${text}`)
        }
    }
    if(modules.get('announcementType') === 'ui') {
        let form = new ActionForm();
        form.title('Announcement')
        form.body(`§d§lANNOUNCEMENT§f §8>> §f§7${text}`)
        form.button('OK', null, (player)=>{})
        for(const plr of world.getPlayers()) {
            form.show(plr)
        }
    }
}

export { announcement }