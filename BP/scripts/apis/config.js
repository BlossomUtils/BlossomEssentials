import * as mc from '@minecraft/server'

/**
 * Changing any of these values can break people's custom UIs, especially if you change the non-string one.
 */
// why did i need to remind myself of this lol 😭

export default {
    uiNames: {
        IconViewer: "iconviewer | IconViewer",
        Config: {
            Root: "blossom_config | Blossom/Config",
            Main: "blossom_config_main | Blossom/Config/Main",
            Credits: "blossom_config_credits | Blossom/Config/Credits",
            Modules: "blossom_config_modules | Blossom/Config/Modules",
            Extra: "blossom_config_extra | Blossom/Config/Extra",
            Moderation: 'blossom_config_moderation | Blossom/Config/Moderation',
            Announcements: {
                Root: 'blossom_config_announcements | Blossom/Config/Announcements',
                Options: 'blossom_config_announcements_options | Blossom/Config/Announcements/Options',
                Send: 'blossom_config_announcements_send | Blossom/Config/Announcements/Send'
            },
            Prefix: 'blossom_change_prefix | Blossom/ChangePrefix'
        },
        Homes: {
            Root: "homes_root | Homes/Root",
            Add: "homes_add | Homes/Add",
            View: 'homes_view | Homes/View'
        },
        Warps: {
            Root: "warps_root | Warps/Root",
            List: "warps_list | Warps/List",
            Remove: "warps_remove | Warps/Remove",
            Add: "warps_add | Warps/Add"
        },
        UIBuilder: {
            Root: "uibuilder_root | UIBuilder/Root",
            Add: "uibuilder_add | UIBuilder/Add",
            AddButton: "uibuilder_addbutton | UIBuilder/AddButton",
            Edit: "uibuilder_edit | UIBuilder/Edit",
            EditButton: "uibuilder_editbutton | UIBuilder/EditButton",
            EditButtons: "uibuilder_editbuttons | UIBuilder/EditButtons"
        },
        UIBuilderV2: {
            Root: "uibuilderv2_root | UIBuilderV2/Root",
            Add: "uibuilderv2_add | UIBuilderV2/Add",
            AddButton: "uibuilderv2_addbutton | UIBuilderV2/AddButton",
            Edit: "uibuilderv2_edit | UIBuilderV2/Edit",
            EditButton: "uibuilderv2_editbutton | UIBuilderV2/EditButton",
            EditButtons: "uibuilderv2_editbuttons | UIBuilderV2/EditButtons",
            Tabbed: {
                Add: "uibuilderv2_tabbed_add | UIBuilderV2/Tabbed/Add",
                AddTab: "uibuilderv2_tabbed_addtab | UIBuilderV2/Tabbed/AddTab",
                View: "uibuilderv2_tabbed_view | UIBuilderV2/Tabbed/View",
                ViewTab: "uibuilderv2_tabbed_viewtab | UIBuilderV2/Tabbed/ViewTab"
            }
        },
        PlayerWarps: {
            Root: "playerwarps_root | PlayerWarps/Root",
            List: "playerwarps_list | PlayerWarps/List",
            Remove: "playerwarps_remove | PlayerWarps/Remove",
            Add: "playerwarps_add | PlayerWarps/Add"
        },
        Basic: {
            Confirmation: "confirmation | Basic/Confirmation"
        },
        Shop: {
            Add: "old_shop_add | Old/Shop/Add",
            RemoveItems: "old_shop_removeitems | Old/Shop/RemoveItems",
            Items: "old_shop_items | Old/Shop/Items",
            editCurrency: "old_shop_editcurrency | Old/Shop/Edit/Currency",
            Root: "old_shop_root | Old/Shop/Root",
            Edit: "old_shop_edit | Old/Shop/Edit",
            Buy: "old_shop_buy | Old/Shop/Buy",
            EditItems: "old_shop_edit_items | Old/Shop/Edit/Items"
        },
        NewShop: {
            BuyItem: "shop_buyitem | Shop/BuyItem",
            Root: "shop_root | Shop/Root",
            ViewCategory: "shop_viewcategory | Shop/ViewCategory",
            Admin: "shop_admin | Shop/Admin",
            EditCategory: 'shop_admin_editcategory | Shop/Admin/EditCategory',
            EditItem: 'shop_admin_edititem | Shop/Admin/EditItem'
        },
        Ranks: {
            Add: "ranks_add | Ranks/Add",
            Remove: "ranks_remove | Ranks/Remove",
            EditItems: "ranks_edititems | Ranks/Edit/Items",
            Edit: "ranks_edit | Ranks/Edit",
            Root: "ranks | Ranks/Root"
        },
        platformSettings: {
            Edit: "platformsettings_edit | PlatformSettings/Edit",
            Root: "platformsettings_root | PlatformSettings/Root",
            Whitelist: {
                Add: "platformwhitelist_add | PlatformWhitelist/Add",
                Remove: "platformwhitelist_remove | PlatformWhitelist/Remove",
                Root: "platformwhitelist | PlatformWhitelist"
            }
        },
        Basic: {
            Confirmation: "basic_confirm | Basic/Confirm"
        },
        Clans: {
            root: "clans_root | Clans/Root",
            create: "clans_create | Clans/Create",
            editPlayer: "clans_players_edit | Clans/Players/Edit",
            invites: "clans_invites | Clans/Invites",
            players: "clans_players | Clans/Players",
            invite: "clans_invite | Clans/Invite",
            viewInvite: "clans_viewinvite | Clans/ViewInvite"
        },
        CustomCommands: {
            Root: "customcommands_root | CustomCommands/Root",
            Create: "customcommands_create | CustomCommands/Create",
            EditCmds: "customcommands_editcmds | CustomCommands/EditCmds",
            Edit: "customcommands_edit | CustomCommands/Edit",
            Remove: "customcommands_remove | CustomCommands/Remove"
        },
        SidebarEditor: {
            Add: "sidebareditor_add | SidebarEditor/Add",
            AddLine: "sidebareditor_addline | SidebarEditor/AddLine",
            Edit: "sidebareditor_edit | SidebarEditor/Edit",
            EditLine: "sidebareditor_editline | SidebarEditor/EditLine",
            Root: "sidebareditor_root | SidebarEditor/Root"
        },
        Economy: {
            Add: "economy_add | Economy/Add",
            Edit: "economy_edit | Economy/Edit",
            Root: "economy_root | Economy/Root",
            Pay: "economy_pay | Economy/Pay"
        },
        Moderation: {
            Root: "moderation_root | Moderation/Root",
            Warnings: {
                Root: "moderation_warnings | Moderation/Warnings",
                Add: "moderation_warnings_add | Moderation/Warnings/Add",
                View: "moderation_warnings_view | Moderation/Warnings/View",
                ViewAll: "moderation_warnings_viewall | Moderation/Warnings/ViewAll"
            },
            Reports: {
                Dashboard: "reports_dashboard | Reports/Dashboard",
                Create: "reports_create | Reports/Create",
                View: "reports_view | Reports/View",
                Admin: {
                    Dashboard: "reports_admin_dashboard | Reports/Admin/Dashboard",
                    View: "reports_admin_view | Reports/Admin/View",
                }
            },
            Bans: {
                Root: "moderation_bans | Moderation/Bans",
                Create: "moderation_bans_create | Moderation/Bans/Create",
                View: "moderation_bans_view | Moderation/Bans/View",
                Edit: "moderation_bans_edit | Moderation/Bans/Edit"
            },
            Players: {
                Options: "moderation_players_options | Moderation/Players/Options",
                Root: "moderation_players_root | Moderation/Players/Root"
            }, 
        },
        TPA: {
            Request: "tpa_request | TPA/Request"
        },
        development: {
            ChestGUITest: "dev_chestgui | Dev/ChestGUI"
        }
    },
    info: {
        version: "0.1.6",
        name: "Blossom Essentials",
        authors: [
            { name: "FruitKitty", icon: "icons/FruitKitty.png", description: "Made the addon" },
            { name: "TrashyKitty", icon: "icons/TrashyKitty.png", description: "Some APIs and PrismarineDB" }
        ],
        documentation: "blossom.amethystdev.com"
    },
    details: {
        openLegacyCustomUI: "blossom:openlegacy",
        openV2CustomUI: "blossom:open",
        openMainUI: "blossom:openui",
        configItem: "blossom:config"
    }
}