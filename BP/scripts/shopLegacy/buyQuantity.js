import shopAPI from "../../api/shopAPI";
import { ModalFormData } from "@minecraft/server-ui";
import uiManager from "../../uiManager";
import * as simple from "../../functions"

uiManager.addUI("players.shop.buy | players.shop.buy", "Buy an item", (player, typeId)=>{
    let item = shopAPI.fetchItem(typeId)
    let modalForm = new ModalFormData()
    .title(`Buy ${item.data.display}`)
    .textField("Quantity", `Example: 16`)
    .submitButton("Send");
    modalForm.show(player).then(res => {
        if (res.canceled) uiManager.open(player, "players.shop")

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