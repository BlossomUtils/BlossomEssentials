import shopAPI from "../../api/shopAPI";
import { ModalFormData } from "@minecraft/server-ui";
import uiManager from "../../uiManager";
import * as simple from "../../functions"

uiManager.addUI("admin.shop.editItem | admin.shop.edit", "Edit an item", (player, typeId)=>{
    let item = shopAPI.fetchItem(typeId)
    let modalForm = new ModalFormData()
    .title(`Edit ${typeId}`)
    .textField("Display", `Example: Apple`, item.data.display)
    .textField("Price", `Example: 100`, item.data.price)
    
    .submitButton("Send");
    modalForm.show(player).then(res => {
        if (res.canceled) uiManager.open(player, "admin.shop.root")

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