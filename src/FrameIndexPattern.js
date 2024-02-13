export class FrameIndexPattern {
    constructor(animationConfig) {
        this.currentTime = 0;
        this.animationConfig = animationConfig;
        this.duration = animationConfig.duration ?? 500;
    }

    // Runs a reverse for loop over our walking array to find out what frame needs to be pulled at the correct time.
    get frame() {
        const { frames } = this.animationConfig;
        for (let i = frames.length - 1; i >= 0; i--) {
            if (this.currentTime >= frames[i].time) {
                return frames[i].frame;
            } // This if check lets us know if the frame can be used based on the current time.
        }
        throw "Time is before the first keyframe."
    }

    // This step method will work through our walking or standing frames, and reset once it gets to the end.
    step(delta) {
        this.currentTime += delta;
        if (this.currentTime >= this.duration) {
            this.currentTime = 0;
        }
    }
}