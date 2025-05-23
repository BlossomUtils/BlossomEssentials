import config from "../../apis/config";
import lines from "../../apis/linesAPI";
import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";
import moment from "../../lib/moment"

uiManager.addUI(config.uiNames.SidebarEditor.AddLine, "Sidebar editor add line", (player, id, lineID) => {
    let form = new ModalForm();
    let line = lines.getLine(lineID, id)
    let text;
    if(!line) {
        text = undefined
    } else {
        text = line.text
    }
    form.title(`§f§u§l§l§s§c§r§e§e§n§r§dSidebar Editor`)
    form.textField(`§dText`, `Example: "§dMoney: {{money}}"`, text)
    form.show(player, false, (player, res) => {

        const [text] = res.formValues
        if (!line) {
            let asd = lines.addLine(text, id)
            uiManager.open(player, config.uiNames.SidebarEditor.EditLine, id, asd)
        } else {
            lines.editLine(lineID, text, id)
            uiManager.open(player, config.uiNames.SidebarEditor.EditLine, id, lineID)
        }
    })
})