import { Vector2 } from "./Vector2";

export class Sprite {
    constructor({
        resource, // The Image that we want to draw
        frameSize, // Size of the crop for the image
        hFrames, // Horizontal Frames; How the sprite is arranged horizontally
        vFrames, // Vertical Frames; How the sprite is arranged vertically
        frame, // Which frame we want to be shown
        scale, // How large to draw the image
        position, // Where to draw the image
    }) {
        this.resource = resource;
        this.frameSize = frameSize ?? new Vector2(16, 16); // Set to 16x16 as the majority of sprites are 16 pixels
        this.hFrames = hFrames ?? 1;
        this.vFrames = vFrames ?? 1;
        this.frame = frame ?? 0;
        this.frameMap = new Map();
        this.scale = scale ?? 1;
        this.position = position ?? new Vector2(0, 0)
        this.buildFrameMap();
    }

    buildFrameMap() {
        let frameCount = 0;
        for (let v = 0; v < this.vFrames; v++) {
            for (let h = 0; h < this.hFrames; h++) {
                this.frameMap.set(
                    frameCount,
                    new Vector2(this.frameSize.x * h, this.frameSize.y * v)
                )
                frameCount++;
            }
        }
    }

    drawImage(ctx, x, y) {
        if (!this.resource.isLoaded) {
            return;
        }
    }
}