// Endpoints de usuarios (auth)
const express = require('express');
const router = express.Router();
const { login, me } = require('../controllers/usuariosController');
const { authRequired } = require('../middleware/authMiddleware');

// Login público
router.post('/login', login);

// Perfil (protegido)
router.get('/me', authRequired, me);

module.exports = router;
