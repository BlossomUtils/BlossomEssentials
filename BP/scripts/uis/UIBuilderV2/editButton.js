import config from "../../apis/config";
import UIBuilderV2 from "../../apis/UIBuilderV2";
import { ActionForm } from "../../lib/form_func";
import { ModalFormData } from "@minecraft/server-ui";
import uiManager from "../../uiManager";
import moment from "../../lib/moment"


uiManager.addUI(config.uiNames.UIBuilderV2.EditButton, "UI builder v2 root", (player, ui, button)=>{
    let form = new ActionForm();
    form.title("§dUI Builder V2")
    form.button("§aBack\n§7Go back to edit buttons", `textures/azalea_icons/1.png`, (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderV2.EditButtons, ui)
    })
    form.button(`§dEdit Icon\n§7Edit button icon`, button.icon ? button.icon : null, (player)=>{
        uiManager.open(player, config.uiNames.IconViewer, "azalea_icons", ui, button)
    })
    form.button("§dEdit Button\n§7Edit this button", `textures/azalea_icons/GUIMaker/FormsV2.png`, (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderV2.AddButton, ui, button)
    })
    form.button("§dEdit Actions\n§7Edit button's actions", `textures/azalea_icons/7.png`, (player)=>{
        let form2 = new ActionForm();
        form2.title('§dEdit Actions')
        form2.button(`§aAdd Action`, 'textures/azalea_icons/1.png', (player) => {
            let modal = new ModalFormData()
            .title('Add Action')
            .textField('Action', 'Example: /say hi!', null)
            .submitButton('Create')
            .show(player).then((res) => {
                if(res.canceled) return form2.show(player);
                if(!res.formValues[0]) return form2.show(player), player.error('Action can`t be empty!');
                UIBuilderV2.addActionToButton(button.id, ui.id, res.formValues[0])
                form.show(player)
            });
        })
        for(const action of button.actions) {
            if(!button.actions) continue;
            form2.button(`§a${action}`, null, (player) => {
                let form3 = new ActionForm();
                form3.title('Action options')
                form3.button('§cDelete', 'textures/azalea_icons/Delete.png', (player) => {
                    UIBuilderV2.removeActionFromButton(button.id, ui.id, button.actions.indexOf(action))
                    player.success('Deleted action!')
                    form2.show(player)
                })
                form3.show(player)
            })
        }
        form2.show(player)
    })
    form.button("§dMove Up\n§7Move button up", `textures/azalea_icons/Up.png`, (player)=>{
        UIBuilderV2.moveButtonInUI(ui.id, "up", button.id)
        uiManager.open(player, config.uiNames.UIBuilderV2.EditButtons, ui)
    })
    form.button("§dMove Down\n§7Move button down", `textures/azalea_icons/Down.png`, (player)=>{
        UIBuilderV2.moveButtonInUI(ui.id, "down", button.id)
        uiManager.open(player, config.uiNames.UIBuilderV2.EditButtons, ui)
    })
    form.button("§dDelete\n§7Delete this button", `textures/azalea_icons/Delete.png`, (player)=>{
        UIBuilderV2.removeButton(button.id, ui.id)
        uiManager.open(player, config.uiNames.UIBuilderV2.EditButtons, ui)
    })
    form.show(player, false, (player, response)=>{})
})