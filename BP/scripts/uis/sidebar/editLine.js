import config from "../../apis/config";
import { sidebar } from "../../apis/sidebarAPI";
import lines from "../../apis/linesAPI";
import { ActionForm } from "../../lib/form_func";
import uiManager from "../../uiManager";
import moment from "../../lib/moment";

uiManager.addUI(config.uiNames.SidebarEditor.EditLine, "Sidebar editor edit line", (player, id, lineID) => {
    let form = new ActionForm();

    if (!sidebar) {
        console.error("Sidebar not initialized when EditLine UI is called.");
        player.sendMessage("§cSidebar API is unavailable.");
        return;
    }

    // Fetch line and sidebar with error handling
    let line = lines.getLine(lineID, id);
    let sd = sidebar.getSidebar(id);

    if (!sd) {
        player.sendMessage("§cError: Sidebar not found.");
        return;
    }
    if (!line) {
        player.sendMessage("§cError: Line not found.");
        return;
    }

    form.title(`Edit line`);
    form.button(`§cBack\n§7Go back to edit UI`, `textures/azalea_icons/2.png`, () => {
        uiManager.open(player, config.uiNames.SidebarEditor.Edit, id);
    });
    form.button(`§dEdit Line\n§7Edit this line`, `textures/azalea_icons/Settings`, () => {
        uiManager.open(player, config.uiNames.SidebarEditor.AddLine, id, lineID);
    });
    form.button(`§dMove Up\n§7Move this line up`, `textures/azalea_icons/Up`, () => {
        lines.moveLineUp(sd.data.name, lineID);
        uiManager.open(player, config.uiNames.SidebarEditor.EditLine, id, lineID);
    });
    form.button(`§dMove Down\n§7Move this line down`, `textures/azalea_icons/Down`, () => {
        lines.moveLineDown(sd.data.name, lineID);
        uiManager.open(player, config.uiNames.SidebarEditor.EditLine, id, lineID);
    });
    form.button(`§cDelete\n§7Delete this line`, `textures/azalea_icons/Delete`, () => {
        lines.removeLine(lineID, id);
        uiManager.open(player, config.uiNames.SidebarEditor.Edit, id);
    });

    form.show(player);
});
