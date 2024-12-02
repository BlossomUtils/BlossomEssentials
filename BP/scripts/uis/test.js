import config from "../apis/config";
import { ChestFormData } from "../lib/chestUI";
import { prismarineDb } from "../lib/prismarinedb";
import uiManager from "../uiManager";
import ChestGUICommon from "../api/chest/common"
import homeAPI from "../apis/homeAPI";
import moment from "../lib/moment"


uiManager.addUI(config.uiNames.development.ChestGUITest, "Chest GUI testing", (player)=>{
    let hopper = new ChestFormData("27");
    const list = homeAPI.findAllFromPlayer(player.name)
    hopper.title("Hey!")
    list.slice(0, 27).forEach((home, i) => {
        hopper.button(
            i, 
            `${home.data.name}`, 
            [`Created ${moment(home.updatedAt).fromNow()}`], 
            `textures/items/ender_pearl`, 
            1, 
            false, 
            () => {
                homeAPI.teleportTo(player, home.data.name);
            }
        );
    });
    
    /**
    for(let i = 0;i < 27;i++) {
        hopper.button(i, `§cX`, [], `textures/blocks/glass_gray`, 1, false, ()=>{
            hopper.show(player).then(res=>{})

        })
    }
    */
    hopper.button(ChestGUICommon.rowColToSlotId(3, 5), "§dCreate home", ["Create a new home"], "textures/azalea_icons/1.png", 1, false, ()=>{
        uiManager.open(player, config.uiNames.Homes.Add)
    })
    hopper.show(player)
})
