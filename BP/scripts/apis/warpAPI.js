import * as mc from '@minecraft/server'
import { prismarineDb } from '../lib/prismarinedb'

class warpAPI {
    constructor() {
        this.db = prismarineDb.table("warps")
        this.migrate();
    }
    getAll() {
        return this.db.findDocuments()
    }
    migrate() {
        let docs = this.db.findDocuments()
        for (const doc of docs) {
            if(!doc.data.dimension) doc.data.dimension = 'minecraft:overworld';
            this.db.overwriteDataByID(doc.id, doc.data)
        }
    }
    getFromName(name) {
        return this.db.findFirst({name})
    } 
    create(name, player) {
        if (this.getFromName(name)) return player.error("Name already found in database")
        this.db.insertDocument({name, location: player.location, dimension: player.dimension.id})
        player.success(`Created warp: ${name}`)
    }
    remove(name, player) {
        let doc = this.getFromName(name);
        if (doc) {
            this.db.deleteDocumentByID(doc.id)
            player.success(`Deleted warp name: ${name}`)
        } else {
            player.error("No warp found")
        }
    }
    tpTo(name, player) {
        let doc = this.getFromName(name)
        if(!doc) return player.error("No warp found");
        if(player.getDynamicProperty('inCombat') == true) return player.error('In combat')
        function teleport() {
            player.teleport(doc.data.location, {
                dimension: mc.world.getDimension(`${doc.data.dimension}`)
            })
        }
        mc.system.run(teleport)
        player.success(`Teleported to warp: ${name}`)
    }
}

export default new warpAPI();