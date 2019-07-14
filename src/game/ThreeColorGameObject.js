import Vector2 from '../system/Vector2.js';
import Color from '../system/Color.js';

export default class ThreeColorGameObject {
    constructor(sprites) {
        this.sprites = sprites;
        this.currentSprite = this.sprites.red;
        this.velocity = Vector2.zero;
        this.position = Vector2.zero;
        this.origin = Vector2.zero;
        this.rotation = 0;
        this.visible = true;
    }

    get color() {
        if (this.currentSprite === this.sprites.red)
            return Color.red;
        else if (this.currentSprite === this.sprites.green)
            return Color.green;
        else
            return Color.blue;
    }

    set color(value) {
        if (value === Color.red)
            this.currentSprite = this.sprites.red;
        else if (value === Color.green)
            this.currentSprite = this.sprites.green;
        else if (value === Color.blue)
            this.currentSprite = this.sprites.blue;
    }

    get width() {
        return this.currentSprite.width;
    }

    get height() {
        return this.currentSprite.height;
    }

    get size() {
        return new Vector2(this.currentSprite.width, this.currentSprite.height);
    }

    get center() {
        return new Vector2(this.currentSprite.width / 2, this.currentSprite.height / 2);
    }

    update(delta) {
        this.position.addTo(this.velocity.multiply(delta));
    }

    draw(canvas) {
        if (!this.visible) return;

        canvas.drawImage(this.currentSprite, this.position, this.rotation, 1, this.origin);
    }
}