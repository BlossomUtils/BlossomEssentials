import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";
import config from "../../apis/config";
import customCommands from "../../apis/customCommands";

uiManager.addUI(config.uiNames.CustomCommands.Create, "Create a custom command", (player)=>{
    let modalForm = new ModalForm();
    let types = ["Normal", 'CloseChat']
    let typesDisplay = ['Normal', 'Close Chat']
    modalForm.title("Custom Commands")
    modalForm.textField("Name:", "Example: spawn", undefined);
    modalForm.textField("Action:", "Example: tp 0 70 0", undefined);
    modalForm.textField("Category:", "Example: Players", undefined);
    modalForm.textField("Description:", "Example: TP to spawn", undefined);
    modalForm.textField("Author:", `Example: ${player.name}`, undefined);
    modalForm.dropdown('Type', typesDisplay.map(_=>{
        return {option:`${_}`}
    }), 0)
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response)=>{

        const [name, action, category, description, author, i] = response.formValues;

       if (response.canceled) return uiManager.open(player, config.uiNames.Config.Root)
        if (!name) return error("You must enter a name!", player)
            if (!action) return error("You must enter an action!", player)
                if (!category) return error("You must enter a category!", player)
                    if (!description) return error("You must enter a description!", player)
                        if (!author) return error("You must enter an author!", player)
                            const type = types[i]
            customCommands.add(name, category, description, author, action, type)
            player.success(`Created command with name: ${name}`)
    })
}) 