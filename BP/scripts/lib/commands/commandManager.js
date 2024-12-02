import { system } from "@minecraft/server";
import { prismarineDb } from "../../lib/prismarinedb";
import { parseCommand } from "./parseCommand";

class CommandManager {
    constructor() {
        this.prefix = "-";
        this.cmds = prismarineDb.table("Commands")
        this.subcmds = prismarineDb.table("SubCommands")
        this.cmds.clear()
        this.subcmds.clear()
    }
    changecommandManagerPrefix(newPrefix) {
        this.prefix = `${newPrefix}`;
    }
    addCommand(name, data, callback) {
        let cmd = this.cmds.findFirst({name});
        if(cmd) {
            this.cmds.deleteDocumentByID(cmd.id);
        }
        this.cmds.insertDocument({
            name,
            ...data,
            callback
        })
    }
    addSubcommand(parent, name, data, callback) {
        this.subcmds.insertDocument({
            parent,
            name,
            ...data,
            callback
        });
    }
    removeCommand(name) {
        let cmd = this.cmds.findFirst({ name });
        if (cmd) {
            console.log(`Removing command: ${name} with ID: ${cmd.id}`);
            this.cmds.deleteDocumentByID(cmd.id);
        } else {
            console.log(`Command ${name} not found for removal.`);
        }
    }
    getSubCommandsFromCommand(name) {
        return this.subcmds.findDocuments({parent:name}).map(_=>_.data);
    }
    run(msg) {
        system.run(()=>{
            if(!msg.message.startsWith(this.prefix)) return;
            let data = msg.message.replaceAll(this.prefix, "").split(" ");
            let cmdName = data[0];
            let args = data.slice(1);
            let cmd = this.cmds.findFirst({name: cmdName});
            if(!cmd) return msg.sender.error("Command not found")
            if(data.length > 1) {
                let subcmd = this.subcmds.findFirst({name: data[1], parent: data[0]})
                if(subcmd) {
                    return subcmd.data.callback({msg, args: args.slice(1)});
                }
            }
            return cmd.data.callback({msg, args});
    
        })
    }
}

export default new CommandManager();