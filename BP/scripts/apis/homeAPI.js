import { prismarineDb } from "../lib/prismarinedb";
import * as mc from "@minecraft/server"

class homeAPI {
    constructor() {
        this.db = prismarineDb.table("homes")
    }
    findByName(name, player) {
        return this.db.findFirst({name, PlayerName: player})
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
            name
        })
    }
    remove(player, name) {
        let doc = this.findByName(name, player.name)
        if(!doc) return player.error(`No document found with player name and home name`);
        this.db.deleteDocumentByID(doc.id)
    }
    teleportTo(player, name) {
        let doc = this.findByName(name, player.name)
        player.runCommandAsync(`scriptevent blossom:homeTeleportedTo ${player.name} just teleported to the home "${name}"`)
        if(!doc) return player.error(`Could not find home with name: ${name} under ${player.name}`);
        player.teleport(doc.data.location, {
            dimension: mc.world.getDimension("overworld")
        })
    }
    reload() {
        this.db = prismarineDb.table("homes")
    }
}

export default new homeAPI();