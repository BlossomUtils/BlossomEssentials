import commandManager from "../lib/commands/commandManager";
import { Entity, world } from "@minecraft/server";

commandManager.addCommand('floating-text', {description:'Spawn floating text',category:'Admin'}, ({ msg, args }) => {
    let loc = msg.sender.location
    if(!msg.sender.hasTag('admin')) return msg.sender.error(`You can't do this`);
    const text = msg.sender.dimension.spawnEntity('blossom:floating_text', loc)
    text.nameTag = `${args.join(' ').replaceAll('/n', `\n`)}`
})

commandManager.addSubcommand('floating-text', 'delete', {description:'Delete floating text within a radius'}, ({msg,args})=>{
    if(!msg.sender.hasTag('admin')) return msg.sender.error(`You can't do this`);
    msg.sender.runCommandAsync(`kill @e[type=blossom:floating_text,r=${args[0]}]`)
})