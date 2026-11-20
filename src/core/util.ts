/** Random integer in [a, b]. */
export const r = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
/** Normalise an angle to [0, 360). */
export const n360 = (x: number) => ((x % 360) + 360) % 360;
/** Three-digit bearing, e.g. 5 → "005°". */
export const deg = (x: number) => `${String(Math.round(n360(x))).padStart(3, "0")}°`;
/** Signed angle, e.g. -3 → "−3°" (true minus sign). */
export const pm = (x: number) => `${x >= 0 ? "+" : "−"}${Math.abs(x)}°`;
export const rad = (x: number) => (x * Math.PI) / 180;

const ESC: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
/** Escape text for HTML content and double-quoted attributes. */
export const esc = (s: unknown) => String(s).replace(/[&<>"]/g, (c) => ESC[c] ?? c);

/** Fisher–Yates shuffle into a new array. */
export function shuffle<T>(a: readonly T[]): T[] {
  const out = a.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j] as T, out[i] as T];
  }
  return out;
}
