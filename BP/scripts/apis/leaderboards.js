import { system, world } from "@minecraft/server";
import { prismarineDb } from "../lib/prismarinedb";

class Leaderboards {
    constructor() {
        system.run(() => {
            this.db = prismarineDb.table('+BLSM:Leaderboards')
            system.runInterval(() => {
                this.updateLeaderboards()
            }, 30)
        })
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
    edit(id,firstline,offlineDisabled,theme) {
        let lb = this.db.getByID(id)
        if(!lb) return;
        let data = lb.data
        data.firstLine = firstline
        data.offlineDisabled = offlineDisabled
        data.theme = theme
        this.db.overwriteDataByID(id, data)
    }
    getAll() {
        return this.db.findDocuments();
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
            lbtext.push(`${data.firstLine ? data.firstLine : '---' + obj.displayName ? obj.displayName : data.scoreboard + '---'}`)
            for(const o of obj.getScores().sort((a,b) => b - a)) {
                if(data.offlineDisabled && o.participant.displayName == 'commands.scoreboard.players.offlinePlayerName') continue;

                lbtext.push(`${o.participant.displayName.replaceAll('commands.scoreboard.players.offlinePlayerName', 'Offline Player')}: ${o.score}`)
            }
            entity.nameTag = lbtext.join(`\n§r${data.theme ? data.theme : ''}`)
        }
    }
}

export default new Leaderboards();