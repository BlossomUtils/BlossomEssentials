import config from "../../apis/config";
import { sidebar } from "../../apis/sidebarAPI";
import lines from "../../apis/linesAPI";
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";
import moment from "../../lib/moment"

uiManager.addUI(config.uiNames.SidebarEditor.Edit, "Sidebar editor edit", (player, id) => {
    let sd = sidebar.getSidebar(id);
    if (!sd) {
        player.sendMessage("§cError: Sidebar not found or not initialized.");
        console.error(`Sidebar with ID ${id} not found.`);
        return;
    }
    if(!lines) throw new Error("Lines not initialized")

    let form = new ActionForm();
    form.title(`§f§u§l§l§s§c§r§e§e§n§r${sd.data.name}`)
    form.button(`§cBack\n§7Go back to main UI`, null, (player)=>{
        uiManager.open(player, config.uiNames.SidebarEditor.Root)
    })
    form.button(`§aAdd Line\n§7Add a line to the sidebar`, `textures/azalea_icons/1`, (player)=>{
        uiManager.open(player, config.uiNames.SidebarEditor.AddLine, id)
    })
    for (const line of lines.getLines(id)) {
        form.button(`§r${line.text}`, null, (player)=>{
            uiManager.open(player, config.uiNames.SidebarEditor.EditLine, id, line.id)
        })
    }
    form.button(`§cDelete Sidebar\n§7Delete this sidebar`, `textures/azalea_icons/Delete`, (player)=>{
        sidebar.deleteSidebar(sd.data.name)
    })
    form.show(player)
})