import commandManager from "../lib/commands/commandManager";
import clanAPI from "../apis/clanAPI";

commandManager.addCommand("clanData", { description: "Get clan data" }, ({ msg, args }) => {

    if(!msg.sender.hasTag('admin')) return msg.sender.error("You are not admin!");

    msg.sender.sendMessage(`${JSON.stringify(clanAPI.db.findDocuments())}`)
})