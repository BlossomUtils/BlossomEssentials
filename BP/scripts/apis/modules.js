import { prismarineDb } from "../lib/prismarinedb";
import * as mc from '@minecraft/server'

class moduleAPI {
    constructor() {
        mc.system.run(async () => {
            this.db = prismarineDb.table('modules')
            this.kv = await this.db.keyval('Modules')
            this.binding = this.kv.get('binding')
            this.platformtags = this.kv.get('platform')
            this.chatranks = this.kv.get('chatRanks')
            this.tpa = this.kv.get('tpaRequests')
            this.tpaUI = this.kv.get('tpawithUI')
            this.chatPrefix = this.kv.get('chatPrefix')
            this.sidebar = this.kv.get('sidebar')
            if (this.binding === undefined) this.set('binding', true)
            if (this.platformtags === undefined) this.set('platform', true);
            if (this.chatranks === undefined) this.set('chatRanks', true)
            if (this.tpaUI === undefined) this.set('tpawithUI', true);
            if (this.tpa === undefined) this.set('tpaRequests', true);
            if (this.sidebar === undefined) this.set('sidebar', true);
            if (this.chatPrefix == undefined) this.set('chatPrefix', '-')
            this.updateAll();
        })
    }
    updateAll() {
        this.binding = this.kv.get('binding')
        this.platformtags = this.kv.get('platform')
        this.chatranks = this.kv.get('chatRanks')
        this.tpa = this.kv.get('tpaRequests')
        this.tpaUI = this.kv.get('tpawithUI')
        this.chatPrefix = this.kv.get('chatPrefix')
        this.sidebar = this.kv.get('sidebar')
    }
    async sdp(pr, vl) {
        mc.world.setDynamicProperty(`${pr}`, vl)
    }
    async set(pr, vl) {
        let kv = await this.kv
        await kv.set(pr, vl)
        this.updateAll()
    }
    async get(pr) {
        let kv = await this.kv.get(pr)
        return kv;
    }
    async gdp(pr) {
        return mc.world.getDynamicProperty(pr)
    }
}

export default new moduleAPI();