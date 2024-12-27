import { prismarineDb } from "../lib/prismarinedb";
import * as mc from '@minecraft/server'

class moduleAPI {
    constructor() {
        this.db = prismarineDb.table('modules')
        this.kv = this.db.keyval('Modules')
        this.binding = this.kv.get('binding')
        this.platformtags = this.kv.get('platform')
        this.chatranks = this.kv.get('chatRanks')
        this.tpa = this.kv.get('tpaRequests')
        this.tpaUI = this.kv.get('tpawithUI')
        if(this.binding === undefined) this.set('binding', true)
        if(this.platformtags === undefined) this.set('platform', true);
        if(this.chatranks === undefined) this.set('chatRanks', true)
        if(this.tpaUI === undefined) this.set('tpawithUI', true);
        if(this.tpa === undefined) this.set('tpaRequests', true);
        this.updateAll();
    }
    updateAll() {
        this.binding = this.kv.get('binding')
        this.platformtags = this.kv.get('platform')
        this.chatranks = this.kv.get('chatRanks')
        this.tpa = this.kv.get('tpaRequests')
        this.tpaUI = this.kv.get('tpawithUI')
    }
    sdp(pr, vl) {
        mc.world.setDynamicProperty(`${pr}`, vl)
    }
    set(pr, vl) {
        let kv = this.kv
        kv.set(pr, vl)
        this.updateAll()
    }
    get(pr) {
        let kv = this.kv.get(pr)
        return kv;
    }
    gdp(pr) {
        return mc.world.getDynamicProperty(pr)
    }
}

export default new moduleAPI();