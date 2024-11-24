import shopAPI from "../../api/shopAPI";
import { ModalFormData } from "@minecraft/server-ui";
import uiManager from "../../uiManager";
import * as mc from "@minecraft/server"
import config from "../../apis/config";

uiManager.addUI(config.uiNames.Shop.editCurrency, "Edit an item", (player)=>{
    let modalForm = new ModalFormData()
    .title(`Edit Currency`)
    .textField("Currency", `Example: Gems`, shopAPI.money)

    .submitButton("Send");
    modalForm.show(player).then(res => {
        if (res.canceled) uiManager.open(player, config.uiNames.Shop.Root)

        const [currency] = res.formValues;

        if(!currency) return player.error("You need to enter a currency (scoreboard)");

        try {
            mc.world.setDynamicProperty("simple:money", `${currency}`)
            shopAPI.updateMoneyObjective()
        } catch (err) {
            player.error(`${err.message}`)
        }
    });
})