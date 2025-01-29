import { world } from "@minecraft/server";
import emojis from './emojis'
import { getTPS } from "./format/tps";
import { getPlayers } from "./format/online";

class BlossomFormatting {
    #vars;
    constructor() {
        this.#vars = {};
    }
    push(name, fn) {
        if(typeof fn !== "function") return;
        this.#vars[name] = fn;
    }
    getVars() {
        let varis = []
        for (const variable in this.#vars) {
            varis.push(variable)
        }
        return varis.join(', ')
    }
    getName(player) {
        return player.name
    }
    format(text, player) {
        function extractBracketValue(line) {
            if (typeof line === 'string') {
                const match = line.match(/{{(.*?)}}/);
                return match ? match[1] : null;
            }
            return null;
        }

        let value = extractBracketValue(text);
        let objective;
        let newLine = text;

        this.#vars.player = this.getName
        this.#vars.name = this.getName
        this.#vars.username = this.getName
        this.#vars.tps = getTPS
        this.#vars.online = getPlayers
        if(text.includes(':')) {
            let emojisUsed = newLine.match(/:([a-z0-9_-]+):/g) || [];
            for(const emoji of emojisUsed) {
                if(emojis[emoji.substring(1).slice(0,-1)]) {
                    newLine = newLine.replaceAll(emoji, emojis[emoji.substring(1).slice(0,-1)]);
                }
            }
        }

        if (value) {
            if (value === 'vars') {
                return newLine.replaceAll(new RegExp(`{{(.*?)}}`, `g`), this.getVars());
            }
            const allObjectives = world.scoreboard.getObjectives();
        
            allObjectives.forEach((obj) => {
                let score = 0;
                if (obj.hasParticipant(player)) {
                    score = obj.getScore(player.scoreboardIdentity);
                } else {
                    score = 0
                }
            
                const objectiveName = obj.id
                newLine = newLine.replaceAll(new RegExp(`{{${objectiveName}}}`, 'g'), score);
            });
            return newLine.replaceAll(new RegExp(`{{(.*?)}}`, `g`), 0);
        }
        

        for (const variable in this.#vars) {
            if (text.includes(`<${variable}>`)) {
                newLine = newLine.replaceAll(`<${variable}>`, this.#vars[variable](player));
            }

        }

        return newLine;
    }

}

export default new BlossomFormatting();