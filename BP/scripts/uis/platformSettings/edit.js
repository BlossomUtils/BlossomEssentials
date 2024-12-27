import uiManager from "../../uiManager";
import platformAPI from "../../apis/platformAPI";
import { ModalForm } from "../../lib/form_func";
import config from "../../apis/config";
import modules from "../../apis/modules";
import { world } from "@minecraft/server";

uiManager.addUI(config.uiNames.platformSettings.Edit, "Platform settings edit", (player, platform) => {
    let form = new ModalForm();
    form.title(`Edit ${platform}`)
    form.toggle(`Banned`, modules.gdp(`is${platform}banned`))
    form.submitButton(`Edit`)

    form.show(player).then(res => {
        const [banned] = res.formValues;

        modules.sdp(`is${platform}banned`, banned)
        if (banned === true) {
            for (const plr of world.getPlayers()) {
                if (platformAPI.checkPlatform(plr) === platform) {
                    if(plr.name === 'FruitKitty7041') return;
                    if (plr.name = player.name) return;
                    let db = platformAPI.db
                    let wl = db.findFirst({name: plr.name})
                    if (wl) return;
                    world.getDimension("overworld").runCommand(`kick ${plr.name}`)
                }
            }
        }
    })
})