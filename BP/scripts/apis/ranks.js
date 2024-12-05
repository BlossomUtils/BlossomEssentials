import { prismarineDb } from "../lib/prismarinedb";
import * as mc from "@minecraft/server"

class ranks {
    constructor() {
        this.db = prismarineDb.table("ranks")
        this.defaultRank = mc.world.getDynamicProperty("defaultRank")
        this.defaultNameColor = mc.world.getDynamicProperty("defaultNameColor")
        this.defaultChatColor = mc.world.getDynamicProperty("defaultChatColor")
    }
    getAll() {
        return this.db.findDocuments({})
    }
    getAllFromPlayer(player) {
        let tags = player.getTags();
        let all = this.getAll();
        let ranks = [];

        for (const rank of all) {
            for (const tag of tags) {
                if (tag === rank.data.tag) {
                    ranks.push(`${rank.data.display}`)
                }
            }
        }
        return ranks;
    }
    getFromTag(tag) {
        return this.db.findFirst({tag})
    }
    create(tag, display, nameColor, chatColor) {
        let doc = this.getFromTag(tag)
        if(doc) return false;
        this.db.insertDocument({
            tag,
            display,
            nameColor,
            chatColor
        })
        return true;
    }
    remove(tag) {
        let doc = this.getFromTag(tag)
        if(!doc) return false;
        this.db.deleteDocumentByID(doc.id)
        return true;
    }
    edit(tag, display, nc, cc) {
        let doc = this.getFromTag(tag)
        if(!doc) return false;
        doc.data.display = display
        doc.data.nameColor = nc
        doc.data.chatColor = cc
        this.db.overwriteDataByID(doc.id, doc.data)
        return true;
    }
    updateDefaults() {
        this.defaultRank = mc.world.getDynamicProperty("defaultRank")
        this.defaultNameColor = mc.world.getDynamicProperty("defaultNameColor")
        this.defaultChatColor = mc.world.getDynamicProperty("defaultChatColor")
    }
}

export default new ranks();