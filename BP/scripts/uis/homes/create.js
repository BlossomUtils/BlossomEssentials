import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";
import config from "../../apis/config";
import homeAPI from "../../apis/homeAPI";

uiManager.addUI(config.uiNames.Homes.Add, "Add home", (player)=>{
    let modalForm = new ModalForm();
    modalForm.title("Add home")
    modalForm.textField("Home:", "Example: Base", undefined);
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response)=>{

        const [textField] = response.formValues;

       if (response.canceled) return uiManager.open(player, config.uiNames.Config.Root)
        if (!textField) return error("You must enter a home!", player)
            homeAPI.create(player, textField)
            player.success(`Created home with name: ${textField}`)
    })
}) 