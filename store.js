const HASH_KEY = "budget.hash";
const STORAGE_PREFIX = "budget.data.";
// Keep the local storage well under the ~5 MB localStorage budget.
const MAX_STORAGE_CHARS = 4_000_000;

/** Generate a 128-bit random account hash (32 hex chars). Acts as the credential. */
export function genHash() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function getStoredHash() {
  try {
    return localStorage.getItem(HASH_KEY);
  } catch {
    return null;
  }
}

export function storeHash(hash) {
  try {
    localStorage.setItem(HASH_KEY, hash);
  } catch {
    /* private mode */
  }
}

/** Load a user's budget blob by hash from local storage. Returns the JSON object or null if new. */
export async function loadBudget(hash) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + hash);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Upsert the full budget blob for a hash to local storage. */
export async function saveBudget(hash, blob) {
  try {
    let payload = blob;
    let str = JSON.stringify(payload);
    if (str.length > MAX_STORAGE_CHARS && Array.isArray(blob.transactions)) {
      const txs = [...blob.transactions].sort((a, b) => b.ts - a.ts); // newest first
      let keep = txs.length;
      while (str.length > MAX_STORAGE_CHARS && keep > 50) {
        keep = Math.floor(keep * 0.8);
        payload = { ...blob, transactions: txs.slice(0, keep) };
        str = JSON.stringify(payload);
      }
    }
    localStorage.setItem(STORAGE_PREFIX + hash, str);
  } catch {
    // Quota exceeded or private mode — fall back to a hard-trimmed copy
    try {
      const txs = Array.isArray(blob.transactions)
        ? [...blob.transactions].sort((a, b) => b.ts - a.ts).slice(0, 500)
        : [];
      localStorage.setItem(
        STORAGE_PREFIX + hash,
        JSON.stringify({ ...blob, transactions: txs })
      );
    } catch {
      /* ignore */
    }
  }
}

export function clearBudget(hash) {
  try {
    localStorage.removeItem(STORAGE_PREFIX + hash);
  } catch {
    /* ignore */
  }
}
