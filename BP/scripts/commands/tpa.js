import modules from "../apis/modules";
import tpa from "../apis/tpa";
import commandManager from '../lib/commands/commandManager'

commandManager.addCommand('tpa', {description: "Teleport to players", category: 'Players'}, ({msg,args})=>{
    if (!modules.tpa) return msg.sender.error("TPA system is disabled")
    let request = tpa.request(msg.sender, args.join(' '))
    if(!request === true) {
        msg.sender.error(request)
    } else {
        msg.sender.success(`Requested to teleport to ${args.join(' ')}`)
    }
})
commandManager.addSubcommand('tpa', 'accept', {description: 'Accept teleport request'}, ({msg})=>{
    if (!modules.tpa) return msg.sender.error("TPA system is disabled")
    let rq = tpa.accept(msg.sender)
    if(rq === true) {
        msg.sender.success('Accepted teleport request')
    } else {
        msg.sender.error(rq)
    }
})