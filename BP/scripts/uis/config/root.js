import uiManager from "../../uiManager";
import { ActionForm } from "../../lib/prismarinedb";
import config from "../../apis/config";
import * as mc from "@minecraft/server"
import './credits'
import './main'
import './moderation'
import './modules'
import './xray'
import './announcements/index'
import './prefix'
import './extra'
import './combatLog'

mc.world.afterEvents.itemUse.subscribe((e) => {
    if (e.itemStack.typeId === config.details.configItem) {
        if(!e.source.hasTag('admin')) return e.source.error("You can't use this item!")
        uiManager.open(e.source, config.uiNames.Config.Root)
    }
})

uiManager.addUI(config.uiNames.Config.Root, "Admin Main", (player)=>{
    let form = new ActionForm();
    form.title("§t§e§s§t§r§dConfig UI")
    form.button(`§dWelcome!\n§7${config.info.name} v${config.info.version}`, "textures/blocks/cherry_leaves", (player)=>{
        let f = new ActionForm();
        f.title('§f§u§l§l§s§c§r§e§e§n§rHelp')
        f.body(`
§dWelcome to ${config.info.name} v${config.info.version}
-_-_-_-_-_-_-_-_-
§e
How To Use Combat Log 
Feature: Config Ui > Extra Settings > Combat Log 

Combat Log Timer: Displays Time Left In Combat.

Combat Log Message: The Message Displayed When Entering Combat.

Kill On Leave: Kills Player Upon Exit During Combat.

-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

How To Use Custom Commands!

Config Ui > Custom Commands >

Remove: Remove A Selected Custom Command.

Create: Create a Custom Command. (Example: /tp @s 0 0 0)

Edit: Edit Any Custom Commands That Have Been Created.

-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

How To Use Moderation Options:

Config Ui > Moderation > 

Players: View All Players On The Server.

Reports: View Reports Made From Players.

Bans: View / Create / Remove Bans

Warnings: View Warning / Add / Remove Warnings.

-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

How To Use Announcements System: 

Config Ui > Announcements 

Send: Enter Your Chosen a Announcement.

Configure: Choose What Type Of Display You Want Your Announcement To have.

-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
For More Info On My Add-on Please Join The Discord Down Below Also Attached To My Other Web Links!

Discord: https://discord.gg/VjMjQRdm

Github Link: github.com/blossomutils

Docs Link: blossom.amethystdev.com

MCPEDL Link: mcpedl.com/blossom

Mcbetools Link: mcbetools.com/s/blossom`)
f.button('OK')
f.show(player)
    })
    form.button(`§dMain Settings\n§7Configuration`, "textures/items/settings.png", (player)=>{
        uiManager.open(player, config.uiNames.Config.Main)
    })
    form.button(`§dAnnouncements\n§7Send an announcement`, "textures/azalea_icons/Chat.png", (player)=>{
        uiManager.open(player, config.uiNames.Config.Announcements.Root)
    })
    form.button(`§dExtra Settings\n§7More configuration`, "textures/azalea_icons/10.png", (player)=>{
        uiManager.open(player, config.uiNames.Config.Extra)
    })
    form.button(`§dModules\n§7Edit modules`, "textures/azalea_icons/ClickyClick.png", (player)=>{
        uiManager.open(player, config.uiNames.Config.Modules)
    })
    form.button(`§dModeration\n§7Bans, reports, etc`, "textures/azalea_icons/5.png", (player)=>{
        uiManager.open(player, config.uiNames.Config.Moderation)
    })
    form.button(`§dCredits\n§r§7View credits`, "textures/blossom_icons/credits.png", (player)=>{
        uiManager.open(player, config.uiNames.Config.Credits)
    })
    form.show(player)
})