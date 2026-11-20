// Sound signals (RIPA): '-' long blast, '.' short blast, ' ' pause. Returns the duration in ms (0 if no audio).
let AC: AudioContext | null = null;

export function horn(pattern: string, base = 0.9): number {
  try {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    AC = AC ?? new Ctor();
  } catch {
    return 0;
  }
  const ac = AC;
  let t = ac.currentTime + 0.05;
  const S = 0.32 * base;
  const L = 1.6 * base;
  const G = 0.35 * base;
  for (const c of pattern) {
    if (c === " ") {
      t += G * 2;
      continue;
    }
    const d = c === "-" ? L : S;
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = "sawtooth";
    o.frequency.value = 180;
    const f = ac.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 900;
    o.connect(f);
    f.connect(g);
    g.connect(ac.destination);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.18, t + 0.03);
    g.gain.setValueAtTime(0.18, t + d - 0.04);
    g.gain.linearRampToValueAtTime(0, t + d);
    o.start(t);
    o.stop(t + d + 0.02);
    t += d + G;
  }
  return (t - ac.currentTime) * 1000;
}
