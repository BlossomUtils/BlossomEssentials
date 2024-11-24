import * as mc from '@minecraft/server'
import { prismarineDb } from '../lib/prismarinedb'

class warpAPI {
    constructor() {
        this.db = prismarineDb.table("warps")
    }
    getAll() {
        return this.db.findDocuments()
    }
    getFromName(name) {
        return this.db.findFirst({name})
    } 
    create(name, player) {
        if (this.getFromName(name)) return player.error("Name already found in database")
        this.db.insertDocument({name, location: player.location})
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
        function teleport() {
            player.teleport(doc.data.location, {
                dimension: mc.world.getDimension("overworld")
            })
        }
        mc.system.run(teleport)
        player.success(`Teleported to warp: ${name}`)
    }
}

export default new warpAPI();