import leaderboards from "../apis/leaderboards";
import commandManager from "../lib/commands/commandManager";

commandManager.addCommand('lb', {description:'Spawn leaderboard',category:'Admin'}, ({ msg, args }) => {
    if(!msg.sender.hasTag('admin')) return;
    let lb = leaderboards.add(`${args[0]}`, msg.sender.dimension.id)
    let loc = msg.sender.location
    if(!msg.sender.hasTag('admin')) return msg.sender.error(`You can't do this`);
    const text = msg.sender.dimension.spawnEntity('blossom:floating_text', loc)
    text.addTag(`lb:${lb}`)
    text.nameTag = `Creating leaderboard..`
})
commandManager.addSubcommand('lb', 'remove', {description:'Remove leaderboard'}, ({ msg, args }) => {
    if(!msg.sender.hasTag('admin')) return;
    leaderboards.remove(args[0])
})