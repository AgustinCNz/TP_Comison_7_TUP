// Conexión MySQL (pool) usando mysql2/promise
const mysql = require('mysql2/promise');

let pool;

/**
 * Crea una única instancia de pool y la reutiliza.
 */
async function getPool() {
  if (!pool) {
    pool = await mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return pool;
}

/**
 * Helper para ejecutar queries con parámetros.
 * @param {string} sql
 * @param {Array} params
 * @returns {Promise<Array>} [rows, fields]
 */
async function query(sql, params = []) {
  const p = await getPool();
  return p.execute(sql, params);
}

module.exports = { getPool, query };
