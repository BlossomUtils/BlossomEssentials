import { prismarineDb } from "../lib/prismarinedb";

class sellAPI {
    constructor() {
        this.categoryDb = prismarineDb.table("sellCategoryDB")
        this.itemDb = prismarineDb.table("sellItemDb")
    }
    getCategorybyName(name) {
        return this.categoryDb.findFirst({name})
    }
    getCategory(id) {
        return this.categoryDb.getByID(id)
    }
    addCategory(name, requiredTag) {
        let cat = this.getCategorybyName(name)
        if(cat) return false;
        this.categoryDb.insertDocument({
            name,
            requiredTag
        })
        return true;
    }
    removeCategory(id) {
        let cat = this.getCategory(id)
        if(!cat) return false;
        this.categoryDb.deleteDocumentByID(id)
        return true;
    }
    editCategory(id, name, requiredTag) {
        let cat = this.getCategory(id)
        if(!cat) return false;
        cat.data.name = name
        cat.data.requiredTag = requiredTag
        this.categoryDb.overwriteDataByID(cat.id, cat.data)
        return true;
    }
    getItem(id) {
        return this.itemDb.getByID(id)
    }
    getItembyDisplay(display) {
        return this.itemDb.findFirst({display})
    }
    getItembyTypeID(typeId) {
        return this.itemDb.findFirst({typeId})
    }
    addItem(display, price, typeId, category) {
        let itdi = this.getItembyDisplay(display)
        if(itdi) return false;
        let itti = this.getItembyTypeID(typeId)
        if(itti) return false;

        this.itemDb.insertDocument({
            display,
            price,
            typeId,
            category
        })
        return true;
    }
    editItem(typeId, price, display) {
        let itti = this.getItembyTypeID(typeId)
        if(!itti) return false;
        itti.data.price = price
        itti.data.display = display
        this.itemDb.overwriteDataByID(itti.id, itti.data)
        return true;
    }
    removeItem(id) {
        let item = this.getItem(id)
        if(!item) return false;
        this.itemDb.deleteDocumentByID(item.id)
        return true;
    }
}

export default new sellAPI();