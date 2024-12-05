import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";
import ranks from "../../apis/ranks";
import config from "../../apis/config";
import { colors } from "../../lib/prismarinedb";

uiManager.addUI(config.uiNames.Ranks.Edit, "Edit rank", (player, tag, display, nameColor = "§7", chatColor = "§7")=>{
    let modalForm = new ModalForm();
    let colors1 = colors.getColorNamesColored()
    .map(color => ({ option: color.trim() }));
    let colors2 = colors.getColorCodes()
    let nc1 = colors.colorCodeToKey(nameColor)
    let cc1 = colors.colorCodeToKey(chatColor)
    modalForm.title(`Edit rank: ${tag}`)
    modalForm.textField("Display:", "Example: Citizen", display);
    modalForm.dropdown("Name Color", colors1, nc1)
    modalForm.dropdown("Chat Color", colors1, cc1)
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response)=>{

        const [textField, newnamecolor, newchatcolor] = response.formValues;

        let cc = colors2[newchatcolor]
        let nc = colors2[newnamecolor]
        if(textField.includes(" ")) return player.error("You can't make a rank with spaces!")

       if (response.canceled) return uiManager.open(player, config.uiNames.Config.Root)
        if (!textField) return player.error("You must enter a rank!")
            ranks.edit(tag, textField, nc, cc)
    })
}) 