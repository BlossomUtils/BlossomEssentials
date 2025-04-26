import { system, world } from "@minecraft/server";
import { prismarineDb } from "../lib/prismarinedb";
import { array_move } from "./utils/array_move";
import config from "./config";
import V2Opener from "./openers/V2Opener";
/*
    /\___/\
   (  o o  )
   (  =^=  ) 
    (  T  )  ︻デ═一
     |___|
    
    dont break this!
    - fruitkitty
*/
class UIBuilderV2 {
    constructor() {
        system.run(() => {
            this.db = prismarineDb.table("UIBuilderV2")
            this.migrateOldActions();
            system.afterEvents.scriptEventReceive.subscribe((e)=>{
                if(e.id === config.details.openV2CustomUI) {
                    let ui = this.db.findFirst({scriptevent: e.message});
                    if(ui) {
                        V2Opener.open(ui.data, e.sourceEntity)
                        e.sourceEntity.runCommand(`scriptevent blossom:CustomuiOpened ${e.sourceEntity.name} opened the UI "${e.message}"`)
                    }
                }
            })
        })
    }
    migrateOldActions() {
        let uis = this.getUIs();
        for (const ui of uis) {
            for(const button of ui.data.buttons) {
                if(!button.actions) button.actions = [button.action]
            }
            this.db.overwriteDataByID(ui.id, ui.data)
        }
    }
    getUIbyID(id) {
        return this.db.getByID(id)
    }
    reload() {
        this.db = prismarineDb.table("UIBuilderV2")
    }
    getUIs() {
        return this.db.findDocuments()
    }
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
            const random = Math.random() * 16 | 0;
            const value = char === 'x' ? random : (random & 0x3 | 0x8);
            return value.toString(16);
        });
    }
    
    addUI(scriptevent, name, layout, body) {
        return this.db.insertDocument({
            name,
            body,
            layout,
            buttons: [],
            scriptevent
        })
    }
    addButtontoUI(uiId, text, subtext, icon, requiredTag) {
        let ui = this.getUIbyID(uiId)
        let id = this.generateUUID();
        ui.data.buttons.push({ text, subtext, icon, id, requiredTag, actions: [] })
        this.db.overwriteDataByID(ui.id, ui.data)
    }
    addActionToButton(buttonID, uiID, action) {
        let ui = this.db.getByID(uiID);
        let button = ui.data.buttons.find(button => button.id === buttonID);
        button.actions.push(action)
        this.db.overwriteDataByID(uiID, ui.data);
    }
    removeActionFromButton(bid, uiid, index) {
        let ui = this.getUIbyID(uiid);
        ui.data.buttons.find(b => b.id === bid).actions.splice(index, 1)
        this.db.overwriteDataByID(uiid, ui.data)
    }
    moveActionUp(bid, uiid, index) {
        let ui = this.getUIbyID(uiid);
        let button = ui.data.buttons.find(b => b.id === bid);
        if(index >= button.actions.length) return;
        button.actions = array_move(button.actions, index, index + 1)
        this.db.overwriteDataByID(uiid, ui.data)
    }
    moveActionDown(bid, uiid, index) {
        let ui = this.getUIbyID(uiid);
        let button = ui.data.buttons.find(b => b.id === bid);
        if(index <= 0) return;
        button.actions = array_move(button.actions, index, index - 1)
        this.db.overwriteDataByID(uiid, ui.data)
    }
    editButton(buttonID, uiID, text, subtext, icon, requiredTag) {
        let ui = this.getUIbyID(uiID)
        let button = ui.data.buttons.find(button => button.id === buttonID);
        button.text = text
        button.subtext = subtext
        button.icon = icon
        button.requiredTag = requiredTag
        this.db.overwriteDataByID(uiID, ui.data)
    }
    removeButton(buttonID, uiID) {
        let ui = this.getUIbyID(uiID)
        const buttonIndex = ui.data.buttons.findIndex(button => button.id === buttonID);

        ui.data.buttons.splice(buttonIndex, 1);
        this.db.overwriteDataByID(uiID, ui.data)
    }
    editUI(id, scriptevent, name, layout, body) {
        let ui = this.getUIbyID(id)
        ui.data.scriptevent = scriptevent
        ui.data.name = name
        ui.data.layout = layout
        ui.data.body = body
        this.db.overwriteDataByID(id, ui.data)
    }
    removeUI(id) {
        let ui = this.getUIbyID(id)
        if(!ui) return false;
        this.db.deleteDocumentByID(ui.id)
    }
    moveButtonInUI(id, type = "up", buttonID) {
        let doc = this.getUIbyID(id);
        const index = doc.data.buttons.findIndex(button => button.id === buttonID);
        if(!doc) return;
        if(index >= doc.data.buttons.length) return;
        if(index < 0) return;
        if(type == "up" && index - 1 < 0) return;
        if(type == "down" && index + 1 >= doc.data.buttons.length) return;
        doc.data.buttons = array_move(doc.data.buttons, index, type == "up" ? index - 1 : index + 1);
        this.db.overwriteDataByID(doc.id, doc.data);
    }
}

export default new UIBuilderV2();