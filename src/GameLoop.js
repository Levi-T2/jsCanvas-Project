export class GameLoop {
    constructor(update, render) {
        this.lastFrameTime = 0;
        this.accumulatedTime = 0;
        this.timeStep = 1000 / 60; // 60 Frames per second

        this.update = update;
        this.render = render;

        this.rafId = null;
        this.isRunning = false;
    }

    mainLoop = (timestamp) => {
        if (!this.isRunning) {
            return
        };
        let deltaTime = timestamp - this.lastFrameTime; // This delta time serves to uptick our accumulated time so we know how much has passed.
        this.lastFrameTime = timestamp;

        // Accumulate all the time passed since the last frame.
        this.accumulatedTime += deltaTime;

        // Fixed time step updates.
        // If there's enough accumulated time to run one or more fixed updates, run them.
        while (this.accumulatedTime >= this.timeStep) {
            this.update(this.timeStep); // Here, we pass the fixed step size. 
            this.accumulatedTime -= this.timeStep;
        }

        // Renders
        this.render();
        // Sets our rafId which is given to us by the browser.
        this.rafId = requestAnimationFrame(this.mainLoop);
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.rafId = requestAnimationFrame(this.mainLoop);
        }
    }

    // This stop method is useful for pausing the game or slowing down time.
    stop() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        this.isRunning = false;
    }
}