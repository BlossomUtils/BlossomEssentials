import warpAPI from "../apis/warpAPI";
import commandManager from "../lib/commands/commandManager";

commandManager.addCommand("warp", {description: "Warp to any server location", category: "Players"}, ({msg,args})=>{
    if (!args[0]) return msg.sender.error("You need to enter an argument")
    warpAPI.tpTo(args[0], msg.sender)
})
commandManager.addSubcommand("warp", "set", {description: "Set warps"}, ({msg,args})=>{
    if (!args[0]) return msg.sender.error("You need to enter an argument");
    if (args[1]) return msg.sender.error("You can't have spaces in a warp!");
    if(!msg.sender.hasTag('admin')) return msg.sender.error("You must have admin!")
    warpAPI.create(args[0], msg.sender)
})