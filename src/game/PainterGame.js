import Keyboard from '../system/Keyboard.js';
import Mouse from '../system/Mouse.js';

import Game from './Game.js';
import PainterGameWorld from './PainterGameWorld.js';

export default class PainterGame extends Game {
    constructor({ ...args }) {
        super(args);

        this._totalTime = 0;
        this.gameWorld = new PainterGameWorld(this, {
            sprites: this.sprites,
            sounds: this.sounds
        });

        this.mainLoop = this.mainLoop.bind(this);
    }

    get totalTime() {
        return this._totalTime;
    }

    initialize() {
        this.gameWorld.initialize(this.sprites, this.sounds);
        this.sounds.music.volume = 0.3;
        this.sounds.music.play();
    }

    loadAssets() {
        this.sprites.background = this.loadSprite('background.jpg');
        this.sprites.scorebar = this.loadSprite('scorebar.jpg');
        this.sprites.cannon = {
            barrel: this.loadSprite('cannon-barrel.png'),
            red: this.loadSprite('cannon-ball-red.png'),
            green: this.loadSprite('cannon-ball-green.png'),
            blue: this.loadSprite('cannon-ball-blue.png')
        };
        this.sprites.ball = {
            red: this.loadSprite('ball-red.png'),
            green: this.loadSprite('ball-green.png'),
            blue: this.loadSprite('ball-blue.png'),
        };
        this.sprites.can = {
            red: this.loadSprite('can-red.png'),
            green: this.loadSprite('can-green.png'),
            blue: this.loadSprite('can-blue.png'),
        };
        this.sprites.lives = this.loadSprite('lives.png');
        this.sprites.gameover = this.loadSprite('gameover_click.png');

        this.sounds.music = this.loadSound('music');
        this.sounds.collect_points = this.loadSound('collect-points');
        this.sounds.shoot_paint = this.loadSound('shoot-paint');
    }

    mainLoop() {
        const delta = 1 / 60;

        this.gameWorld.handleInput(delta, Mouse, Keyboard);
        this.gameWorld.update(delta);
        this.canvas.clear();
        this.gameWorld.draw(this.canvas, this.sprites);
    
        Mouse.reset();
        requestAnimationFrame(this.mainLoop);
    }
}