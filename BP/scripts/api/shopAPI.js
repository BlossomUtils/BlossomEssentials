import { prismarineDb } from "../lib/prismarinedb";
import * as mc from "@minecraft/server"
import * as simple from "../functions"
import { Scoreboard } from "@minecraft/server"
import { SegmentedStoragePrismarine } from '../prismarineDbStorages/segmented'

class shopAPI {
    constructor() {
        this.money = mc.world.getDynamicProperty("simple:money")
        this.db = prismarineDb.customStorage("simple:shop", SegmentedStoragePrismarine)
    }
    addItem(typeId, price, display, admin) {
        let itemIds = this.db.findFirst({ itemID: typeId, display })
        if (itemIds) return admin.error("There is already an item with this type id or display in the shop!")
        this.db.insertDocument({
            itemID: typeId,
            price,
            display
        })
        admin.success("Item added!")
    }
    editItem(typeId, price, display, admin) {
        let doc = this.db.findFirst({ itemID: typeId })
        if (!doc) return admin.error("There is no item in the shop with this type id!");
        doc.data.price = price;
        doc.data.display = display;
        this.db.overwriteDataByID(doc.id, doc.data)
        admin.success(`Successfully edited item ${typeId} in the shop to have properties "display": ${display}, "price": ${price}`)
    }
    removeItem(typeId, admin) {
        let doc = this.db.findFirst({ itemID: typeId })
        if (!doc) return admin.error("There is no item in the shop with this type id!");
        this.db.deleteDocumentByID(doc.id)
        admin.success(`Successfully remove item ${typeId} from the shop`)
    }
    fetchAllItems() {
        if (!this.db.findDocuments()) return false;
        console.log(this.db.findDocuments())
        return this.db.findDocuments()
    }
    fetchItem(typeId) {
        if (!this.db.findFirst({itemID: typeId})) return false;
        return this.db.findFirst({itemID: typeId})
    }
    buyItem(typeId, player, quantity) {
        try {
        console.log("test")
        let item = this.fetchItem(typeId)
    
        if (!item) throw new Error("Item not found");
        let price = item.data.price * quantity 
        if (!this.money) {
            mc.world.setDynamicProperty("simple:money", "money")
            this.money = mc.world.getDynamicProperty("simple:money")
        }
        let money = mc.world.scoreboard.getObjective(`${this.money}`)

        if(!money) {
            money = mc.world.scoreboard.addObjective(`${this.money}`, "Money");
        }
        console.log("test2")
        if (money.getScore(player) > price) {
            money.addScore(player, -price)
            simple.commandFeedback("off")
            player.runCommandAsync(`give @s ${typeId} ${quantity}`)
            simple.commandFeedback("on")
            console.log("test3")
            player.success(`Successfully bought item from shop ${item.data.display}`)
        } else {
            throw new Error("Insufficent funds")
            console.log("test4")
        }
    } catch (err) {
        player.error(err.message)
    }
}
    updateMoneyObjective() {
        this.money = mc.world.getDynamicProperty("simple:money")
    }
}

export default new shopAPI();