import shopAPI from '../../api/shopAPI.js';
import uiManager from '../../uiManager.js';
import { ModalForm } from '../../lib/prismarinedb.js';
import { ModalFormData } from '@minecraft/server-ui';
import * as simple from '../../functions.js'

uiManager.addUI("admin.shop.addItem | admin.addshopitem", "Create a player warp", (player)=>{
    let modalForm = new ModalFormData()
    .title("Hi!")
    .textField("Display", `Example: Apple`, undefined)
    .textField("Price", `Example: 100`, undefined)
    .textField("TypeID", `Example: minecraft:apple`, undefined)
    
    .submitButton("Send");
    modalForm.show(player).then(res => {
        if (res.canceled) uiManager.open(player, "admin.main")

        const [display, price, typeID] = res.formValues;

        if(!display) return player.error("You need to enter a display");
        if(!price) return player.error("Enter a price!");
        let isNumeric = simple.isNumeric(price)
        if (!isNumeric) return player.error("Must be numeric");
        if(!typeID) return player.error("Please add type id");

        try {
            shopAPI.addItem(typeID, price, display, player)
        } catch (err) {
            player.error(`${err.message}`)
        }
    });
})