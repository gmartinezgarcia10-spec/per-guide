// localStorage wrapper. Every key is prefixed "per2:"; never change the prefix or existing keys
// (saved progress lives there). Storage can be unavailable (private mode, blocked): fail silently.
const PREFIX = "per2:";

export const store = {
  get<T>(k: string, d: T): T {
    try {
      const v = localStorage.getItem(PREFIX + k);
      return v ? (JSON.parse(v) as T) : d;
    } catch {
      return d;
    }
  },
  set(k: string, v: unknown): void {
    try {
      localStorage.setItem(PREFIX + k, JSON.stringify(v));
    } catch {}
  },
};
