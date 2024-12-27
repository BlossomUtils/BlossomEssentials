import commandManager from "../lib/commands/commandManager";
import { sidebar } from "../apis/sidebarAPI";
import { world } from "@minecraft/server";

commandManager.addCommand("sidebardata", { description: "Get sidebar data" }, ({ msg, args }) => {

    if(!msg.sender.hasTag('admin')) return msg.sender.error("You are not admin!");

    msg.sender.sendMessage(`${JSON.stringify(sidebar.db.findDocuments())}`)
})
commandManager.addCommand(`data`, { description: "Get everything in the DB" }, ({msg})=>{
    if(!msg.sender.hasTag(`developer`)) return;

    world.getDynamicPropertyIds().forEach((id) => {
        const value = world.getDynamicProperty(id);
        msg.sender.sendMessage(`${id}, ${value}`)
      });
    
})