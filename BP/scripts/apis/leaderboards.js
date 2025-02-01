import { system, world } from "@minecraft/server";
import { prismarineDb } from "../lib/prismarinedb";

class Leaderboards {
    constructor() {
        this.db = prismarineDb.table('+BLSM:Leaderboards')
        system.runInterval(() => {
            this.updateLeaderboards()
        }, 30)
    }
    add(scoreboard, dimension) {
        if(this.db.findFirst({scoreboard})) return;
        let lb = this.db.insertDocument({
            dimension,
            scoreboard
        })
        return lb;
    }
    remove(scoreboard) {
        let lb = this.db.findFirst({scoreboard})
        let data = lb.data
        if(!lb) return;
        let dimension = world.getDimension(`${data.dimension}`)
        if(!dimension) return;
        let entities = dimension.getEntities({
            tags: [`lb:${lb.id}`],
            type: 'blossom:floating_text'
        })
        let entity = entities[0]
        this.db.deleteDocumentByID(lb.id)
        try { 
            entity.remove();
        } catch (e) {
            entity.kill();
        }
        return true;
    }
    updateLeaderboards() {
        for (const lb of this.db.findDocuments()) {
            let data = lb.data
            let dimension = world.getDimension(`${data.dimension}`)
            if(!dimension) {
                this.db.deleteDocumentByID(lb.id)
                continue;
            }
            let entities = dimension.getEntities({
                tags: [`lb:${lb.id}`],
                type: 'blossom:floating_text'
            })
            let entity = entities[0]
            if(!entity) continue;
            let lbtext = [];
            let obj = world.scoreboard.getObjective(data.scoreboard)
            if(!obj) continue;
            lbtext.push(`---${obj.displayName ? obj.displayName : data.scoreboard}---`)
            for(const plr of world.getPlayers()) {
                let scbid = plr.scoreboardIdentity;
                if(!scbid) continue;
                if(!obj.hasParticipant(scbid)) obj.setScore(scbid, 0);
                lbtext.push(`${plr.name}: ${obj.getScore(scbid) ? obj.getScore(scbid) : 0}`)
            }
            entity.nameTag = lbtext.join('\n§r')
        }
    }
}

export default new Leaderboards();