import { useAuthStore } from '../store/auth';

export const API_URL = 'http://localhost:3001/api';

// Wrapper simple de fetch que inyecta el JWT si existe
export async function http(path, options = {}) {
  const { token } = useAuthStore.getState();

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const contentType = res.headers.get('content-type') || '';

  if (!res.ok) {
    const errText = contentType.includes('application/json')
      ? JSON.stringify(await res.json())
      : await res.text();
    throw new Error(errText || `HTTP ${res.status}`);
  }

  return contentType.includes('application/json') ? res.json() : res.text();
}
