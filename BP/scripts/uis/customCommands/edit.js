import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";
import config from "../../apis/config";
import customCommands from "../../apis/customCommands";

uiManager.addUI(config.uiNames.CustomCommands.Edit, "Create a custom command", (player, cmd)=>{
    let modalForm = new ModalForm();
    modalForm.title("Custom Commands")
    modalForm.textField("Name:", "Example: spawn", cmd.data.name);
    modalForm.textField("Action:", "Example: tp 0 70 0", cmd.data.action);
    modalForm.textField("Category:", "Example: Players", cmd.data.category);
    modalForm.textField("Description:", "Example: TP to spawn", cmd.data.description);
    modalForm.textField("Author:", `Example: ${player.name}`, cmd.data.author);
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response)=>{

        const [name, action, category, description, author] = response.formValues;

       if (response.canceled) return uiManager.open(player, config.uiNames.Config.Root)
        if (!response.formValues[0]) return error("You must enter a name!", player)
            if (!response.formValues[1]) return error("You must enter an action!", player)
                if (!response.formValues[2]) return error("You must enter a category!", player)
                    if (!response.formValues[3]) return error("You must enter a description!", player)
                        if (!response.formValues[4]) return error("You must enter an author!", player)
                            if(response.formValues[0] !== cmd.data.name) player.info("Changing the name or removing a command requires a reload which you can do in Worlds or Bedrock Dedicated Server. If you are on realms, restart the realm.")
            customCommands.editCommand(cmd.id, response.formValues[1], response.formValues[0], response.formValues[2], response.formValues[3], response.formValues[4])
            player.success(`Edited command with name: ${name}`)
    })
}) 