import commandManager from "../lib/commands/commandManager";
import loreAPI from "../apis/loreAPI";

commandManager.addCommand("lore", { description: "Lore system", category: "Admin" }, ({ msg }) => {
    msg.sender.info("Use a subcommand")
})
commandManager.addSubcommand("lore", "add", { description: "Add lore to an item" }, ({ msg, args }) => {
    if(!msg.sender.hasTag("admin")) return msg.sender.error("You can't do this!");
    if(!args) return msg.sender.error("Enter lore!");
        
    loreAPI.addLore(msg.sender, args.join(' '))
})

commandManager.addSubcommand("lore", "remove", { description: "Remove lore from an item "}, ({ msg,args }) => {
    if(!msg.sender.hasTag("admin")) return msg.sender.error("You can't do this!");
        
    loreAPI.removeLore(msg.sender, args.join(' '))
    msg.sender.success("Removed lore")
})