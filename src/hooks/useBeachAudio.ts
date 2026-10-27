/**
 * Web Audio API synthesizer for realistic ambient ocean waves and water splashes.
 * Completely standalone without external audio file dependencies.
 */

class BeachAudioEngine {
  private ctx: AudioContext | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private gainNode: GainNode | null = null;
  private lfoGain: GainNode | null = null;
  private isRunning: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public startOceanSurf() {
    try {
      this.initContext();
      if (!this.ctx || this.isRunning) return;

      const bufferSize = this.ctx.sampleRate * 4;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      // Generate brown/pinkish smoothed noise for natural water surf
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.96 * b1 + white * 0.11;
        b2 = 0.86 * b2 + white * 0.25;
        output[i] = (b0 + b1 + b2) * 0.35;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      // Lowpass filter for deep coastal rumble
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(260, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(1.8, this.ctx.currentTime);

      // Gain node for overall volume
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
      // Gentle ramp in
      this.gainNode.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 2.5);

      // Low-frequency oscillator to rhythmically swell the waves
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.16, this.ctx.currentTime); // ~6.2s wave period

      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.setValueAtTime(180, this.ctx.currentTime);

      lfo.connect(this.lfoGain);
      this.lfoGain.connect(this.filterNode.frequency);

      this.noiseNode.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      lfo.start();
      this.noiseNode.start();
      this.isRunning = true;
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public stopOceanSurf() {
    if (!this.ctx || !this.isRunning) return;
    try {
      if (this.gainNode) {
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
        setTimeout(() => {
          try {
            this.noiseNode?.stop();
            this.noiseNode?.disconnect();
          } catch {
            // safely ignore
          }
          this.isRunning = false;
        }, 1300);
      } else {
        this.isRunning = false;
      }
    } catch {
      this.isRunning = false;
    }
  }

  public playWaterSplash(intensity: number = 1) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const startFreq = 480 + Math.random() * 260;
      const endFreq = 160 + Math.random() * 80;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(endFreq, this.ctx.currentTime + 0.18);

      const targetGain = Math.min(0.25, 0.08 * Math.max(0.6, intensity));
      gain.gain.setValueAtTime(targetGain, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.24);
    } catch {
      // Ignore
    }
  }

  public playCorkPop() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.28, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {
      // Ignore
    }
  }
}

export const beachAudio = new BeachAudioEngine();
