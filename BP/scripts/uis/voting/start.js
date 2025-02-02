import { ModalFormData } from "@minecraft/server-ui";
import voting from "../../apis/voting";
import uiManager from "../../uiManager";
import config from "../../apis/config";

uiManager.addUI(config.uiNames.Voting.Start, 'start vote', (player) => {
    let form = new ModalFormData();
    form.title('Start Referendum')
    form.textField(`Title`, `Main title people will see before clicking`, null)
    form.textField(`Body`, `Main thing people will see on click`, null)
    form.show(player).then((res) => {
        let[title,body] = res.formValues;
        if(!title || !body) return player.error('Missing values')
        voting.start(title,body)
    })
})