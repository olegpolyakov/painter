export default class Vector2 {
    static get zero() {
        return new Vector2();
    }

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    get isZero() {
        return this.x === 0 && this.y === 0;
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    addTo(v) {
        if (v.constructor === Vector2) {
            this.x += v.x;
            this.y += v.y;
        } else if (v.constructor === Number) {
            this.x += v;
            this.y += v;
        }
        
        return this;
    }

    add(v) {
        return this.copy().addTo(v);
    }

    subtractFrom(v) {
        if (v.constructor === Vector2) {
            this.x -= v.x;
            this.y -= v.y;
        } else if (v.constructor === Number) {
            this.x -= v;
            this.y -= v;
        }

        return this;
    }

    subtract(v) {
        return this.copy().subtractFrom(v);
    }

    divideBy(v) {
        if (v.constructor === Vector2) {
            this.x /= v.x;
            this.y /= v.y;
        } else if (v.constructor === Number) {
            this.x /= v;
            this.y /= v;
        }

        return this;
    }

    divide(v) {
        return this.copy().divideBy(v);
    }

    multiplyWith(v) {
        if (v.constructor === Vector2) {
            this.x *= v.x;
            this.y *= v.y;
        } else if (v.constructor === Number) {
            this.x *= v;
            this.y *= v;
        }

        return this;
    }

    multiply(v) {
        return this.copy().multiplyWith(v);
    }

    normalize() {
        if (this.length === 0) return;

        this.divideBy(this.length);
    }

    copy() {
        return new Vector2(this.x, this.y);
    }

    equals(obj) {
        return this.x === obj.x && this.y === obj.y;
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}