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
    form.show(player);
});