import { ActionForm } from "../../lib/form_func";
import homeAPI from "../../apis/homeAPI";
import uiManager from "../../uiManager";
import config from "../../apis/config";
import { world } from "@minecraft/server";

uiManager.addUI(config.uiNames.Homes.View, 'Homes view', (player, id, shared = false) => {
    let home = homeAPI.db.getByID(id)
    if (!home) return player.error(`No home found!`);
    let form = new ActionForm();
    form.title(`View Home: ${home.data.name}`)
    form.body(`Coordinates: ${Math.floor(home.data.location.x)} ${Math.floor(home.data.location.y)} ${Math.floor(home.data.location.z)}\nDimension: ${home.data.dimension}`)
    form.button('§dTeleport\n§7Teleport to home', `textures/azalea_icons/ClickyClick.png`, (player) => {
        homeAPI.teleportTo(player, home.data.name, home.data.PlayerName)
        player.success(`Teleported to home!`)
    })
    if (shared == false) {
        form.button('§dRemove\n§7Remove home', `textures/azalea_icons/Delete.png`, (player) => {
            homeAPI.remove(player, home.data.name)
            player.success(`Deleted home!`)
            uiManager.open(player, config.uiNames.Homes.Root)
        })
        form.button(`§dShare Menu\n§7Home sharing options`, 'textures/azalea_icons/11.png', (player) => {
            let form2 = new ActionForm()
            form2.title('Share options')
            form2.button('§dAdd share\n§7Share this home with a player', null, (player) => {
                let form1 = new ActionForm();
                form1.title('§dShare with player')
                form1.button('§cBack', 'textures/azalea_icons/2.png', (player) => {
                    form2.show(player);
                });
            
                for (const plr of world.getPlayers()) {
                    if (home.data.shared.find(_ => _ === plr.name)) {
                        continue;
                    }
                    if(plr.name === player.name) continue;
                    form1.button(`§d${plr.name}`, null, (player) => {
                        homeAPI.share(plr, home.data.name, player);
                        player.success(`Shared home with ${plr.name}`);
                        form2.show(player);
                    });
                }
                form1.show(player);
            });
            
            for(const plr of home.data.shared) {
                form2.button(`§d${plr}\n§7Remove this player`, null, (player)=>{
                    homeAPI.removeshare(plr, home.data.name, player)
                })
            }
            form2.show(player)
        })
    }
    form.show(player)
})