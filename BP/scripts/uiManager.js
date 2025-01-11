import { functionStore } from "./lib/prismarinedb";
import { ActionForm } from "./lib/prismarinedb";

class UIManager {
    #store
    #descriptions
    #altStore
    #uis
    constructor() {
        this.#store = functionStore.getStore("uis");
        this.#altStore = functionStore.getStore("uis_alt");
        this.#descriptions = new Map();
        this.#uis = {};
    }
    get uis() {
        return [...this.#store.getList()].map((_, index) => {
            const a = [...this.#altStore.getList()][index];
            return {
                id: _,
                altId: a || null,
                ui: function () { },
                desc: this.#descriptions.get(_)
            };
        });

    }
    addUI(id, desc, ui) {
        this.#descriptions.set(id, desc);
        let names = id.split(' | ');
        let mainName = names[0];
        this.#store.add(mainName, ui);
        this.#uis[mainName] = "MAIN";
        if (names.length > 1) {
            this.#altStore.add(names.slice(1).join(' | '), ui);
            this.#uis[names.slice(1).join(' | ')] = "ALT"
        }
    }
    open(player, id, ...data) {
        let name = id.split(' | ')[0];
        let type = this.#uis[name];
        if(!type) {
            let form = new ActionForm();
            form.title("§cError")
            form.body(`§cError opening UI: UI does not exist (Callback: ${name})`)
            form.button("Exit", null)
            form.show(player)
            return;
        }
        player.runCommandAsync(`scriptevent blossom:uiOpened A UI was opened by ${player.name} with ID ${name}`)
        if (type == "MAIN") {
            try {
                this.#store.call(name, player, ...data);
            } catch (e) {
                let form = new ActionForm();
                form.title("§cError")
                form.body(`§cError opening UI ${name}: ${e}\n${e.stack}`)
                form.button("Exit", null)
                form.show(player)
            }
        } else if (type == "ALT") {
            try {
                this.#altStore.call(name, player, ...data);
            } catch (e) {
                let form = new ActionForm();
                form.title("§cError")
                form.body(`§cError opening UI: ${e}\n${e.stack}`)
                form.button("Exit", null)
                form.show(player)
            }
        }
    }
}
export default new UIManager();