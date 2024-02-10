class Resources {
    constructor() {
        // Everything that is downloaded on page load for the canvas element to use.
        this.toLoad = {
            sky: "/sprites/sky.png",
            ground: "/sprites/ground.png",
            hero: "/sprites/hero-sheet.png",
            shadow: "/sprites/shadow.png",
        };
        // A bucket that holds all of our images.
        this.images = {

        };
        // This below is a loop that will go through each key that is stored in our toLoad variable.
        // It takes the key and adds it to an image for the canvas to use, so we can draw things to the page properly.
        // Img.onload ensures that our browser doesn't try to access those images before they are loaded, as if it did it would break the browser.
        // After they are loaded, they are then added into our this.images to be able for us to use for our app.
        Object.keys(this.toLoad).forEach(key => {
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                image: img,
                isLoaded: false
            }
            img.onload = () => {
                this.images[key].isLoaded = true;
            }
        })
    }
}

export const resources = new Resources();