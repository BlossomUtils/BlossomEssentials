import { prismarineDb } from "../lib/prismarinedb";
import commandManager from "../lib/commands/commandManager";
import actionParser from "./actionParser";

class customCommands {
    constructor() {
        this.db = prismarineDb.table("CustomCommands")
    }
    getCommand(name) {
        return this.db.findFirst({name})
    }
    getCommands() {
        return this.db.findDocuments()
    }
    getCommandWithID(id) {
        return this.db.getByID(id)
    }
    addCommand(action, name, category, description, author) {
        let cmd = this.getCommand(name)
        if(cmd) return false;
        let defcmd = commandManager.cmds.findFirst({name})
        if(defcmd) return false;
        this.db.insertDocument({
            action,
            name,
            category,
            description,
            author
        })
        this.pushCommands()
        return true;
    }
    pushCommands() {
        for (const cmd of this.db.findDocuments()) {
            commandManager.addCommand(cmd.data.name, { 
                description: cmd.data.description, 
                category: cmd.data.category, 
                author: cmd.data.author
            }, ({msg}) => {
                actionParser.runAction(msg.sender, cmd.data.action)
            });
        }
    }
    
    removeCommand(id) {
        let cmd = this.getCommandWithID(id)
        if(!cmd) return false;
        this.db.deleteDocumentByID(id)
        commandManager.removeCommand(cmd.data.name)
        return true;
    }
    editCommand(id, action, name, category, description, author) {
        let cmd = this.getCommandWithID(id)
        if(!cmd) return false;
        commandManager.removeCommand(cmd.data.name)
        cmd.data.action = action
        cmd.data.name = name
        cmd.data.category = category
        cmd.data.description = description
        cmd.data.author = author
        this.db.overwriteDataByID(cmd.id, cmd.data)
        this.pushCommands()
    }
}
export default new customCommands();