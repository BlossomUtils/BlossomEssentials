import commandManager from '../lib/commands/commandManager';
import { prismarineDb } from '../lib/prismarinedb'
import actionParser from './actionParser';
/*
    /\___/\
   (  o o  )
   (  =^=  ) 
    (  T  )  ︻デ═一
     |___|
    
    dont break this!
    - fruitkitty
*/
class CustomCommands {
    constructor() {
        this.db = prismarineDb.table("CustomCommands")
    }
    add(name, category, description, author, action) {
        let cmd = this.db.findFirst({name: name})
        if(cmd) return;
        this.db.insertDocument({
            name,
            category,
            description,
            author,
            action
        })
        this.pushCommands()
        return true;
    }
    remove(id) {
        let doc = this.get(id)
        commandManager.removeCommand(doc.data.name)
        this.db.deleteDocumentByID(id)
        return true;
    }
    pushCommands() {
        for (const cmd of this.db.findDocuments()) {
            commandManager.addCommand(cmd.data.name, {
                description: cmd.data.description,
                category: cmd.data.category,
                author: cmd.data.author
            }, ({msg})=>{
                actionParser.runAction(msg.sender, cmd.data.action)
            })
        }
    }
    edit(id, name, category, description, author, action) {
        let doc = this.get(id)
        if(!doc) return;
        commandManager.removeCommand(doc.data.name)
        doc.data.name = name
        doc.data.category = category
        doc.data.description = description
        doc.data.author = author
        doc.data.action = action
        this.db.overwriteDataByID(id, doc.data)
        this.pushCommands()
    }
    get(id) {
        let doc = this.db.getByID(id)
        if(!doc) return false;
        if(doc) return doc;
    }
    findFirst(name) {
        let doc = this.db.findFirst({name})
        if(doc) return doc;
    }
    reload() {
        this.db = prismarineDb.table("CustomCommands")
    }
}

export default new CustomCommands()