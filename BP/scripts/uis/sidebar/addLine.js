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
    form.title(`§dSidebar Editor`)
    form.textField(`§dText`, `Example: "§dMoney: {{money}}"`, text)
    form.show(player, false, (player, res) => {

        const [text] = res.formValues
        if (!line) {
            lines.addLine(text, id)
        } else {
            lines.editLine(lineID, text, id)
        }
    })
})