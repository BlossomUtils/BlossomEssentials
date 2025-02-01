import { prismarineDb } from "../lib/prismarinedb";
import * as blossom from '../functions'
import { Container, EntityInventoryComponent, ItemComponent, ItemStack } from "@minecraft/server";

class Sell {
    constructor() {
        this.db = prismarineDb.table('+BLSM:sell')
    }
    addCategory(name,currency,description,requiredTag=null) {
        if(this.db.findFirst({name,type:'Category'})) return false;
        let cat = this.db.insertDocument({
            name,
            currency,
            description,
            requiredTag,
            icon: null,
            items: [],
            type: 'Category'
        })
        return cat;
    }
    remove(id) {
        let doc = this.get(id)
        if(doc.data.type == 'Item') {
            for(const doc1 of this.db.findDocuments({type:'Category'})) {
                if(!doc1.data.items.find(_=>_==doc.id)) continue;
                doc1.data.items.splice(doc1.data.items.findIndex(_=>_==doc.id), 1)
                this.db.overwriteDataByID(doc1.id, doc1.data)
            }
        }
        return this.db.deleteDocumentByID(id);
    }
    addItem(typeID,display,catID,price) {
        let cat = this.db.getByID(catID)    
        if(!cat) return false;
        if(cat.data.type != 'Category') return false;
        let item = this.db.insertDocument({
            typeID,
            display,
            price,
            type: 'Item',
            icon: null
        })
        cat.data.items.push(item)
        this.db.overwriteDataByID(cat.id, cat.data)
        return item;
    }
    get(id) {
        return this.db.getByID(id)
    }
    editItem(id,display,price,icon=null) {
        let item = this.db.getByID(id)
        if(!item) return false;
        item.data.display = display
        item.data.price = price
        if(icon) item.data.icon = icon;
        this.db.overwriteDataByID(id, item.data)
        return true;
    }
    editCategory(id,name,currency,description,requiredTag,icon) {
        let cat = this.get(id)
        if(!cat) return false;
        cat.data.name = name
        cat.data.currency = currency
        cat.data.description = description
        if(requiredTag) cat.data.requiredTag = requiredTag
        if(icon) cat.data.icon = icon
        this.db.overwriteDataByID(id, cat.data)
        return true;
    }
    hasItem(player, typeId) {
        let amount = 0
        let inventory = player.getComponent('inventory')
        for(let i = 0;i < inventory.inventorySize;i++) {
          let item1 = inventory.container.getItem(i)
          if(item1 && item1.typeId == typeId) {
            amount = amount + item1.amount
            console.log(item1.typeId)
            continue;
          }
        }
        return amount;
      }
    sell(player, id, catID, quantity) {
        let item = this.get(id)
        let cat = this.get(catID)
        let inventory = player.getComponent('inventory')
        let container = inventory.container
        let items = [];
        if(this.hasItem(player, item.data.typeID) < quantity) return false;
        player.runCommandAsync(`clear @s ${item.data.typeID} 0 ${quantity}`)
        let p = item.data.price * quantity;
        prismarineDb.economy.addMoney(player, p, cat.data.currency)
        return true;
    }
}

export default new Sell();