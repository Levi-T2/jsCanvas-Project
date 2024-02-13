export const gridCells = n => {
    return n * 16;
}

export const isSpaceFree = (walls, x, y) => {
    // Converts grid to string format for walls to use.
    const str = `${x},${y}`;
    // Then, checks if walls has an entry for this spot on the gridMap.
    const isWallPresent = walls.has(str);
    // Then, return a bool based on wether or not there is a wall present.
    return !isWallPresent;
}