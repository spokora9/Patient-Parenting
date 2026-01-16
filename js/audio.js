// --- AUDIO ENGINE ---
// This class mimics the Rust struct we will build later.
class AudioEngine {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }

    playTone(type) {
        if (this.ctx.state === 'suspended') this.ctx.resume();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        if (type === 'success') {
            // Happy "Ding" (Major Third)
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
            osc.frequency.exponentialRampToValueAtTime(659.25, this.ctx.currentTime + 0.1); // E5
            gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.4);
        } else if (type === 'tap') {
            // Gentle Click
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(200, this.ctx.currentTime);
            gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.05);
        }
    }
}

const audio = new AudioEngine();
