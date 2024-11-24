import shopAPI from "../../api/shopAPI";
import { ModalFormData } from "@minecraft/server-ui";
import uiManager from "../../uiManager";
import * as simple from "../../functions"
import config from "../../apis/config";

uiManager.addUI(config.uiNames.Shop.Buy, "Buy an item", (player, typeId)=>{
    let item = shopAPI.fetchItem(typeId)
    let modalForm = new ModalFormData()
    .title(`Buy ${item.data.display}`)
    .textField("Quantity", `Example: 16`)
    .submitButton("Send");
    modalForm.show(player).then(res => {
        if (res.canceled) uiManager.open(player, config.uiNames.Shop.Items)

        const [quantity] = res.formValues;

        if(!quantity) return player.error("You need to enter quantity");
        let isNumeric = simple.isNumeric(quantity)
        if (!isNumeric) return player.error("Must be numeric");

        try {
            shopAPI.buyItem(typeId, player, quantity)
        } catch (err) {
            player.error(`${err.message}`)
        }
    });
})