import { system } from "@minecraft/server";
import { prismarineDb } from "../lib/prismarinedb";

class Voting {
    constructor() {
        system.run(() => {
            this.db = prismarineDb.table('+BLSM:Voting')
        })
    }
    start(title,body,icon=null) {
        if(this.db.findFirst({title})) return false;
        let referendum = this.db.insertDocument({
            title,
            body,
            icon: icon ? icon : null,
            type: 'Referendum'
        })
        return referendum;
    }
    edit(id,title,body,icon=null) {
        let referendum = this.get(id)
        if(!referendum) return false;
        referendum.data.title = title
        referendum.data.body = body
        if(icon) referendum.data.icon = icon
        this.db.overwriteDataByID(id,referendum.data)
        return true;
    }
    vote(id, player, type='upvote') {
        let referendum = this.get(id)
        if(!referendum) return false;
        let v = this.db.findFirst({player:player.id})
        if(v) this.db.deleteDocumentByID(v.id);
        let vote = this.db.insertDocument({
            player: player.id,
            voteType: type,
            type: 'Vote',
            referendum: referendum.id
        })
        return vote;
    }
    get(id) {
        return this.db.getByID(id)
    }
    delete(id) {
        return this.db.deleteDocumentByID(id)
    }
}

export default new Voting();