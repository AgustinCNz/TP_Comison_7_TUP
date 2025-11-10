// Login y perfil (/me)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/db');

async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    console.log('[LOGIN] body:', req.body);

    const [rows] = await query(
      'SELECT id, email, password_hash, rol FROM usuarios WHERE email = ? LIMIT 1',
      [email]
    );
    console.log('[LOGIN] rows:', rows);

    const user = rows[0];
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const ok = await bcrypt.compare(password, user.password_hash || '');
    console.log('[LOGIN] bcrypt.compare:', ok);

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

async function me(req, res) {
  // req.user lo coloca el middleware
  return res.json({ user: req.user });
}

module.exports = { login, me };
