import PainterGame from './src/index.js';

const canvas = document.querySelector('#canvas');

const game = new PainterGame({
    canvas,
    width: 800,
    height: 480,
    assetsPath: './assets'
});

game.start();