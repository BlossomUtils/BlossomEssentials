import modules from "../../apis/modules";
import { ModalFormData } from "@minecraft/server-ui";
import uiManager from "../../uiManager";
import config from "../../apis/config";

uiManager.addUI(config.uiNames.Config.CombatLog, 'Combat Log config', (player)=>{
    let form = new ModalFormData();
    form.title('Combat Log Configuration')
    form.slider('Combat Log Timer', 5, 20, 5, modules.get('combatTime'))
    form.textField('Combat Log Message', 'Example: Timer ending in {t}..', modules.get('combatMessage'))
    form.toggle('Enabled', modules.get('combatLog'))
    form.toggle('Kill on Leave', modules.get('combatKillLeave'))
    form.toggle('Keep Inventory', modules.get('keepInventory'))
    form.show(player).then((res) => {
        let[timer,message,enabled,leave,keepinv] = res.formValues;
        modules.set('combatTime', timer)
        modules.set('combatMessage', message)
        modules.set('combatLog', enabled)
        modules.set('combatKillLeave', leave)
        modules.set('keepInventory', keepinv)
        uiManager.open(player, config.uiNames.Config.Extra)
    })
})