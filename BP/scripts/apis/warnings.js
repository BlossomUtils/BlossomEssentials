import { prismarineDb } from '../lib/prismarinedb'

class Warnings {
    constructor() {
        this.db = prismarineDb.table('warnings')
    }
    add(name, reason, admin) {
        let w = this.db.findFirst({reason, admin: admin.name})
        if(w) return false;
        this.db.insertDocument({name, reason, admin: admin.name})
        return true;
    }
    remove(id) {
        let w = this.db.getByID(id)
        if(!w) return false;
        this.db.deleteDocumentByID(w.id)
        return true;
    }
    getWarnsfromPlayer(name) {
        return this.db.findFirst({name})
    }
    getWarn(id) {
        return this.db.getByID(id)
    }
    getAllWarnings() {
        return this.db.findDocuments()
    }
}

export default new Warnings();