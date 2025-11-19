const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function getToken() {
  try {
    return localStorage.getItem('token');
  } catch {
    return null;
  }
}

async function request(path: string, opts: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { headers, ...opts });
  const txt = await res.text();
  let parsed: any = {};
  try { parsed = txt ? JSON.parse(txt) : {}; } catch { parsed = { text: txt }; }
  if (!res.ok) throw new Error(parsed.error || parsed.message || parsed.text || 'API error');
  return parsed;
}

export async function enroll(courseId: string) {
  await request('/api/enrollments', { method: 'POST', body: JSON.stringify({ courseSlug: courseId }) });
}

export async function unenroll(courseId: string) {
  await request(`/api/enrollments/${encodeURIComponent(courseId)}`, { method: 'DELETE' });
}

export async function isEnrolled(courseId: string) {
  const data = await request('/api/enrollments');
  const list: string[] = data.enrollments || [];
  return list.includes(courseId);
}

export async function listEnrolled() {
  const data = await request('/api/enrollments');
  return data.enrollments || [];
}
