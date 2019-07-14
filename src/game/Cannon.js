import Vector2 from '../system/Vector2.js';
import Color from '../system/Color.js';
import Keyboard, { Keys } from '../system/Keyboard.js';

import ThreeColorGameObject from './ThreeColorGameObject.js';

export default class Cannon extends ThreeColorGameObject {
    constructor({ position, sprites }) {
        super(sprites);

        this.initialPosition = position;
        this.position = this.initialPosition;
        this.origin = new Vector2(34, 34);
    }

    get ballPosition() {
        var opposite = Math.sin(this.rotation) * this.sprites.barrel.width * 0.6;
        var adjacent = Math.cos(this.rotation) * this.sprites.barrel.width * 0.6;

        return new Vector2(this.position.x + adjacent, this.position.y + opposite);
    }

    reset() {
        this.position = this.initialPosition;
    }

    handleInput(delta, Mouse, Keyboard) {
        if (Keyboard.keyDown === Keys.R) {
            this.color = Color.red;
        } else if (Keyboard.keyDown === Keys.G) {
            this.color = Color.green;
        } else if (Keyboard.keyDown === Keys.B) {
            this.color = Color.blue;
        }
        
        var opposite = Mouse.position.y - this.position.y;
        var adjacent = Mouse.position.x - this.position.x;

        this.rotation = Math.atan2(opposite, adjacent);
    }

    draw(canvas) {
        if (!this.visible) return;

        var colorPosition = this.position.subtract(this.size.divideBy(2));

        canvas.drawImage(this.sprites.barrel, this.position, this.rotation, 1, this.origin);
        canvas.drawImage(this.currentSprite, colorPosition);
    }
}