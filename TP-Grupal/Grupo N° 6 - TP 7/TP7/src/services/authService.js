import { http } from './http';

export async function loginRequest(email, password) {
  // POST /api/usuarios/login => { token, user: { email, rol } }
  return http('/usuarios/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}
