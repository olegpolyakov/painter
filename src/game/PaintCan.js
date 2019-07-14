import Vector2 from '../system/Vector2.js';
import Color from '../system/Color.js';

import ThreeColorGameObject from './ThreeColorGameObject.js';

export default class PaintCan extends ThreeColorGameObject {
    constructor({ position, color, sprites, sounds }) {
        super(sprites);

        this.initialPosition = position;
        this.position = this.initialPosition.copy();
        this.initialColor = color;
        this.sounds = sounds;
        this.minVelocity = 30;

        this.reset();
    }

    reset() {
        this.moveToTop();
    }

    moveToTop() {
        this.position = this.initialPosition.copy();
        this.velocity = Vector2.zero;
    }

    update(delta, { ball, isOutsideWorld, updateScore, updateLives }) {
        super.update(delta);

        if (this.velocity.y === 0 && Math.random() < 0.01) {
            this.velocity = this.calculateRandomVelocity();
            this.color = this.calculateRandomColor();
        }

        // calculate the distance between this can and the ball
        const distance = ball.position.add(ball.center).subtractFrom(this.position).subtractFrom(this.center);

        if (Math.abs(distance.x) < this.center.x && Math.abs(distance.y) < this.center.y) {
            this.color = ball.color;
            ball.reset();
        }
        
        if (isOutsideWorld) {
            if (this.color === this.initialColor) {
                updateScore(10);
                this.sounds.collect_points.play();
            } else {
                updateLives(-1);
            }

            this.moveToTop();
        }

        this.minVelocity += 0.01;
        this.rotation = Math.sin(this.position.y / 50) * 0.05;
    }

    calculateRandomVelocity() {
        return new Vector2(0, Math.random() * 30 + this.minVelocity);
    }

    calculateRandomColor() {
        var randomval = Math.floor(Math.random() * 3);
        
        if (randomval == 0)
            return Color.red;
        else if (randomval == 1)
            return Color.green;
        else
            return Color.blue;
    }
}