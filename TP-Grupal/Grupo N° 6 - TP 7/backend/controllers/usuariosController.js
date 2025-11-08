// Lógica de usuarios (login y perfil)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/db');

/**
 * POST /api/usuarios/login
 * Body: { email, password }
 * Resp: { token, user: { id, email, rol } }
 */
async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    console.log('[LOGIN] body:', req.body); // <-- agregar

    const [rows] = await query('SELECT id, email, password_hash, rol FROM usuarios WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) {
      console.log('[LOGIN] usuario no encontrado:', email); // <-- agregar
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    console.log('[LOGIN] compare:', ok); // <-- agregar

    if (!ok) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || '2h' }
    );

    return res.json({ token, user: { id: user.id, email: user.email, rol: user.rol } });
  } catch (err) {
    console.error('LOGIN_ERROR', err);
    return res.status(500).json({ message: 'Error interno' });
  }
}


/**
 * GET /api/usuarios/me
 * Header: Authorization: Bearer <token>
 * Resp: { id, email, rol }
 */
async function me(req, res) {
  // req.user viene del middleware authRequired
  return res.json({ id: req.user.id, email: req.user.email, rol: req.user.rol });
}

module.exports = { login, me };
