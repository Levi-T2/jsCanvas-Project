export function moveTowards(person, destinationPosition, speed) {
    let distanceToTravelX = destinationPosition.x - person.position.x;
    let distanceToTravelY = destinationPosition.y - person.position.y;

    let distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);

    if (distance <= speed) {
        // Finished moving
        person.position.x = destinationPosition.x;
        person.position.y = destinationPosition.y;
    } else {
        // Else, move by the specified speed in the direction of the destination.
        let normalizedX = distanceToTravelX / distance;
        let normalizedY = distanceToTravelY / distance;
        // Adjusting the bodies position by the speed.
        person.position.x += normalizedX * speed;
        person.position.y += normalizedY * speed;
        // Then, recalculate the remaining distance after the move.
        distanceToTravelX = destinationPosition.x - person.position.x;
        distanceToTravelY = destinationPosition.y - person.position.y;
        // Then make it into a simple number.
        distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);
    }
    return distance;
}