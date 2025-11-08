// Verifica JWT en Authorization: Bearer <token>
const jwt = require('jsonwebtoken');

function authRequired(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Token requerido' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, email, rol }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

// Permisos por rol (ej: admin)
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.rol !== role) {
      return res.status(403).json({ message: 'Permiso denegado' });
    }
    next();
  };
}

module.exports = { authRequired, requireRole };
