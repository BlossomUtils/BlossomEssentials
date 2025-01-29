import { world } from "@minecraft/server";

export function getPlayers() {
    let players = 0
    for (const player of world.getPlayers()) {
        players = players + 1
    }
    return players;
}