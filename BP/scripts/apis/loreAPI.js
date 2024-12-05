import { world } from '@minecraft/server'

class loreAPI {
    constructor() { }
    addLore(player, lore) {
        let inventoryComponent = player.getComponent("inventory");

        let container = inventoryComponent.container;
        let item = container.getItem(player.selectedSlotIndex);

        if (!item) return player.error("You need to hold an item!")

        let currentLore = item.getLore();
        currentLore.push(`${lore}`)
        item.setLore(currentLore)
        container.setItem(player.selectedSlotIndex, item);
        player.success("Added lore")
    }
    removeLore(player, message) {
        const inventory = player.getComponent("inventory").container;
        const item = inventory.getItem(player.selectedSlotIndex);

        if (!item) return player.error("You need to hold an item!")

        item.setLore();
        inventory.setItem(player.selectedSlotIndex, item)
    }
}

export default new loreAPI();