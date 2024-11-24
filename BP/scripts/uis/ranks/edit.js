import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";
import ranks from "../../apis/ranks";
import config from "../../apis/config";

uiManager.addUI(config.uiNames.Ranks.Edit, "Edit rank", (player, tag, display)=>{
    let modalForm = new ModalForm();
    modalForm.title(`Edit rank: ${tag}`)
    modalForm.textField("Display:", "Example: Citizen", display);
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response)=>{

        const [textField] = response.formValues;

        if(textField.includes(" ")) return player.error("You can't make a rank with spaces!")

       if (response.canceled) return uiManager.open(player, config.uiNames.Config.Root)
        if (!textField) return player.error("You must enter a rank!")
            ranks.edit(tag, textField)
    })
}) 