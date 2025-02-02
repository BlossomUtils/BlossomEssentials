import { ActionForm } from "../../lib/prismarinedb";
import voting from "../../apis/voting";
import uiManager from "../../uiManager";
import config from "../../apis/config";

uiManager.addUI(config.uiNames.Voting.View, 'voting view', (player,id) => {
    let downvotes = [];
    let upvotes = [];
    for(const v of voting.db.findDocuments({type:'Vote'})) {
        if(v.data.referendum == id) {
            if(v.data.voteType == 'upvote') {
                upvotes.push(v)
            } else {
                downvotes.push(v)
            }
        }
    }
    let r = voting.get(id)
    if(!r) return;
    let form = new ActionForm();
    form.title(r.data.title)
    form.body(`${r.data.body}\n§r§cDownvotes: ${downvotes.length}\n§aUpvotes: ${upvotes.length}\n§bTotal: ${upvotes.length + downvotes.length}`)
    form.button(`§cBack\n§7Go to previous UI`, `textures/azalea_icons/2.png`, (player)=>{
        uiManager.open(player, config.uiNames.Voting.Root)
    })
    form.button(`§aUpvote\n§7Upvote this referendum`, 'textures/blossom_icons/upvote.png', (player) => {
        voting.vote(id,player,'upvote')
        uiManager.open(player, config.uiNames.Voting.View, id)
    })
    form.button(`§cDownvote\n§7Downvote this referendum`, 'textures/blossom_icons/downvote.png', (player) => {
        voting.vote(id,player,'downvote')
        uiManager.open(player, config.uiNames.Voting.View, id)
    })
    form.show(player)
})