import Vector2 from '../system/Vector2.js';
import Color from '../system/Color.js';

import Cannon from './Cannon.js';
import Ball from './Ball.js';
import PaintCan from './PaintCan.js';

export default class PainterGameWorld {
    constructor(game, { sprites, sounds }) {
        this.score = 0;
        this.lives = 5;
        this.game = game;
        this.cannon = null;
        this.ball = null;
        this.can1 = null;
        this.can2 = null;
        this.can3 = null;

        this.updateScore = this.updateScore.bind(this);
        this.updateLives = this.updateLives.bind(this);
    }

    initialize(sprites, sounds) {
        this.cannon = new Cannon({
            position: new Vector2(72, 405),
            sprites: sprites.cannon
        });
        this.ball = new Ball({
            position: new Vector2(65, 390),
            sprites: sprites.ball,
            sounds
        });
        this.can1 = new PaintCan({
            position: new Vector2(450, -200),
            color: Color.red,
            sprites: sprites.can,
            sounds
        });
        this.can2 = new PaintCan({
            position: new Vector2(575, -200),
            color: Color.green,
            sprites: sprites.can,
            sounds
        });
        this.can3 = new PaintCan({
            position: new Vector2(700, -200),
            color: Color.blue,
            sprites: sprites.can,
            sounds
        });
    }

    handleInput(delta, Mouse, Keyboard) {
        if (this.lives > 0) {
            this.ball.handleInput(delta, Mouse, Keyboard);
            this.cannon.handleInput(delta, Mouse, Keyboard);
        } else {
            if (Mouse.leftPressed) {
                this.reset();
            }
        }
    }

    update(delta) {
        if (this.lives > 0) {
            this.ball.update(delta, {
                color: this.cannon.color,
                position: this.cannon.ballPosition,
                isOutsideWorld: this.isOutsideWorld(this.ball.position)
            });

            this.cannon.update(delta);

            this.can1.update(delta, {
                ball: this.ball,
                isOutsideWorld: this.isOutsideWorld(this.can1.position),
                updateScore: this.updateScore,
                updateLives: this.updateLives
            });

            this.can2.update(delta, {
                ball: this.ball,
                isOutsideWorld: this.isOutsideWorld(this.can2.position),
                updateScore: this.updateScore,
                updateLives: this.updateLives
            });

            this.can3.update(delta, {
                ball: this.ball,
                isOutsideWorld: this.isOutsideWorld(this.can3.position),
                updateScore: this.updateScore,
                updateLives: this.updateLives
            });
        }
    }

    draw(canvas, sprites) {
        canvas.drawImage(sprites.background);
        canvas.drawImage(sprites.scorebar, new Vector2(10, 10));
        canvas.drawText("Score: " + this.score, new Vector2(20, 22), Color.white);

        this.ball.draw(this.game.canvas);
        this.cannon.draw(this.game.canvas);
        this.can1.draw(this.game.canvas);
        this.can2.draw(this.game.canvas);
        this.can3.draw(this.game.canvas);

        for (var i = 0; i < this.lives; i++) {
            canvas.drawImage(sprites.lives, new Vector2(i * sprites.lives.width + 15, 60));
        }

        if (this.lives <= 0) {
            canvas.drawImage(sprites.gameover, new Vector2(
                this.game.size.x - sprites.gameover.width,
                this.game.size.y - sprites.gameover.height
            ).divideBy(2));
        }
    }

    reset() {
        this.score = 0;
        this.lives = 5;
        this.cannon.reset();
        this.ball.reset();
        this.can1.reset();
        this.can2.reset();
        this.can3.reset();
    }

    isOutsideWorld(position) {
        return (
            position.x < 0 ||
            position.x > this.game.size.x ||
            position.y > this.game.size.y
        );
    }

    updateScore(value) {
        this.score += value;
    }

    updateLives(value) {
        this.lives += value;
    }
}