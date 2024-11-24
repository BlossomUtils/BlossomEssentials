import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";
import ranks from "../../apis/ranks";
import config from "../../apis/config";

uiManager.addUI(config.uiNames.Ranks.Add, "Add ranks", (player)=>{
    let modalForm = new ModalForm();
    modalForm.title("Add rank")
    modalForm.textField("Rank:", "Example: Citizen", undefined);
    modalForm.textField("Tag:", "Example: default", undefined)
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response)=>{

        const [textField, tf2] = response.formValues;

        if(textField.includes(" ")) return player.error("You can't make a rank with spaces!")

       if (response.canceled) return uiManager.open(player, config.uiNames.Config.Root)
        if (!textField) return player.error("You must enter a rank!")
        if (!tf2) return player.error("Tag not defined")
            ranks.create(tf2, textField)
    })
}) 