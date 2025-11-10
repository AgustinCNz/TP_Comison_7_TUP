// Rutas de autenticación y perfil de usuario
// POST /api/usuarios/login   -> login (público)
// GET  /api/usuarios/me      -> perfil (requiere token)

const express = require('express');
const router = express.Router();
const { login, me } = require('../controllers/usuariosController');
const { authRequired } = require('../middleware/authMiddleware');

// Login (devuelve { token, user })
router.post('/login', login);

// Perfil del usuario autenticado (lee req.user del middleware)
router.get('/me', authRequired, me);

module.exports = router;
