import { prismarineDb } from "../lib/prismarinedb";

class ranks {
    constructor() {
        this.db = prismarineDb.table("ranks")
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
    create(tag, display) {
        let doc = this.getFromTag(tag)
        if(doc) return false;
        this.db.insertDocument({
            tag,
            display
        })
        return true;
    }
    remove(tag) {
        let doc = this.getFromTag(tag)
        if(!doc) return false;
        this.db.deleteDocumentByID(doc.id)
        return true;
    }
    edit(tag, display) {
        let doc = this.getFromTag(tag)
        if(!doc) return false;
        doc.data.display = display
        this.db.overwriteDataByID(doc.id, doc.data)
        return true;
    }
}

export default new ranks();