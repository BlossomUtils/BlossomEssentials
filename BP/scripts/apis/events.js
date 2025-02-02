import { world } from "@minecraft/server";
import { prismarineDb } from "../lib/prismarinedb";
import actionParser from "./actionParser";

class Events {
    constructor() {
        this.db = prismarineDb.table('+BLSM:Events')
        world.afterEvents.entityDie.subscribe((e) => {
            if(!e.damageSource.damagingEntity.typeId == 'minecraft:player' || !e.deadEntity.typeId == 'minecraft:player') return;
            for(const ev of this.getAll()) {
                for (const a of ev.data.killedActions) {
                    actionParser.runAction(e.deadEntity, a)
                }
                for(const a of ev.data.killerActions) {
                    actionParser.runAction(e.damageSource.damagingEntity, a)
                }
            }
        })
    }
    create(display,type='kill') {
        let asd = this.db.findFirst({display,type})
        if(asd) return false;
        this.db.insertDocument({
            display,
            killedActions:[],
            killerActions:[],
            type
        })
    }
    remove(id) {
        return this.db.deleteDocumentByID(id);
    }
    edit(id,display) {
        let ev = this.db.getByID(id)
        if(!ev) return false
        ev.data.display = display
        return this.db.overwriteDataByID(ev.id, ev.data)
    }
    getAll() {
        return this.db.findDocuments();
    }
    addAction(id,action,type='killer') {
        let ev = this.db.getByID(id)
        if(!ev) return false;
        if(type == 'killer') {
            ev.data.killerActions.push(action)
        }
        if(type == 'killed') {
            ev.data.killedActions.push(action)
        }
        return this.db.overwriteDataByID(ev.id, ev.data)
    }
    removeAction(id,action,type='killer') {
        let ev = this.db.getByID(id)
        if(!ev) return false;
        let ac;
        if(ev.data.killerActions.findIndex(_=>_==action)) {
            ac = ev.data.killerActions.findIndex(_=>_==action)
        }
        if(ev.data.killedActions.findIndex(_=>_==action)) {
            ac = ev.data.killedActions.findIndex(_=>_==action)
        }
        if(!ac) return false;
        if(type == 'killer') {
            ev.data.killerActions.splice(ac, 1)
        }
        if(type == 'killed') {
            ev.data.killedActions.splice(ac, 1)
        }
        return this.db.overwriteDataByID(ev.id, ev.data)
    }
    editAction(id,action,newAction,type='killer') {
        let ev = this.db.getByID(id)
        if(!ev) return false;
        let ac;
        if(ev.data.killerActions.findIndex(_=>_==action)) {
            ac = ev.data.killerActions.findIndex(_=>_==action)
            console.log('found killer')
        }
        if(ev.data.killedActions.findIndex(_=>_==action)) {
            ac = ev.data.killedActions.findIndex(_=>_==action)
            console.log('found killed')
        }
        if(!ac) return false;
        if(type == 'killer') {
            ev.data.killerActions[ac] = newAction
            console.log(ev.data.killerActions[ac])
        }
        if(type == 'killed') {
            ev.data.killedActions[ac] = newAction
            console.log(ev.data.killedActions[ac])
        }
        return this.db.overwriteDataByID(ev.id, ev.data)
    }
}

export default new Events();