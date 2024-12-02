import uiManager from "../../uiManager";
import platformAPI from "../../apis/platformAPI";
import { ModalForm } from "../../lib/form_func";
import config from "../../apis/config";
import modules from "../../apis/modules";

uiManager.addUI(config.uiNames.platformSettings.Edit, "Platform settings edit", (player, platform)=>{
    let form = new ModalForm();
    form.title(`Edit ${platform}`)
    form.toggle(`Banned`, modules.gdp(`is${platform}banned`))
    form.submitButton(`Edit`)

    form.show(player).then(res => {
        const [ banned ] = res.formValues;

        modules.sdp(`is${platform}banned`, banned)
    })
})