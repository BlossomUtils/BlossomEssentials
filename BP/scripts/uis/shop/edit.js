import shopAPI from "../../api/shopAPI";
import { ModalFormData } from "@minecraft/server-ui";
import uiManager from "../../uiManager";
import * as simple from "../../functions"
import config from "../../apis/config";

uiManager.addUI(config.uiNames.Shop.Edit, "Edit an item", (player, typeId)=>{
    let item = shopAPI.fetchItem(typeId)
    let modalForm = new ModalFormData()
    .title(`Edit ${typeId}`)
    .textField("Display", `Example: Apple`, item.data.display)
    .textField("Price", `Example: 100`, item.data.price)
    
    .submitButton("Send");
    modalForm.show(player).then(res => {
        if (res.canceled) uiManager.open(player, config.uiNames.Config.Main)

        const [display, price] = res.formValues;

        if(!display) return player.error("You need to enter a display");
        if(!price) return player.error("Enter a price!");
        let isNumeric = simple.isNumeric(price)
        if (!isNumeric) return player.error("Must be numeric");

        try {
            shopAPI.editItem(typeId, price, display, player)
        } catch (err) {
            player.error(`${err.message}`)
        }
    });
})