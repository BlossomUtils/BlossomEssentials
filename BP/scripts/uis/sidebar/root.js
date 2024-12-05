import config from "../../apis/config";
import { sidebar } from "../../apis/sidebarAPI";
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";
import moment from "../../lib/moment"
uiManager.addUI(config.uiNames.SidebarEditor.Root, "Sidebar editor root", (player) => {
    let form = new ActionForm();
    form.title("§dSidebar Editor")
    form.button(`§cBack\n§7Go back to the main UI`, `textures/azalea_icons/2.png`, (player)=>{
        uiManager.open(player, config.uiNames.Config.Main)
    })
    form.button(`§aAdd Sidebar\n§7Add a sidebar`, `textures/azalea_icons/1.png`, (player)=>{
        uiManager.open(player, config.uiNames.SidebarEditor.Add)
    })
    for (const sd of sidebar.getSidebars()) {
        form.button(`${sd.data.name}\n§eUpdated ${moment(sd.updatedAt).fromNow()}`, null, (player)=>{
            uiManager.open(player, config.uiNames.SidebarEditor.Edit, sd.id)
        })
    }
    form.show(player)
})