import config from "../../apis/config";
import UIBuilderV2 from "../../apis/UIBuilderV2";
import { ActionForm, ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";
import moment from "../../lib/moment"


uiManager.addUI(config.uiNames.UIBuilderV2.Edit, "UI builder v2 edit", (player, ui)=>{
    let form = new ActionForm();
    form.title("§f§u§l§l§s§c§r§e§e§n§r§dUI Builder V2")
    form.button(`§cBack\n§7Go back`, null, (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderV2.Root);
    })
    form.button("§dEdit Form\n§7Edit name, body and more", `textures/azalea_icons/GUIMaker/FormsV2.png`, (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderV2.Add, ui)
    })
    form.button("§dEdit Buttons\n§7Edit all buttons", `textures/azalea_icons/ClickyClick.png`, (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderV2.EditButtons, ui)
    })
    form.button(`§dEdit advanced`, null, (player)=>{
        let modal = new ModalForm();
        modal.title("Code Editor");
        modal.textField("Code", "Code", JSON.stringify(ui.data, null, 2));
        modal.show(player, false, (player, response)=>{
            ui.data = response.formValues[0] 
            UIBuilderV2.db.overwriteDataByID(ui.id, JSON.parse(ui.data))
            uiManager.open(player, config.uiNames.UIBuilderV2.Edit, ui)
        })
    })
    form.button(`§cDelete\n§7Delete this UI`, null, player=>{
        uiManager.open(player, config.uiNames.Basic.Confirmation, "Are you sure you want to delete this GUI?", ()=>{
            UIBuilderV2.removeUI(ui.id)
            return uiManager.open(player, config.uiNames.UIBuilderV2.Root)    
        }, ()=>{
            return uiManager.open(player, config.uiNames.UIBuilderV2.Edit, ui);
        });
    })
    form.show(player, false, (player, response)=>{})
})