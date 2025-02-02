import config from "../../apis/config"
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.Config.Extra, "Extra Settings UI", (player) => {
    const authors = config.info.authors
    let form = new ActionForm();
    form.title("§dExtra Settings");
        form.button("§cBack\n§7Go back to main page", 'textures/azalea_icons/2.png', (player)=>{
            uiManager.open(player, config.uiNames.Config.Root)
        })
    form.button(`§dEconomy Settings\n§7Edit the economy`, 'textures/azalea_icons/AddItem.png', (player) => {
        uiManager.open(player, config.uiNames.Economy.Root);
    });
    form.button(`§dEvents\n§7Configure events`, 'textures/blossom_icons/event2', (player) => {
        uiManager.open(player, config.uiNames.Events.Root);
    });
    form.button(`§dCombat Log\n§7Edit combat log stuff`, 'textures/items/diamond_sword', (player) => {
        uiManager.open(player, config.uiNames.Config.CombatLog);
    });
    form.button(`§dVoting System\n§7Edit voting system`, 'textures/blossom_icons/vote', (player) => {
        uiManager.open(player, config.uiNames.Voting.Root);
    });
    form.button(`§dLeaderboards\n§7Edit leaderboards`, 'textures/blossom_icons/medal', (player) => {
        uiManager.open(player, config.uiNames.Leaderboards.Root);
    });
    form.button(`§dXray Alerts\n§7Configure xray alerts`, 'textures/blossom_icons/xraydiamond', (player) => {
        uiManager.open(player, config.uiNames.Config.XRay);
    });
    form.show(player);
});