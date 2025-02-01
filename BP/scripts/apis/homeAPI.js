import { prismarineDb } from "../lib/prismarinedb";
import * as mc from "@minecraft/server"

class homeAPI {
    constructor() {
        this.db = prismarineDb.table("homes")
        this.migrateHomes();
    }
    findByName(name, player) {
        return this.db.findFirst({name, PlayerName: player})
    }
    migrateHomes() {
        let docs = this.findAll();
        for(const doc of docs) {
            if(!doc.data.shared) doc.data.shared = []
            if(!doc.data.dimension) doc.data.dimension = 'minecraft:overworld'
            this.db.overwriteDataByID(doc.id, doc.data)
        }
    }
    findAll() {
        return this.db.findDocuments();
    }
    findAllFromPlayer(PlayerName) {
        return this.db.findDocuments({PlayerName})
    }
    create(player, name) {
        let doc = this.findByName(name, player.name)
        if (doc) return player.error("You can't create a home with the same name as another one!")
        this.db.insertDocument({
            PlayerName: player.name,
            location: player.location,
            name,
            dimension: player.dimension.id,
            shared: []
        })
    }
    remove(player, name) {
        let doc = this.findByName(name, player.name)
        if(!doc) return player.error(`No document found with player name and home name`);
        this.db.deleteDocumentByID(doc.id)
    }
    share(player, name, owner) {
        let doc = this.findByName(name, owner.name)
        if(!doc) return owner.error(`Could not find home`);
        doc.data.shared.push(player.name)
        this.db.overwriteDataByID(doc.id, doc.data)
    }
    removeshare(name, home, owner) {
        let doc = this.findByName(home, owner.name)
        if(!doc) return owner.error(`Can't find home`);
        let index = doc.data.shared.findIndex(p => p === name)
        if(index === -1) return owner.error('Cant find player');
        doc.data.shared.splice(index, 1)
        this.db.overwriteDataByID(doc.id, doc.data)
    }
    getShared(name) {
        let docs = this.db.findDocuments()
        let homes = []
        for(const doc of docs) {
            for (const share of doc.data.shared) {
                if(share == name) {
                    homes.push(doc)
                }
            }
        }
        return homes;
    }
    teleportTo(player, name, owner) {
        let doc = this.findByName(name, owner)
        if(player.getDynamicProperty('inCombat') == true) return player.error('In combat')
        player.runCommandAsync(`scriptevent blossom:homeTeleportedTo ${player.name} just teleported to the home "${name}"`)
        if(!doc) return player.error(`Could not find home with name: ${name} under ${owner}`);
        player.teleport(doc.data.location, {
            dimension: mc.world.getDimension(doc.data.dimension)
        })
    }
    reload() {
        this.db = prismarineDb.table("homes")
    }
}

export default new homeAPI();