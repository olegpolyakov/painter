export default class Sound {
    constructor(sound, looping = false) {
        this.audio = new Audio();
        this.looping = looping;

        if (this.audio.canPlayType('audio/ogg')) {
            this.audio.src = sound + '.ogg';
        } else if (this.audio.canPlayType('audio/mpeg')) {
            this.audio.src = sound + '.mp3';
        } else {
            this.audio = null;
        }
    }

    get volume() {
        return this.audio.volume;
    }

    set volume(value) {
        this.audio.volume = value;
    }

    play() {
        if (this.audio === null) return;

        this.audio.load();
        this.audio.autoplay = true;

        if (!this.looping) return;
        
        this.audio.addEventListener('ended', function() {
            this.load();
            this.autoplay = true;
        }, false);
    }
}