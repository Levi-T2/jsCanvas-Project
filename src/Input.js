// SECTION exports that help with grabbing input from the wasd and arrow keys.
export const LEFT = "LEFT"
export const RIGHT = "RIGHT"
export const UP = "UP"
export const DOWN = "DOWN"
// !SECTION

export class Input {
    constructor() {
        this.heldDirections = [];
        document.addEventListener("keydown", (e) => {
            // Also check for dedicated direction list
            if (e.code === "ArrowUp" || e.code === "KeyW") {
                this.onArrowPressed(UP);
            }
            if (e.code === "ArrowDown" || e.code === "KeyS") {
                this.onArrowPressed(DOWN);
            }
            if (e.code === "ArrowLeft" || e.code === "KeyA") {
                this.onArrowPressed(LEFT);
            }
            if (e.code === "ArrowRight" || e.code === "KeyD") {
                this.onArrowPressed(RIGHT);
            }
        })
        document.addEventListener("keyup", (e) => {
            if (e.code === "ArrowUp" || e.code === "KeyW") {
                this.onArrowReleased(UP);
            }
            if (e.code === "ArrowDown" || e.code === "KeyS") {
                this.onArrowReleased(DOWN);
            }
            if (e.code === "ArrowLeft" || e.code === "KeyA") {
                this.onArrowReleased(LEFT);
            }
            if (e.code === "ArrowRight" || e.code === "KeyD") {
                this.onArrowReleased(RIGHT);
            }
        })
    }

    get direction() {
        return this.heldDirections[0];
    }

    onArrowPressed(direction) {
        // Adds on arrow to the queue if it hasn't been pressed by the user.
        if (this.heldDirections.indexOf(direction) === -1) {
            this.heldDirections.unshift(direction); // Unshift will add our arrows to the beginning of the array.
        }
    }

    onArrowReleased(direction) {
        const index = this.heldDirections.indexOf(direction); // Checks the index of the direction we received.
        if (index === -1) {
            return;
        } // If negative, it means it wasn't pressed so it will return.
        // Else, remove the key that was pressed from the list.
        this.heldDirections.splice(index, 1);
    }
}