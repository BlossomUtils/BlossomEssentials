import { ModalForm } from "../../../lib/form_func";
import uiManager from "../../../uiManager";
import platformAPI from "../../../apis/platformAPI";
import config from "../../../apis/config";

uiManager.addUI(config.uiNames.platformSettings.Whitelist.Add, "Add warps", (player)=>{
    let modalForm = new ModalForm();
    modalForm.title("Add to whitelist")
    modalForm.textField("Player:", "Example: FruitKitty7041", undefined);
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response)=>{

        const [textField] = response.formValues;

       if (response.canceled) return uiManager.open(player, config.uiNames.platformSettings.Whitelist.Root)
        if (!textField) return player.error("You must enter a player!")
            platformAPI.addtoWhitelist(textField)
    })
}) 