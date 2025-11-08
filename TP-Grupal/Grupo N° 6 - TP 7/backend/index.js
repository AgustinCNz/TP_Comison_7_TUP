// Punto de entrada del servidor
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { getPool, query } = require('./config/db');

// Routers
const usuariosRouter = require('./routers/usuariosRouter');

const app = express();

// Middlewares globales
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Health Check
app.get('/health', (req, res) => res.json({ ok: true }));

// Rutas API
app.use('/api/usuarios', usuariosRouter);

// 404
app.use((req, res) => res.status(404).json({ message: 'Recurso no encontrado' }));

// Handler de errores
app.use((err, req, res, next) => {
  console.error('UNHANDLED_ERROR', err);
  res.status(500).json({ message: 'Error interno' });
});

// Arranque del server + prueba de DB
const PORT = process.env.PORT || 3001;

(async () => {
  try {
    await getPool();
    await query('SELECT 1'); // prueba
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log('Base de datos conectada exitosamente');
    });
  } catch (err) {
    console.error('Error al iniciar el servidor o conectar a la DB:', err);
    process.exit(1);
  }
})();
