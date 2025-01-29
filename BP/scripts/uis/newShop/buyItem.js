import { ModalFormData } from "@minecraft/server-ui";
import uiManager from "../../uiManager";
import config from "../../apis/config";
import shop from "../../apis/shop";

uiManager.addUI(config.uiNames.NewShop.BuyItem, 'Buy item', (player, id, catid) => {
    let item = shop.get(id)
    let cat = shop.get(catid)
    let form = new ModalFormData();
    form.title('Buy item')
    form.slider('Quantity', 1, 64, 1, 1)
    form.show(player).then((res) => {
        let [quantity] = res.formValues;
        let asd = shop.buy(player, item.id, cat.data.currency, quantity)
    })
})