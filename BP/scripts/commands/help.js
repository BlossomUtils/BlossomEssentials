import commandManager from "../lib/commands/commandManager";
import { prismarineDb } from "../lib/prismarinedb";
import config from "../apis/config";



commandManager.addCommand("help", {description: `Get help with ${config.info.name}`, category: "Help", format: `-help`}, ({msg,args})=>{
    let commands = commandManager.cmds.findDocuments(null);
    let commandData = {};
    for(const command of commands) {
        let category = command.data.category ? command.data.category : "Development";
        if(commandData[category]) commandData[category].push(command.data)
        else commandData[category] = [command.data];
    }
    let text = [];
    for(const category of Object.keys(commandData)) {
        text.push(`§8----------- §a${category} §r§8-----------`)
        for(const command of commandData[category]) {
            text.push(`§e${command.format ? `${command.format}` : `${commandManager.prefix}${command.name}`} §r§7${command.description ? command.description : "No Description"} §8(By ${command.author ? command.author : "FruitKitty"})`)
            let subcommands = commandManager.getSubCommandsFromCommand(command.name);
            if(subcommands.length) {
                for(const subcommand of subcommands) {
                    text.push(`§f- §b${subcommand.format ? `${subcommand.format}` : `${commandManager.prefix}${command.name} ${subcommand.name}`} §r§7${subcommand.description ? subcommand.description : "No Description"}`)
                }
            }
        }
    }
    msg.sender.sendMessage(text.join('\n§r'))
})

commandManager.addSubcommand("help", "setup", {description: `Get help setting up ${config.info.name}`}, ({msg})=>{
    msg.sender.sendMessage(`§dView our Documentation at ${config.info.documentation}`)
})
commandManager.addSubcommand("help", "version", {description: `Version of ${config.info.name}`}, ({msg})=>{
    msg.sender.sendMessage(`§d${config.info.name} - v${config.info.version}`);
    msg.sender.sendMessage(`§dPrismarineDB Version - v${prismarineDb.version.toFixed(1)}`);
})
// commandManager.addSubcommand("help", "bcd", {description: "For recreation purposes"}, ({msg, args})=>{
//     msg.sender.sendMessage(`Player Detection
// §a Tags§f: §e '§6isFalling§e' - If Player is Falling
// §a Tags§f: §e '§6isClimbing§e' - If Player is Climbing
// §a Tags§f: §e '§6isFlying§e' - If Player is Flying
// §a Tags§f: §e '§6isGliding§e' - If Player is Gliding(with elytra)
// §a Tags§f: §e '§6isInWater§e' - If Player is in Water
// §a Tags§f: §e '§6isJumping§e' - If Player is Jumping
// §a Tags§f: §e '§6isOnGround§e' - If Player is on the ground
// §a Tags§f: §e '§6isSneaking§e' - If Player is Sneaking
// §a Tags§f: §e '§6isSprinting§e' - If Player is Sprinting
// §a Tags§f: §e '§6isSwimming§e' - If Player is Swimming
// §a Tags§f: §e '§6isSleeping§e' - If Player is Sleeping
// §a Tags§f: §e '§6isEmoting§e' - If Player is Emoting
// §a Tags§f: §e '§6playerInitialSpawn§e' - After Loaded Into The Game
// §a Tags§f: §e '§6playerSpawn§e' - Before Loaded Into The Game
// §a Tags§f: §e '§6showtags§e' - Summons a entity containing the player tags 
//                                 (the entity has the tag sts, execute as it to get the tags)
// §2 Objectives§f: §e'health§e' - Displays Player Health
// §2 Objectives§f: §e'x§e' - Displays X Coordinate
// §2 Objectives§f: §e'y§e' - Displays Y Coordinate
// §2 Objectives§f: §e'z§e' - Displays Z Coordinate
// §2 Objectives§f: §e'selectedSlot§e' - Displays Selected Slot
// §2 Objectives§f: §e'level§e' - Displays Selected Slot
// §2 Objectives§f: §e'xpEarnedCurrentLevel§e' - Displays XP Earned
// §2 Objectives§f: §e'totalXpNeededToNextLevel§e' - Displays Total XP Needed for Next Level
// §2 Objectives§f: §e'xpNeededToNextLevel§e' - Displays Total XP Needed 
// §d Objectives§f: §e'kills§e' - Displays Total kills (Player Kills)
// §d Objectives§f: §e'deaths§e' - Displays Total deaths

// §7Permissions Modifier
// §a Tags§f: §e '§6disable:chat§e' - Disables Player from Chatting
// §a Tags§f: §e '§6disable:break§e' - Disables Player from Breaking
// §a Tags§f: §e '§6disable:place§e' - Disables Player from Placing
// §a Tags§f: §e '§6disable:blockinteract§e' - Disables Player from Interacting Blocks
// §a Tags§f: §e '§6disable:entityinteract§e' Disables Player from Interacting Entitys
// §a Tags§f: §e '§6disable:blockinteract:{blockid}§e' - Disables Player from Interacting the provided block
// §a Tags§f: §e '§6disable:entityinteract:{entityid}§e' Disables Player from Interacting the provided entity
// §d Tags§f: §e '§6disable:blockbreak:{blockid}§e' Disables Player from breaking the provided block
// §d Tags§f: §e '§6disable:blockplace:{blockid}§e' Disables Player from placing the provided block
// §a Tags§f: §e '§6disable:greif' Disables Player from interacting with Signs, Frames, Logs, Armor_stands,
//                 §6Repeaters, Comparactors, Trapdoors (Notice, Interacting with frames arent working yet)

