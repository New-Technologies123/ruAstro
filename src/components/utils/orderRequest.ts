const STORAGE_KEY = 'pendingOrderRequest';
let pending: { fingerprint: string; requestId: string } | null = null;

export const getOrderRequestId = async (payload: unknown): Promise<string> => {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(payload)));
  const fingerprint = Array.from(new Uint8Array(digest), (value) => value.toString(16).padStart(2, '0')).join('');
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null');
    if (typeof stored?.fingerprint === 'string' && typeof stored?.requestId === 'string') pending = stored;
  } catch { /* Keep retries working when browser storage is unavailable. */ }
  if (pending?.fingerprint !== fingerprint) pending = { fingerprint, requestId: crypto.randomUUID() };
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(pending)); } catch { /* In-memory fallback. */ }
  return pending.requestId;
};

export const finishOrderRequest = (requestId: string) => {
  if (pending?.requestId === requestId) pending = null;
  try {
    if (JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null')?.requestId === requestId) sessionStorage.removeItem(STORAGE_KEY);
  } catch { /* Browser storage may be unavailable. */ }
};
