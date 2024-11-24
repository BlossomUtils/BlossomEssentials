import config from "../apis/config";
import commandManager from "../lib/commands/commandManager";
import uiManager from "../uiManager";

commandManager.addCommand("uis", { description: `View UIs in ${config.info.name}`, author: "FruitKitty", category: "Setup" }, ({ msg }) => {
    let text = [];
    text.push(`§8----------- §aList §r§8-----------`)
    for(const ui of uiManager.uis) {
        text.push(`§e${ui.id} §r§7${ui.description ? ui.description : "No Description"}`);
    }
    text.push(``);
    text.push(`§2You can open a UI by doing §f/scriptevent ${config.details.openMainUI} §eui_id`);
    text.push(`§dExample: the ui §dblossom_config §r§2would be §d/scriptevent §d${config.details.openMainUI} admin.codes.redeem`)
    msg.sender.sendMessage(text.join('\n§r'))
})