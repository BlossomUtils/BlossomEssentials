import { world } from "@minecraft/server";

// Iterate over all players in the world
for (const player of world.getPlayers()) {
    // Get the player's current dimension
    const playerDimension = player.dimension;

    // Output the dimension identifier (e.g., overworld, nether, the_end)
    console.log(`Player ${player.name} is in dimension: ${playerDimension.id}`);
}
