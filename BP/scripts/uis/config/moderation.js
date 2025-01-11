import config from "../../apis/config"
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.Config.Moderation, "Moderation UI", (player) => {
    let form = new ActionForm();
    form.title("§dModeration");
        form.button("§cBack\n§7Go back to main page", 'textures/azalea_icons/2.png', (player)=>{
            uiManager.open(player, config.uiNames.Config.Root)
        })
        form.button(`§dPlayers\n§7View players`, 'textures/azalea_icons/8.png', (player) => {
            uiManager.open(player, config.uiNames.Moderation.Players.Root)
        })
    form.button(`§dReports\n§7View reports made by players`, 'textures/blossom_icons/report.png', (player) => {
        uiManager.open(player, config.uiNames.Moderation.Reports.Admin.Dashboard);
    });
    form.button(`§dBans\n§7View bans`, 'textures/azalea_icons/5.png', (player) => {
        uiManager.open(player, config.uiNames.Moderation.Bans.Root)
    })
    form.button(`§dWarnings\n§7View warnings`, 'textures/azalea_icons/5-oldmaybe.png', (player) => {
        uiManager.open(player, config.uiNames.Moderation.Warnings.Root)
    })

    form.show(player);
});