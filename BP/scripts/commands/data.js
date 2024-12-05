import commandManager from "../lib/commands/commandManager";
import { sidebar } from "../apis/sidebarAPI";

commandManager.addCommand("sidebardata", { description: "Get sidebar data" }, ({ msg, args }) => {

    if(!msg.sender.hasTag('admin')) return msg.sender.error("You are not admin!");

    msg.sender.sendMessage(`${JSON.stringify(sidebar.db.findDocuments())}`)
})