import commandManager from '../lib/commands/commandManager';
import { prismarineDb } from '../lib/prismarinedb'
import actionParser from './actionParser';
import * as mc from '@minecraft/server'
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
    add(name, category, description, author, action, type=null) {
        let cmd = this.db.findFirst({name: name})
        if(cmd) return;
        this.db.insertDocument({
            name,
            category,
            description,
            author,
            action,
            type
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
                if(cmd.data.type == 'Normal') {
                    actionParser.runAction(msg.sender, cmd.data.action)
                } 
                if(cmd.data.type == 'CloseChat') {
                    const system = mc.system
                        const player = msg.sender
                        player.success("Close chat and move to run command.");
                    
                        let ticks = 0;
                        let initialLocation = { x: player.location.x, y: player.location.y, z: player.location.z };
                    
                        let interval = system.runInterval(() => {
                            ticks++;
                    
                            if (ticks >= (20 * 10)) {
                                system.clearRun(interval);
                                player.error("Timed out. You didn't move!");
                            }
                    
                            if (player.location.x !== initialLocation.x ||
                                player.location.y !== initialLocation.y ||
                                player.location.z !== initialLocation.z) {
                    
                                system.clearRun(interval);
                                actionParser.runAction(msg.sender, cmd.data.action)
                            }
                        }, 1);
                }
            })
        }
    }
    edit(id, name, category, description, author, action, type=null) {
        let doc = this.get(id)
        if(!doc) return;
        commandManager.removeCommand(doc.data.name)
        doc.data.name = name
        doc.data.category = category
        doc.data.description = description
        doc.data.author = author
        doc.data.action = action
        if(type) doc.data.type = type
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