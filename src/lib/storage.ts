// Safe JSON storage helpers: blocked or full storage never crashes the app.

export function readJSON(storage: () => Storage, key: string): unknown {
  try {
    const raw = storage().getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeJSON(storage: () => Storage, key: string, value: unknown): void {
  try {
    storage().setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable: the app keeps working for this visit without saving.
  }
}

export const local = () => window.localStorage;
export const session = () => window.sessionStorage;
