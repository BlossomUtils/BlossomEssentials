import './root'
import './send'
import './config'
import { world } from '@minecraft/server'
import modules from '../../../apis/modules'
import { ActionFormData } from '@minecraft/server-ui'

function announcement(text) {
    if(modules.get('announcementType') === 'chat') return world.sendMessage(`§d§lANNOUNCEMENT§f §8>> §f§7${text}`);
    if(modules.get('announcementType') === 'actionbar') {
        for(const plr of world.getPlayers()) {
            plr.onScreenDisplay.setActionBar(`§d§lANNOUNCEMENT§f §8>> §f§7${text}`)
        }
    }
    if(modules.get('announcementType') === 'ui') {
        let form = new ActionFormData();
        form.title('Announcement')
        form.body(`§d§lANNOUNCEMENT§f §8>> §f§7${text}`)
        form.button('OK')
        for(const plr of world.getPlayers()) {
            function show() {
                form.show(plr).then((res) => {
                    if(res.selection == 0) return;
                    if (!res.cancelled) {
                        show();
                    }
                });
            }
            
            show();
        }
    }
}

export { announcement }