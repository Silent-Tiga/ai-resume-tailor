const PREFIX = 'ai-resume-tailor-v1_';

export function lsGet(key, defaultValue = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return defaultValue;
    const obj = JSON.parse(raw);
    if (obj.exp && Date.now() > obj.exp) {
      localStorage.removeItem(PREFIX + key);
      return defaultValue;
    }
    return obj.val;
  } catch {
    return defaultValue;
  }
}

export function lsSet(key, val, ttlMs = null) {
  const obj = { val };
  if (ttlMs) obj.exp = Date.now() + ttlMs;
  localStorage.setItem(PREFIX + key, JSON.stringify(obj));
}

export function lsRemove(key) {
  localStorage.removeItem(PREFIX + key);
}