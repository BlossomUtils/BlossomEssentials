import { prismarineDb } from "../lib/prismarinedb";
import * as mc from '@minecraft/server'
import modules from "./modules";

class platformAPI {
    constructor() {
        mc.system.run(() => {
            this.platforms = [ "console", "mobile", "desktop" ]
            this.db = prismarineDb.table("platformwhitelistDb")
            for (const plf of this.platforms) {
                if(!modules.gdp(`is${plf}banned`)) modules.sdp(`is${plf}banned`, false)
            }
        })
    }
    checkPlatform(player) {
        return player.clientSystemInfo.platformType.toLowerCase();
    }
    addtoWhitelist(name) {
        let ff = this.db.findFirst({name})
        if(ff) throw new Error("Could not add to whitelist because name was found in Database");
        this.db.insertDocument({
            name
        })
        return true;
    }
    removeFromWhitelist(name) {
        let ff = this.db.findFirst({name})
        if(!ff) throw new Error("Player is not in Database");
        this.db.deleteDocumentByID(ff.id)
        return true;
    }
    getDb() {
        return this.db.findDocuments();
    }
    clearTags(plr) {
        for (const plf of this.platforms) {
            plr.removeTag(`platform_${plf}`)
        }
    }
}

export default new platformAPI();