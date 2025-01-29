import { ActionForm, ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";
import config from "../../apis/config";
import customCommands from "../../apis/customCommands";

uiManager.addUI(config.uiNames.CustomCommands.Edit, "Create a custom command", (player, id)=>{
    let doc = customCommands.get(id)
    let af = new ActionForm()
    af.title("Edit Command")
    af.button("Edit display", null, (player)=>{
        let types = ['Normal', 'CloseChat']
        let typesDisplay = ['Normal', 'Close Chat']
        let df = new ModalForm();
        df.title("Edit Display")
        df.textField("Name", "Name of command", doc.data.name)
        df.textField("Category", "Category of Command", doc.data.category)
        df.textField("Description", "Description of Command", doc.data.description)
        df.textField("Author", "Author of Command", doc.data.author)
        df.dropdown('Type', typesDisplay.map(_=>{
            return {option:`${_}`}
        }), 0)
        df.submitButton("Edit Display")
        df.show(player, false, (player, response)=>{

            customCommands.edit(doc.id, response.formValues[0], response.formValues[1], response.formValues[2], response.formValues[3], doc.data.action, types[response.formValues[4]])
            uiManager.open(player, config.uiNames.CustomCommands.Edit, id)
        })
    })
    af.button("Edit action", null, (player)=>{
        let actionForm = new ModalForm();
        actionForm.title("Code Editor")
        actionForm.textField("Code", "Code", doc.data.action)
        actionForm.show(player, false, (player, response)=>{

            customCommands.edit(doc.id, doc.data.name, doc.data.category, doc.data.description, doc.data.author, response.formValues[0])
            uiManager.open(player, config.uiNames.CustomCommands.Edit, id)
        })
    })
    af.button("Edit", null, (player)=>{
        uiManager.open(player, config.uiNames.CustomCommands.EditCmds)
    })
    af.show(player)
}) 