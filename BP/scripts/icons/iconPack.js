import { vanillaPack } from "./vanilla";

let definedIcons = {
    azalea_icons: {
        namespace: "azalea",
        icons: [
            { name: "add", path: "textures/azalea_icons/1.png" },
            { name: "back", path: "textures/azalea_icons/2.png" },
            { name: "bulb", path: "textures/azalea_icons/3.png" },
            { name: "tick", path: "textures/azalea_icons/4-a.png" },
            { name: "wrench", path: "textures/azalea_icons/4.png" },
            { name: "hammer", path: "textures/azalea_icons/5.png" },
            { name: "skyblock", path: "textures/azalea_icons/6.png" },
            { name: "terminal", path: "textures/azalea_icons/7.png" },
            { name: "player", path: "textures/azalea_icons/8.png" },
            { name: "ui", path: "textures/azalea_icons/9.png" },
            { name: "favourite", path: "textures/azalea_icons/10.png" },
            { name: "tag", path: "textures/azalea_icons/11.png" },
            { name: "shop", path: "textures/azalea_icons/12.png" },
            { name: "leaderboard", path: "textures/azalea_icons/13.png" },
            { name: "additem", path: "textures/azalea_icons/AddItem.png" },
            { name: "adminplayer", path: "textures/azalea_icons/AdminPlayerIcon.png" },
            { name: "Azalea", path: "textures/azalea_icons/Azalea.png" },
            { name: "BuyItem", path: "textures/azalea_icons/BuyItem.png" },
            { name: "ChangeCategory", path: "textures/azalea_icons/ChangeCategory.png" },
            { name: "Chat", path: "textures/azalea_icons/Chat.png" },
            { name: "Chest", path: "textures/azalea_icons/Chest.png" },
            { name: "ChestLarge", path: "textures/azalea_icons/ChestLarge.png" },
            { name: "Click", path: "textures/azalea_icons/ClickyClick.png" },
            { name: "Permissions", path: "textures/azalea_icons/CommandPerms.png" },
            { name: "Confetti", path: "textures/azalea_icons/confetti.png" },
            { name: "CustomCommands", path: "textures/azalea_icons/CustomCommands.png" },
            { name: "Delete", path: "textures/azalea_icons/Delete.png" },
            { name: "DeleteShop", path: "textures/azalea_icons/DeleteShop.png" },
            { name: "Down", path: "textures/azalea_icons/Down.png" },
            { name: "FormsOld", path: "textures/azalea_icons/FormsV2.png" },
            { name: "Import", path: "textures/azalea_icons/Import.png" },
            { name: "Info", path: "textures/azalea_icons/Info.png" },
            { name: "Logs", path: "textures/azalea_icons/Logs.png" },
            { name: "LogsAdd", path: "textures/azalea_icons/LogsAdd.png" },
            { name: "NoTexture", path: "textures/azalea_icons/NoTexture.png" },
            { name: "PaintBrush", path: "textures/azalea_icons/PaintBrush.png" },
            { name: "Pencil", path: "textures/azalea_icons/Pencil.png" },
            { name: "Settings", path: "textures/azalea_icons/Settings.png" }
        ],
        previousPack: null,
        nextPack: "azalea_old"
    },
    azalea_old: {
        namespace: "azalea/old",
        icons: [
            { name: "bulb", path: "textures/azalea_icons/3-old.png" },
            { name: "socialquestion", path: "textures/azalea_icons/4-old.png" },
            { name: "report", path: "textures/azalea_icons/5-oldmaybe.png" },
            { name: "social", path: "textures/azalea_icons/8-old.png" },
            { name: "ui", path: "textures/azalea_icons/9-old.png" },
            { name: "favourite", path: "textures/azalea_icons/10-old.png" },
            { name: "shop", path: "textures/azalea_icons/12-old.png" }
        ],
        nextPack: "vanilla",
        previousPack: 'azalea_icons'
    }
}

function getPack(packName) {
    if (packName === "azalea_icons") {
        return definedIcons.azalea_icons;
    }
    if (packName === "azalea_old") {
        return definedIcons.azalea_old;
    }
    if(packName === "vanilla") {
        return vanillaPack.page1
    }
    if(packName === "vanilla2") {
        return vanillaPack.page2
    }
    if(packName === "vanilla3") {
        return vanillaPack.page3
    }
    if(packName === 'vanilla4') return vanillaPack.page4;
    if(packName === 'vanilla5') return vanillaPack.page5;
    if(packName === 'vanilla6') return vanillaPack.page6;
    if(packName === 'vanilla7') return vanillaPack.page7;
    if(packName === 'vanilla8') return vanillaPack.page8;
    if(packName === 'vanilla9') return vanillaPack.page9;
    if(packName === 'vanilla10') return vanillaPack.page10;
    if(packName === 'vanilla11') return vanillaPack.page11;
    if(packName === 'vanilla12') return vanillaPack.page12;
    if(packName === 'vanilla13') return vanillaPack.page13;
    if(packName === 'vanilla14') return vanillaPack.page14;
    if(packName === 'vanilla15') return vanillaPack.page15;
    if(packName === 'vanilla16') return vanillaPack.page16;
    return null;
}

export { definedIcons, getPack }