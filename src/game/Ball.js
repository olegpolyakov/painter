import ThreeColorGameObject from './ThreeColorGameObject.js';

export default class Ball extends ThreeColorGameObject {
    constructor({ position, sprites, sounds }) {
        super(sprites);

        this.initialPosition = position;
        this.sounds = sounds;
        this.shooting = false;

        this.reset();
    }

    handleInput(delta, mouse) {
        if (mouse.leftPressed && !this.shooting) {
            this.shooting = true;
            this.velocity = mouse.position.subtract(this.position).multiplyWith(1.2);
            this.sounds.shoot_paint.play();
        }
    }

    update(delta, { color, position, isOutsideWorld }) {
        if (this.shooting) {
            this.velocity.x *= 0.99;
            this.velocity.y += 6;

            super.update(delta);
        } else {
            this.color = color;
            this.position = position.subtractFrom(this.center);
        } if (isOutsideWorld) {
            this.reset();
        }
    }

    reset() {
        this.position = this.initialPosition;
        this.shooting = false;
    }
}