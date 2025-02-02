import { prismarineDb } from "../lib/prismarinedb";
import { MessageFormData } from "@minecraft/server-ui";
import playerAPI from "./playerAPI";
import modules from "./modules";
import commandManager from "../lib/commands/commandManager";
import { world } from "@minecraft/server";

class tpaAPI {
    constructor() {
        this.db = prismarineDb.nonPersistentTable("tpa")
    }
    request(plr, toname) {
        let toplr = playerAPI.verify(toname)
        if(plr.hasTag('blossom:combat')) return player.error('In combat')
        if (!toplr) return "Player is not in-game";
        this.db.insertDocument({
            loc: toplr.location,
            toname: toplr.name,
            name: plr.name,
            dimension: toplr.dimension.id
        })
        if(modules.tpaUI === true) {
            this.triggerUI(toplr, plr.name)
        } else {
            toplr.info(`Type "${commandManager.prefix}tpa accept" to accept the TPA request from ${plr.name}`)
        }
        return true;
    }
    triggerUI(plr, from) {
        let form = new MessageFormData();

        let doc = this.db.findFirst({toname: plr.name})
        
        form.title("TPA Request");
        form.body(`You have been asked to be teleported to by ${from}. Do you want to accept this request?`);
        form.button1("No!");
        form.button2("Yes!");
        form.show(plr).then(res =>{
            if (res.canceled) return this.db.deleteDocumentByID(doc.id), plr.info('Cancelled request');
            if(plr.hasTag('blossom:combat')) return player.error('In combat')
            switch (res.selection) {
                case 0:
                    return this.db.deleteDocumentByID(doc.id), plr.info('Cancelled request');
                    break;
                case 1:
                    let req = this.accept(plr)
                    if(req === true) {
                        plr.success('Accepted TPA request')
                    } else {
                        plr.error(req)
                    }
            }
        })
    }
    cancel(plr) {
        let rq = this.db.findFirst({ name: plr.name })
        if (!rq) return "No request found";
        this.db.deleteDocumentByID(rq.id)
        return true;
    }
    accept(plr) {
        if(plr.hasTag('blossom:combat')) return player.error('In combat')
        let rq = this.db.findFirst({ toname: plr.name })
        if (!rq) return "Request does not exist";
        let rqp = rq.data.name;
        let player = playerAPI.verify(rqp)
        player.teleport(rq.data.loc, {
            dimension: world.getDimension(`${rq.data.dimension}`)
        })
        this.db.deleteDocumentByID(rq.id)
        return true;
    }
}
export default new tpaAPI();