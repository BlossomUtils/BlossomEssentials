import { system } from "@minecraft/server";
import { prismarineDb } from "../lib/prismarinedb";

class Reports {
    constructor() {
        system.run(() => {
            this.db = prismarineDb.table('Reports')
        })
    }

    create(player, title, type, body) {
        let r = this.db.findFirst({title})
        if(r) return player.error("This report already exists!")
        this.db.insertDocument({
            player: player.name,
            title,
            type,
            body
        })
    }
    delete(id) {
        let r = this.db.getByID(id)
        if(!r) return;
        this.db.deleteDocumentByID(id)
    }
    get(id) {
        let r = this.db.getByID(id)
        if(!r) return null;
        return r;
    }
    getAll() {
        return this.db.findDocuments()
    }
    getFromPlayer(_) {
        return this.db.findDocuments({player: _.name})
    }
}

/*
    /\___/\
   (  o o  )
   (  =^=  ) 
    (  T  )  ︻デ═一
     |___|
    
    dont break this!
    - fruitkitty
*/



export default new Reports();