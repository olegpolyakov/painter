import Vector2 from './Vector2.js';
import Color from './Color.js';

export default class Canvas2D {
    constructor(canvas) {
        this._canvas = canvas;
        this._canvasContext = this._canvas.getContext('2d');
    }

    clear() {
        this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    drawImage(sprite, position = Vector2.zero, rotation = 0, scale = 1, origin = Vector2.zero) {
        this._canvasContext.save();

        this._canvasContext.translate(position.x, position.y);
        this._canvasContext.rotate(rotation);
        this._canvasContext.drawImage(sprite, 0, 0, sprite.width, sprite.height, -origin.x * scale, -origin.y * scale, sprite.width, sprite.height * scale);

        this._canvasContext.restore();
    }

    drawText(text, position = Vector2.zero, color = Color.black, textAlign = 'top', fontName = 'Courier New', fontSize = '20px') {
        this._canvasContext.save();

        this._canvasContext.translate(position.x, position.y);
        this._canvasContext.textBaseline = 'top';
        this._canvasContext.font = fontSize + " " + fontName;
        this._canvasContext.fillStyle = color.toString();
        this._canvasContext.textAlign = textAlign;
        this._canvasContext.fillText(text, 0, 0);

        this._canvasContext.restore();
    }
}