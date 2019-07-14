import Vector2 from './Vector2.js';

class Mouse {
    constructor() {
        this.position = new Vector2();
        this.leftDown = false;
        this.leftPressed = false;

        document.onmousemove = this.handleMouseMove.bind(this);
        document.onmousedown = this.handleMouseDown.bind(this);
        document.onmouseup = this.handleMouseUp.bind(this);
    }

    handleMouseMove(event) {
        this.position = new Vector2(event.pageX, event.pageY);
    }

    handleMouseDown(event) {
        if (event.which === 1) {
            if (!this.leftDown) {
                this.leftPressed = true;
            }

            this.leftDown = true;
        }
    }

    handleMouseUp(event) {
        if (event.which === 1) {
            this.leftDown = false;
        }
    }

    reset() {
        this.leftPressed = false;
    }
}

export default new Mouse();