import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";
import warpAPI from "../../apis/warpAPI";
import config from "../../apis/config";

uiManager.addUI(config.uiNames.Warps.Add, "Add warps", (player)=>{
    let modalForm = new ModalForm();
    modalForm.title("Add warp")
    modalForm.textField("Warp:", "Example: Spawn", undefined);
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response)=>{

        const [textField] = response.formValues;

        if(textField.includes(" ")) return player.error("You can't make a warp with spaces!")

       if (response.canceled) return uiManager.open(player, config.uiNames.Config.Root)
        if (!textField) return error("You must enter a warp!", player)
            warpAPI.create(textField, player)
    })
}) 