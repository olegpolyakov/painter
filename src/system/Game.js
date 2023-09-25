import Vector2 from './Vector2.js';
import Sound from './Sound.js';
import Canvas2D from './Canvas2D.js';

export default class Game {
    constructor({ canvas, width, height, assetsPath }) {
        this.assetsPath = assetsPath;
        this.sprites = {};
        this.sounds = {};
        this.size = new Vector2(width, height);
        this.canvas = new Canvas2D(canvas);
        this._spritesStillLoading = 0;
         
        this.loadingLoop = this.loadingLoop.bind(this);
    }

    start() {
        this.loadAssets();
        this.loadingLoop();
    }

    loadSound(sound, looping) {
        return new Sound(`${this.assetsPath}/sounds/${sound}`, looping);
    }

    loadSprite(imageName) {
        const image = new Image();

        image.src = `${this.assetsPath}/sprites/${imageName}`;
        image.onload = () => {
            this._spritesStillLoading -= 1;
        };

        this._spritesStillLoading += 1;

        return image;
    }

    loadingLoop() {
        if (!this._spritesStillLoading > 0) {
            requestAnimationFrame(this.loadingLoop);
        } else {
            this.initialize();
            requestAnimationFrame(this.mainLoop);
        }
    }
}