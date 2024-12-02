import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";
import clanAPI from "../../apis/clanAPI";
import config from "../../apis/config";

uiManager.addUI(config.uiNames.Clans.create, "Create clan", (player) => {
    let modalForm = new ModalForm();
    modalForm.title("Create a clan")
    modalForm.textField("Name:", "Example: cats", undefined);
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response) => {

        const [textField] = response.formValues;

        if (textField.length > 7) return player.error("Clan must have name under 7 letters")
        let clanwithname = clanAPI.getClanbyName(textField)
        if(clanwithname) return player.error("There is already a clan with this name!")
        if (!textField) return player.error("You must enter a name!")
        try {
            let clan = clanAPI.createClan(textField, player)
            if (clan === true) {
                player.success("Clan created")
            }
        } catch (e) {
            player.error(`${e.message}`)
        }
    })
}) 