import { system } from "@minecraft/server";
import { prismarineDb } from "../lib/prismarinedb";

class Shop {
    constructor() {
        system.run(() => {
            this.db = prismarineDb.table('+BLSM:shop')
        })
    }
    addCategory(name, currency, description, icon) {
        if(this.db.findFirst({name, type:'Category'})) return false;
        let category = this.db.insertDocument({
            type: 'Category',
            name,
            currency,
            icon: icon ? icon : null,
            description: description ? description : null,
            items: []
        })
        return category;
    }
    removeCategory(id) {
        let cat = this.db.getByID(id)
        if(cat.data.type != 'Category') return false;
        if(!cat) return false;
        this.db.deleteDocumentByID(id)
        return true;
    }
    addItem(display, typeId, catID, price) {
        let cat = this.db.getByID(catID)
        if(cat.data.type != 'Category') return false;
        if(!cat) return false;
        let item = this.db.insertDocument({
            type: 'Item',
            display,
            icon: null,
            typeId,
            price
        })
        cat.data.items.push(item)
        this.db.overwriteDataByID(catID, cat.data)
        return item;
    }
    editItem(id,display,price,icon=null) {
        let item = this.get(id)
        if(!item) return false;
        item.data.display = display
        item.data.price = price
        if(icon) item.data.icon = icon
        this.db.overwriteDataByID(id,item.data)
        return true;
    }
    editRequiredTag(id,val) {
        let cat = this.get(id)
        cat.data.requiredTag = val
        this.db.overwriteDataByID(id, cat.data)
    }
    editCategory(id,name,description,currency,icon=null) {
        let cat = this.get(id)
        if(!cat) return false;
        cat.data.name = name
        cat.data.description = description
        cat.data.currency = currency
        if(icon) cat.data.icon = icon
        this.db.overwriteDataByID(id,cat.data)
        return true;
    }
    removeItem(id, catID) {
        let cat = this.db.getByID(catID)
        let item = this.db.getByID(id)
        if(item.data.type != 'Item') return false;
        if(cat.data.type != 'Category') return false;
        let index = cat.data.items.findIndex(_ => _ === item.id)
        if(index = -1) return false;
        cat.data.items.splice(index, 1)
        this.db.overwriteDataByID(catID, cat.data)
        return true;
    }
    get(id) {
        return this.db.getByID(id)
    }
    buy(player, id, scoreboard, quantity) {
        let item = this.db.getByID(id)
        if(!item) return false;
        if(item.data.type != 'Item') return false;
        let currency = prismarineDb.economy.getCurrency(scoreboard)
        if(!currency) return false;
        let price = item.data.price * quantity;
        let money = prismarineDb.economy.getMoney(player, currency.scoreboard)
        if(money < price) return false;
        player.runCommand(`give @s ${item.data.typeId} ${quantity}`);
        prismarineDb.economy.removeMoney(player, price, currency.scoreboard)
        return true;
    }
}

export default new Shop();