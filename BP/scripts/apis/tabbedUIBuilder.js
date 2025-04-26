import tabManager from './tabbedUI'
import uiBuilder from './UIBuilderV2'
import { prismarineDb } from '../lib/prismarinedb'
import { array_move } from './utils/array_move'
import { system } from '@minecraft/server'

class tabbedUIBuilder {
    constructor() {
        system.run(() => {
            this.db = prismarineDb.table('TabbedUIs')
            for(const doc of this.db.findDocuments()) {
                tabManager.create(`${doc.data.id}`)
            }
        })
    }
    create(id) {
        if(this.db.findFirst({id})) return false;
        this.db.insertDocument({
            id,
            tabs: []
        })
        tabManager.create(id)
        return true;
    }
    addTab(tabUIID, uiID, title) {
        let tabUI = this.db.getByID(tabUIID)
        if(!tabUI) return false;
        let ui = uiBuilder.getUIbyID(uiID)
        if(!ui) return false;
        let tab = tabUI.data.tabs.find(_ => _.ui === ui.id)
        if(tab) return false;
        tabUI.data.tabs.push({
            ui: ui.id,
            title
        })
        this.db.overwriteDataByID(tabUI.id, tabUI.data)
        return true;
    }
    delTab(tabUIID, uiID) {
        let tabUI = this.db.getByID(tabUIID)
        if(!tabUI) return false;
        let ui = uiBuilder.db.getByID(uiID)
        if(!ui) return false;
        let tab = tabUI.data.tabs.findIndex(_ => _.ui === ui.id)
        if(!tab) return false
        tabUI.data.tabs.splice(tab, 1)
        this.db.overwriteDataByID(tabUI.id, tabUI.data)
        return true;
    }
    moveRight(tabUIID, uiID) {
        let tabUI = this.db.getByID(tabUIID)
        if(!tabUI) return false;
        let ui = uiBuilder.db.getByID(uiID)
        if(!ui) return false;
        let tab = tabUI.data.tabs.findIndex(_ => _.ui === uiID)
        if(!tab) return false
        if(tab >= tabUI.data.tabs.length) return false;
        array_move(tabUI.data.tabs, tab, tab + 1)
        this.db.overwriteDataByID(tabUI.id, tabUI.data)
        return true;
    }
    moveleft(tabUIID, uiID) {
        let tabUI = this.db.getByID(tabUIID)
        if(!tabUI) return false;
        let ui = uiBuilder.db.getByID(uiID)
        if(!ui) return false;
        let tab = tabUI.data.tabs.findIndex(_ => _.ui === uiID)
        if(!tab) return false;
        if(tab <= 0) return false;
        array_move(tabUI.data.tabs, tab, tab - 1)
        this.db.overwriteDataByID(tabUI.id, tabUI.data)
        return true;
    }
}

export default new tabbedUIBuilder;