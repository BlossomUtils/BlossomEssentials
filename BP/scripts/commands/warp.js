import warpAPI from "../apis/warpAPI";
import commandManager from "../lib/commands/commandManager";

commandManager.addCommand("warp", {description: "Warp to any server location", category: "Players"}, ({msg,args})=>{
    warpAPI.tpTo(args[0], msg.sender)
})
commandManager.addSubcommand("warp", "set", {description: "Set warps"}, ({msg,args})=>{
    warpAPI.create(args[0], msg.sender)
})