import config from "../../apis/config";
import UIBuilderV2 from "../../apis/UIBuilderV2";
import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.UIBuilderV2.AddButton, "UI Builder V2 add button", (player, ui, button)=>{
    let form = new ModalForm();
    let dt;
    let dst;
    let da;
    let di;
    let drq;
    if(button) {
        dt = button.text
        dst = button.subtext
        da = button.action
        di = button.icon
        drq = button.requiredTag
    }
    form.title("§dUI Builder V2")
    form.textField("Text", "Best button!", dt)
    form.textField("Subtext", "This is the best button", dst)
    form.textField("Action", "Action of this button", da)
    form.textField("Icon", "Icon path (Not required)", di)
    form.textField("Required Tag", "Example: admin", drq)
    form.submitButton("Submit")

    form.show(player, false, (player, response)=>{
        
        const [ text, subtext, action, icon, rq ] = response.formValues

        if(!text) return player.error("Text is required");
        if(!action) return player.error("Action is required");
        if(!subtext) return player.error("Subtext is required");

        if(button) {
            UIBuilderV2.editButton(button.id, ui.id, text, subtext, action, icon, rq)
            uiManager.open(player, config.uiNames.UIBuilderV2.EditButtons, ui)
        } else {
            UIBuilderV2.addButtontoUI(ui.id, text, subtext, action, icon, rq)
            uiManager.open(player, config.uiNames.UIBuilderV2.EditButtons, ui)
        }
    })
})