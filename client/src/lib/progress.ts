const KEY = 'dh_progress_v1';

function safeGet(): Record<string, string[]> {
  try {
    if (typeof window === 'undefined') return {};
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function safeSet(data: Record<string, string[]>) {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {
    // ignore
  }
}

export function markCompleted(courseId: string, itemId: string) {
  const data = safeGet();
  const list = data[courseId] || [];
  if (!list.includes(itemId)) {
    list.push(itemId);
    data[courseId] = list;
    safeSet(data);
  }
}

export function isCompleted(courseId: string, itemId: string) {
  const data = safeGet();
  const list = data[courseId] || [];
  return list.includes(itemId);
}

export function listCompleted(courseId: string) {
  const data = safeGet();
  return data[courseId] || [];
}

export function getProgressPercent(courseId: string, totalItems: number) {
  if (!totalItems) return 0;
  const completed = listCompleted(courseId).length;
  return Math.round((completed / totalItems) * 100);
}
