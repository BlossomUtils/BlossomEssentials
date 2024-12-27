import config from "../../apis/config";
import { sidebar } from "../../apis/sidebarAPI";
import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";
import moment from "../../lib/moment"

uiManager.addUI(config.uiNames.SidebarEditor.Add, "Sidebar editor add", (player)=>{
    let form = new ModalForm();
    form.title("§dSidebar Editor")
    form.textField("Name", "Example: Default", undefined)
    form.show(player, false, (player, res)=>{
        
        const [ name ] = res.formValues

        if(!name) return player.error("No name set"), uiManager.open(player, config.uiNames.SidebarEditor.Root)

        sidebar.addSidebar(name)
        player.info("Adding a sidebar requires you to restart the server to add lines after. Thanks! :3")
    })
})