import commandManager from "../lib/commands/commandManager";
import { world } from "@minecraft/server"

commandManager.addCommand("cc", {description: "Clear the chat", category: "Players"}, ({msg,args})=>{
    if(!msg.sender.hasTag('admin')) return msg.sender.error("You can't do this!")
    world.sendMessage(`
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
Chat cleared by ${msg.sender.name}`)
})