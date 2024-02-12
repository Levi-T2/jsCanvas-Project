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
        // Recreates the is loaded check to ensure the image being drawn has been loaded.
        if (!this.resource.isLoaded) {
            return;
        }
        // Next, we will look through the frame position to find the correct sprite sheet frame to use.
        let frameCoordX = 0;
        let frameCoordY = 0;
        const frame = this.frameMap.get(this.frame); // This will dynamically look up what was stored in the frame map above.
        if (frame) {
            frameCoordX = frame.x;
            frameCoordY = frame.y;
        }
        // This if statement above will assign these variables the frame value that we pass through.
        const frameSizeX = this.frameSize.x;
        const frameSizeY = this.frameSize.y;
        // The above variables are grabbed from the frame size that we declare and re-assigned to these frame variables to use.
        ctx.drawImage(
            this.resource.image, // Passes through an instance of an image that we will be grabbing pixels from.
            frameCoordX, // Top X corner of the frame.
            frameCoordY, // Top Y corner of the frame.
            frameSizeX, // How much to crop out of the sprite sheet (x).
            frameSizeY, // How much to crop out of the sprite sheet (y).
            x, // Where to place the sprite on the canvas tag X (0).
            y, // Where to place the sprite on the canvas tag Y (0).
            frameSizeX * this.scale, // How large to scale it on the x axis.
            frameSizeY * this.scale, // How large to scale it on the y axis.
        )
    }
}