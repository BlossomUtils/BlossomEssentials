import config from "../../apis/config";
import UIBuilderV2 from "../../apis/UIBuilderV2";
import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

let layouts = [{ option: "Normal", value: 0 }, { option: "Grid", value: 1 }, { option: "Fullscreen", value: 2 }, { option: "Player Model", value: 3 }]

uiManager.addUI(config.uiNames.UIBuilderV2.Add, "UI Builder V2 Add UI", (player, ui) => {
    let defaultTitle;
    let defaultBody;
    let defaultScriptevent;
    let defaultLayout;
    if (ui) {
        defaultTitle = ui.data.name
        defaultBody = ui.data.body
        defaultScriptevent = ui.data.scriptevent
        defaultLayout = ui.data.layout
    }
    if (typeof defaultLayout == "string") defaultLayout = 0, console.log("test")
    let form = new ModalForm();
    form.title("Add UI")
    form.textField("Title", "Example: Best UI", defaultTitle)
    form.textField("Body", "Example: The best ui!", defaultBody)
    form.textField("Scriptevent", "Example: BestUI", defaultScriptevent)
    form.dropdown("Layout", layouts, defaultLayout ? defaultLayout : 0)
    form.submitButton("Submit")

    form.show(player, false, (player, response) => {

        const [title, body, scriptevent, layout] = response.formValues

        console.log(layout)

        let bd;

        if (!title) return player.error("No title defined");
        if (!body) {
            bd = ""
        } else {
            bd = body
        }
        if (!scriptevent) return player.error("No scriptevent defined")

        if (!ui) {
            UIBuilderV2.addUI(scriptevent, title, layout, bd)
            uiManager.open(player, config.uiNames.UIBuilderV2.Root)
        } else {
            UIBuilderV2.editUI(ui.id, scriptevent, title, layout, bd)
            uiManager.open(player, config.uiNames.UIBuilderV2.Edit, ui)
        }
    })
})