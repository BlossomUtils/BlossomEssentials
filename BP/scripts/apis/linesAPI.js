import { system } from "@minecraft/server";
import { prismarineDb } from "../lib/prismarinedb";
import { sidebar } from "./sidebarAPI";
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

/*
    /\___/\
   (  o o  )
   (  =^=  ) 
    (  T  )  ︻デ═一
     |___|
    
    dont break this!
    - fruitkitty
*/

class sidebarLines {
    constructor() {
        system.run(() => {
            this.db = prismarineDb.table("sidebar")
        })
    }
    getLine(id, sidebarID) {
        let sd = sidebar.getSidebar(sidebarID)
        return sd.data.lines.find(_ => _.id == id);
    }
    reload() {
        this.db = prismarineDb.table('sidebar')
    }
    addLine(text, sidebarID) {
        let sd = sidebar.getSidebar(sidebarID)
        if (!sd) return false;
        let id = generateUUID()
        sd.data.lines.push({
            text,
            id,
            updatedAt: Date.now()
        })
        sidebar.db.overwriteDataByID(sd.id, sd.data)
        return id
    }
    editLine(id, text, sidebarID) {
        let sd = sidebar.getSidebar(sidebarID)
        let index = sd.data.lines.findIndex(_ => _.id == id);
        if (!sd) return false;
        sd.data.lines[index] = {
            text,
            id,
            updatedAt: Date.now()
        }
        sidebar.db.overwriteDataByID(sd.id, sd.data)
    }
    removeLine(id, sdid) {
        let doc = sidebar.getSidebar(sdid)
        if (!doc) return;
        doc.data.lines = doc.data.lines.filter(_ => _.id != id);
        sidebar.db.overwriteDataByID(sdid, doc.data)
    }
    getLines(sidebarID) {
        let doc = sidebar.getSidebar(sidebarID)
        if (!doc) return;
        return doc.data.lines
    }
    moveLineDown(name, id) {
        let doc = sidebar.db.findFirst({
            name
        })
        if (!doc) return;
        let index = doc.data.lines.findIndex(_ => _.id == id);
        if (index + 1 >= doc.data.lines.length) return;
        array_move(doc.data.lines, index, index + 1);
        sidebar.db.overwriteDataByID(doc.id, doc.data);
    }
    moveLineUp(name, id) {
        let doc = sidebar.db.findFirst({
            name: name
        })
        if (!doc) return;
        let index = doc.data.lines.findIndex(_ => _.id == id);
        if (index < 1) return;

        array_move(doc.data.lines, index, index - 1);

        sidebar.db.overwriteDataByID(doc.id, doc.data);
    }
}

var lines = new sidebarLines();

export default lines;