import { prismarineDb } from "../lib/prismarinedb";
import * as mc from "@minecraft/server"
/*
    /\___/\
   (  o o  )
   (  =^=  ) 
    (  T  )  ︻デ═一
     |___|
    
    dont break this!
    - fruitkitty
*/
class playerAPI {
    constructor() {
        this.db = prismarineDb.table("playerAPI")
    }
    verify(name) {
        let verified;
        for (const player of mc.world.getPlayers()) {
            if (player.name === name) return verified = player;
        }
        return verified;
    }
}

export default new playerAPI();