import { prismarineDb } from "../lib/prismarinedb";
import * as mc from "@minecraft/server"
import actionParser from "./actionParser";

class bindAPI {
    constructor() {
        mc.system.run(() => {
            this.db = prismarineDb.table("binds")
        })
    }
    getBinds() {
        return this.db.findDocuments();
    }
    getBind(typeId) {
        return this.db.findFirst({ typeId })
    }
    createBind(typeId, command, player) {
        let doc = this.getBind(typeId)
        if (doc) return player.error("You can't set the same item as a bind! Please delete the bind if you want to change it.");

        this.db.insertDocument({
            typeId,
            command
        })
        player.success("Created document")
    }
    deleteBind(player, typeId) {
        let doc = this.getBind(typeId)
        if (!doc) return player.error("Could not find document with type id");
        this.db.deleteDocumentByID(doc.id);
        player.success("Deleted document")
    }
    runBind(player, typeId) {
        let doc = this.getBind(typeId)
        if (!doc) throw new Error("No document found");
        actionParser.runAction(player, doc.data.command)
    }
    reload() {
        this.db = prismarineDb.table("binds")
    }
}
export default new bindAPI();