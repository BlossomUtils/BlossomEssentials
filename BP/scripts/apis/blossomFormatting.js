import { world } from "@minecraft/server";

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
        return varis.join('\n- ')
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
    
        if (value) { 
            if(value == 'vars') return newLine.replace(/{{(.*?)}}/, this.getVars());
            objective = world.scoreboard.getObjective(value);
            if (objective) {
                if (objective.hasParticipant(player)) {
                    const score = objective.getScore(player);
                    newLine = newLine.replace(/{{(.*?)}}/, score);
                } else {
                    newLine = newLine.replace(/{{(.*?)}}/, 0);
                }
            }
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