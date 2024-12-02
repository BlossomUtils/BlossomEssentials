import commandManager from "../lib/commands/commandManager";
import bindAPI from "../apis/bindAPI";
import moment from '../lib/moment'
import * as mc from '@minecraft/server'
import moduleAPI from "../apis/modules";

mc.world.afterEvents.itemUse.subscribe((e) => {
    if (moduleAPI.binding === false) return;
    for (const bind of bindAPI.getBinds()) {
        if (e.itemStack.typeId === bind.data.typeId) {
            bindAPI.runBind(e.source, e.itemStack.typeId)
        }
    }
})

commandManager.addCommand("bind", { description: "Bind a command to an item", category: "Setup" }, ({ msg, args }) => {
    if(!msg.sender.hasTag('admin')) return msg.sender.error("You must have admin!")
        if (moduleAPI.binding === false) {
            if(args[0]) {
            return msg.sender.error("Binding is disabled")
            }
        }
    let inventoryComponent = msg.sender.getComponent("inventory");


    let container = inventoryComponent.container;
    let item = container.getItem(msg.sender.selectedSlotIndex);
    if (args[0]) {
        bindAPI.createBind(item.typeId, args.join(" "), msg.sender)
    } else {
        let binds = ["§d>> Binds <<"]
        let allBinds = bindAPI.getBinds()
        for (const bind of allBinds) {
            binds.push(`§d${bind.data.typeId} - Created ${moment(bind.createdAt).fromNow()} - ${bind.data.command}`)
        }
        for (const bind of binds) {
            msg.sender.sendMessage(`${bind}`)
        }
    }

})
commandManager.addSubcommand("bind", "remove", { description: "Remove binds" }, ({ msg, args }) => {
    if(!msg.sender.hasTag('admin')) return msg.sender.error("You must have admin!");
    if (moduleAPI.binding === false) return msg.sender.error("Binding is disabled");
    let inventoryComponent = msg.sender.getComponent("inventory");


    let container = inventoryComponent.container;
    if (!container.getItem(msg.sender.selectedSlotIndex)) return msg.sender.error("You must be holding an item!")
    let item = container.getItem(msg.sender.selectedSlotIndex);
    bindAPI.deleteBind(msg.sender, item.typeId)
})