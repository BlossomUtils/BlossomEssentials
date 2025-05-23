import customCommands from "./customCommands";
import homeAPI from "./homeAPI";
import clanAPI from "./clanAPI"
import UIBuilderV2 from "./UIBuilderV2";
import { system } from "@minecraft/server";

class blossom {
    constructor() {}
    reload() {
        system.run(() => {
            customCommands.reload()
            homeAPI.reload()
            clanAPI.reload()
            UIBuilderV2.reload()
        })
    }
}

var bapi = new blossom();

export { bapi }