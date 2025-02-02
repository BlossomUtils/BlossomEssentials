import { world, system, EquipmentSlot } from '@minecraft/server';
import modules from './apis/modules';

if (!modules.get('combatTime')) modules.set('combatTime', 5);
if (modules.get('combatLog') === undefined) modules.set('combatLog', true);
if (modules.get('keepInventory') === undefined) modules.set('keepInventory', false);
if (modules.get('combatKillLeave') === undefined) modules.set('combatKillLeave', true);
if (!modules.get('combatMessage')) modules.set('combatMessage', 'You are in combat! Ending in {t}')

let jobs = []
let deadCache = []
let cancelledJobs = []

for (const player of world.getPlayers()) {
    player.removeTag('blossom:combat')
}

world.afterEvents.entityHitEntity.subscribe(async e => {
    if (!modules.get('combatLog')) return;

    let de = e.damagingEntity;
    let he = e.hitEntity;

    if (de.typeId === 'minecraft:player' && he.typeId === 'minecraft:player') {

        for (const j of jobs) {
            if (`${j.he}` === `${he.id}` || `${j.de}` === `${de.name}` || `${de.name}` === `${j.heName}` ||
                `${j.de}` === `${he.id}` || `${he.name}` === `${j.heName}` || `${j.he}` === `${de.name}`) {
                cancelledJobs.push(j.id);
            }
        }
        de.addTag('blossom:combat')
        he.addTag('blossom:combat')

        let job = system.run(async () => {
            jobs.push({id:job,he:he.id,de:de.name,heName:he.name})
            let cancelled = false;
            for (let i = modules.get('combatTime'); i >= 0; i--) {
                for(const j of cancelledJobs) {
                    if(j === job) {
                        cancelled = true
                    }
                }
                if(cancelled == true) break;
                he.onScreenDisplay.setActionBar(`${modules.get('combatMessage').replaceAll('{t}', i)}`);
                de.onScreenDisplay.setActionBar(`${modules.get('combatMessage').replaceAll('{t}', i)}`);
                await system.waitTicks(20);
            }
    
            cancelledJobs = cancelledJobs.filter(j => j.id !== job);
            jobs = jobs.filter(j => j.id !== job);
            if(!cancelled) {
            de.removeTag('blossom:combat')
            he.removeTag('blossom:combat')
            }
        });
        



    }
});


world.beforeEvents.playerLeave.subscribe(e => {
    if (!modules.get('combatKillLeave')) return;
    if (!modules.get('combatLog')) return;
    const player = e.player
    if (!player.hasTag('blossom:combat')) return;
    const id = player.id
    const inventory = player.getComponent(`inventory`).container;
    const equippable = player.getComponent(`equippable`);
    const dimension = player.dimension.id;
    const location = player.location;
    const playerLevel = player.level;
    const playerData = [];
    const equipmentSlots = [
        EquipmentSlot.Head,
        EquipmentSlot.Chest,
        EquipmentSlot.Legs,
        EquipmentSlot.Feet,
        EquipmentSlot.Offhand
    ];
    deadCache.push(id)
    for (const j of jobs) {
        if (j.he == id) {
            let de = world.getPlayers().find(_ => _.name == j.de)
            if (!de) continue;
            de.removeTag('blossom:combat')
        }
    }
    if(modules.get('keepInventory')) return;
    for (let i = 0; i < inventory.size; i++) {
        const item = inventory.getItem(i);
        if (item)
            playerData.push(item);
    }
    for (const slot of equipmentSlots) {
        const item = equippable.getEquipment(slot);
        if (item)
            playerData.push(item);
    }
    system.run(() => {
        if (!playerData)
            return;
        for (const item of playerData) {
            world.getDimension(dimension).spawnItem(item, location);
        }
        if (playerLevel > 0) {
            for (let i = 0; i < 7 * playerLevel && i < 100; i++) {
                world.getDimension(dimension).spawnEntity("minecraft:xp_orb", location);
            }
        }
    })
})

world.afterEvents.playerSpawn.subscribe(e => {
    let player = e.player
    if(!e.initialSpawn) return;
    if (player.hasTag('blossom:combat')) {
        if(!modules.get('keepInventory')) player.runCommand('clear @s')
        player.kill()
        deadCache.splice(deadCache.findIndex(_ => _ == player.id), 1)
    }
})
