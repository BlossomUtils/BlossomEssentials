import { prismarineDb } from "../lib/prismarinedb";
import * as mc from '@minecraft/server'

class moduleAPI {
    constructor() {
        this.binding = mc.world.getDynamicProperty("binding")
        this.platformtags = mc.world.getDynamicProperty("platform")
        this.chatranks = mc.world.getDynamicProperty("chatRanks")
        if(this.binding === undefined) mc.world.setDynamicProperty("binding", true)
        if(this.platformtags === undefined) mc.world.setDynamicProperty("platform", true);
        if(this.chatranks === undefined) mc.world.setDynamicProperty("chatRanks", true);
        this.updateAll()
    }
    updateAll() {
        this.binding = mc.world.getDynamicProperty("binding")
        this.platformtags = mc.world.getDynamicProperty("platform")
        this.chatranks = mc.world.getDynamicProperty("chatRanks")
    }
    sdp(pr, vl) {
        mc.world.setDynamicProperty(`${pr}`, vl)
    }
    gdp(pr) {
        return mc.world.getDynamicProperty(pr)
    }
}

export default new moduleAPI();