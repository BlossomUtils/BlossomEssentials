import { Player, world } from "@minecraft/server";
import { prismarineDb } from "../lib/prismarinedb";
import lines from "./linesAPI";
import { array_move } from "./utils/array_move";
const generateUUID = () => {
    let
        d = new Date().getTime(),
        d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
};

class sidebarAPI {
    constructor() {
        this.db = prismarineDb.table("sidebar")
    }
    getSidebarNamefromPlayer(player) {
        if (!(player instanceof Player)) {
            throw new Error("Invalid parameter: player must be an instance of Player.");
        }    
        /**
         * @param {player} Player
         */
        const tags = player.getTags();
        for (const tag of tags) {
            if (tag.startsWith('sidebar:')) {
                return tag.substring(8);
            }
        }
        return null;
    }
    getSidebars() {
        return this.db.findDocuments()
    }
    parseSidebar(player) {
        let sdName = this.getSidebarNamefromPlayer(player)
        if(!sdName) sdName = "Default"
        let sd = this.getSidebarbyName(sdName)
        if(!sd) return undefined;
        let lines = [];
        for (const line of sd.data.lines) {
            let value = this.extractBracketValue(line.text)
            if(value) {
                const objective = world.scoreboard.getObjective(value)
                let newLine = line.text.replace(/{{(.*?)}}/, objective.getScore(player))
                lines.push(newLine)
            } else {
                lines.push(line.text)
            }
        }
        return lines.join("§r\n")
    }
    extractBracketValue(line) {
        if (typeof line === 'string') {
            const match = line.match(/{{(.*?)}}/);
            return match ? match[1] : null;
        }
        return null;
    }
    
    getSidebar(id) {
        return this.db.getByID(id)
    }
    getSidebarbyName(name) {
        let doc = this.db.findFirst({ name })
        return doc;
    }
    addSidebar(name) {
        let doc = this.db.findFirst({ name })
        if (doc) throw new Error("You can't add a sidebar with the same name as another sidebar");
        this.db.insertDocument({
            name,
            lines: []
        })
    }
    deleteSidebar(name) {
        let doc = this.db.findFirst({ name })
        if (!doc) throw new Error("No sidebar found");
        this.db.deleteDocumentByID(doc.id)
    }
    reload() {
        this.db = prismarineDb.table("sidebar")
    }
}

var sidebar = new sidebarAPI();

export { sidebar }