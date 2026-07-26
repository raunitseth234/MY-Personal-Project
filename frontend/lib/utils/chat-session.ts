const STORAGE_KEY = 'rj-chat-session';

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `sess-${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
}

export function getChatSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = generateId();
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}
