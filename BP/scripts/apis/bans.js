import { system, world } from "@minecraft/server";
import { prismarineDb } from "../lib/prismarinedb";
import playerStorage from "./playerStorage";

class Bans {
    constructor() {
        system.run(() => {
            this.db = prismarineDb.table('Bans')
        })
    }

    getAll() {
        return this.db.findDocuments()
    }
    get(id) {
        return this.db.getByID(id)
    }
    ban(player, reason, admin) {
        let plr = playerStorage.getID(player)
        let b = this.db.findFirst({player: plr})
        if(b) return false;
        this.db.insertDocument({
            player: plr,
            reason,
            admin: admin.name,
            playerName: player.name
        })
        world.getDimension('overworld').runCommandAsync(`kick ${player.name} You are banned from this server! Reason: ${reason}`)
        return true;
    }
    unban(id) {
        let b = this.db.getByID(id)
        if(!b) return false;
        this.db.deleteDocumentByID(id)
        return true;
    }
    edit(id, reason) {
        let b = this.db.getByID(id)
        if(!b) return false;
        b.data.reason = reason;
        this.db.overwriteDataByID(id, b.data)
        return true;
    }
    onJoin(player) {
        let plr = playerStorage.getID(player)
        let b = this.db.findFirst({player: plr})
        if(!b) return false;
        player.runCommandAsync(`kick ${player.name} §dYou are banned from this server! Reason: ${b.data.reason}`)
        return true;
    }
}

export default new Bans()