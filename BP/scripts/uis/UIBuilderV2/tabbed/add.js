import { ModalFormData } from "@minecraft/server-ui";
import config from "../../../apis/config";
import uiManager from "../../../uiManager";
import tabbedUIBuilder from "../../../apis/tabbedUIBuilder";
import UIBuilderV2 from "../../../apis/UIBuilderV2";

uiManager.addUI(config.uiNames.UIBuilderV2.Tabbed.Add, 'Add tab tabbed builder', (player) => {
    let form = new ModalFormData()
    .title('Create Tabbed UI')
    .textField('ID', 'The ID of this tab ui', undefined)
    .show(player).then(res => {
        let [ id ] = res.formValues;
        tabbedUIBuilder.create(id)
        return uiManager.open(player, config.uiNames.UIBuilderV2.Tabbed.View, id);
    });
})