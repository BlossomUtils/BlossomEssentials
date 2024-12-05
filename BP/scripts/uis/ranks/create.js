import { ModalForm } from "../../lib/form_func";
import { colors } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";
import ranks from "../../apis/ranks";
import config from "../../apis/config";

uiManager.addUI(config.uiNames.Ranks.Add, "Add ranks", (player)=>{
    let modalForm = new ModalForm();
    let colors1 = colors.getColorNamesColored()
    .map(color => ({ option: color.trim() }));
    let colors2 = colors.getColorCodes()
    if (!Array.isArray(colors1) || colors1.length === 0) {
        throw new Error("colors1 must be a non-empty array of strings");
    }
    modalForm.title("Add rank")
    modalForm.textField("Rank:", "Example: Citizen", undefined);
    modalForm.textField("Tag:", "Example: default", undefined)
    modalForm.dropdown("Name Color", colors1, 7)
    modalForm.dropdown("Chat Color", colors1, 7)
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response)=>{

        const [textField, tf2, namecolor, chatColor] = response.formValues;

        if(textField.includes(" ")) return player.error("You can't make a rank with spaces!")

            let nc = colors2[namecolor]
            let cc = colors2[chatColor]
       if (response.canceled) return uiManager.open(player, config.uiNames.Config.Root)
        if (!textField) return player.error("You must enter a rank!")
        if (!tf2) return player.error("Tag not defined")
            ranks.create(tf2, textField, nc, cc)
    })
}) 