// §7Slot Detection
// §a Tags§f: §e '§6slot.mainhand:{itemid}§e' ex 'slot.mainhand:air'
// §d Tags§f: §e '§6slot.mainhand:{itemid}.{displayitemname}§e' ex 'slot.mainhand:dirt.§r§6Dirtty§e'
// §d Tags§f: §e '§6slot.mainhand:{displayitemname}§e' ex 'slot.mainhand:§r§9fun§e'
// §a Tags§f: §e '§6slot.offhand:{itemid}§e' ex 'slot.offhand:shield'
// §d Tags§f: §e '§6slot.offhand:{itemid}.{displayitemname}§e' ex 'slot.offhand:dirt.§r§6Dirtty§e'
// §d Tags§f: §e '§6slot.offhand:{displayitemname}§e' ex 'slot.offhand:§r§9fun§e'
// §a Tags§f: §e '§6slot.head:{itemid}§e' ex 'slot.head:diamond_helmet'
// §d Tags§f: §e '§6slot.head:{itemid}.{displayitemname}§e' ex 'slot.head:dirt.§r§6Dirtty§e'
// §d Tags§f: §e '§6slot.head:{displayitemname}§e' ex 'slot.head:§r§9fun§e'
// §a Tags§f: §e '§6slot.chest:{itemid}§e' ex 'slot.chest:diamond_chestplate'
// §d Tags§f: §e '§6slot.chest:{itemid}.{displayitemname}§e' ex 'slot.chest:dirt.§r§6Dirtty§e'
// §d Tags§f: §e '§6slot.chest:{displayitemname}§e' ex 'slot.chest:§r§9fun§e'
// §a Tags§f: §e '§6slot.leg:{itemid}§e' ex 'slot.leg:diamond_leggings'
// §d Tags§f: §e '§6slot.leg:{itemid}.{displayitemname}§e' ex 'slot.leg:dirt.§r§6Dirtty§e'
// §d Tags§f: §e '§6slot.leg:{displayitemname}§e' ex 'slot.leg:§r§9fun§e'
// §a Tags§f: §e '§6slot.feet:{itemid}§e' ex 'slot.feet:dirt'
// §d Tags§f: §e '§6slot.feet:{itemid}.{displayitemname}§e' ex 'slot.feet:dirt.§r§6Dirtty§e'
// §d Tags§f: §e '§6slot.feet:{displayitemname}§e' ex 'slot.feet:§r§9fun§e'

// §d Tags§f: §e '§6slot{slotid}:{itemid}§e' ex 'slot0:dirt'
// §d Tags§f: §e '§6slot{slotid}:{itemid}.{displayitemname}§e' ex 'slot0:dirt.§r§6Dirtty§e'
// §d Tags§f: §e '§6slot{slotid}:{displayitemname}§e' ex 'slot0:§r§6Dirtty§e'

// §7Projectile Detection
// §a Tags§f: §e '§6projectile:hit§e' - Entity damaged by projectile
// §a Tags§f: §e '§6projectile:shot§e' - Entity which shot a projectile and hit a entity

// §7Entity Detection
// §a Tags§f: §e '§6entity:dead§e' - Entity is Dead
// §a Tags§f: §e '§6entity:hurt§e' - Entity got Hurt
// §a Tags§f: §e '§6entity:murderer§e' - The Murderer of entity:dead
// §a Tags§f: §e '§6entity:hit§e' - Entity Damaged
// §a Tags§f: §e '§6entity:damage§e' - Entity Damager of entity:hit
// §a Tags§f: §e '§6interact:{entityid}§e' ex 'interact:npc'
// §a Tags§f: §e '§6entityFromViewDirection:{entityid}§e' ex 'entityFromViewDirection:player'

// §7Block Detection
// §a Tags§f: §e '§6hitBlock:{blockid}§e' ex 'hitBlock:dirt'
// §a Tags§f: §e '§6blockPlace:{blockid}§e' ex 'blockPlace:dirt'
// §a Tags§f: §e '§6blockBreak:{blockid}§e' ex 'blockBreak:dirt'
// §a Tags§f: §e '§6hitBlock:{blockid}§e' - Player Hit a block
// §a Tags§f: §e '§6blockFromViewDirection:{blockid}§e' ex 'blockFromViewDirection:dirt'
// §a Tags§f: §e '§6interact:{blockid}§e' ex 'interact:dirt'

// §7Other
// §a Tags§f: §e '§6itemuse:{itemid}§e' ex 'itemuse:dirt'
// §d Tags§f: §e '§6itemuse:{itemid}.{itemdisplayname}§e' ex 'itemuse:dirt.§r§6Dirtty situations§e'
// §d Tags§f: §e '§6itemuse:{itemdisplayname}§e' ex 'itemuse:§r§9fun§e'
// §a Tags§f: §e '§6dimension:{dimension}§e' ex 'dimension:the_end'

// §7Chatting Detection
// §a Tags§f: §e '§6chatsend:{message}§e' ex '"chatsend:!help"'
// §a Tags§f: §e '§6rank:{Ranks}§e' ex '"rank:Goofy Guild"'
// §a Tags§f: §e '§6nick:{Nickname}§e' ex '"nick:Notch"'
// §a Tags§f: §e '§6color:{NameColor}§e' ex '"color:§d"'
// §a Tags§f: §e '§6message:{MessageColor}§e' ex '"message:§r§e"'

// §d [] §fNewly Added
// §a [] §fTag related
// §2 [] §fScoreboard related (Under Objectives)`)
// })