export const walls = new Set();

walls.add(`64,48`); // Tree

walls.add(`64,64`); // Squares
walls.add(`64,80`);
walls.add(`80,64`);
walls.add(`80,80`);

walls.add(`112,80`); // Water
walls.add(`128,80`);
walls.add(`144,80`);
walls.add(`160,80`);

// With each map that we have, a level file must be created and each collider or wall must me declared manually.
// Using increments of 16, we can figure out which tiles we are one and which ones we can add as walls.