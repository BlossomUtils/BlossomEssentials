import config from "../../apis/config"
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.Config.Credits, "Credits UI", (player) => {
    const authors = config.info.authors
    let form = new ActionForm();
    form.title("§dCredits");

    form.button(`§cBack\n§7[ Go Back ]`, null, (player) => {
        uiManager.open(player, config.uiNames.Config.Root);
    });
    for (const author of authors) {
        let icon = author.icon ? author.icon : "icons/icon.png"
        form.button(`§d${author.name}\n§7${author.description}`, `${icon}`, (player) => {
            uiManager.open(player, config.uiNames.Config.Root)
        });
    }

    form.show(player);
});