// CRUD Actividades (snake_case -> camelCase)
const { query } = require('../config/db');

function mapActRow(r) {
  return {
    id: r.id,
    nombre: r.nombre,
    cupoMaximo: r.cupo_maximo,
    inscritos: r.inscritos,
    horario: r.horario,
    dias: r.dias,
    instructor: r.instructor,
  };
}

async function list(req, res) {
  const [rows] = await query('SELECT * FROM actividades ORDER BY id DESC');
  return res.json(rows.map(mapActRow));
}

async function getById(req, res) {
  const id = Number(req.params.id);
  const [rows] = await query('SELECT * FROM actividades WHERE id = ?', [id]);
  if (!rows.length) return res.status(404).json({ message: 'Actividad no encontrada' });
  return res.json(mapActRow(rows[0]));
}

async function create(req, res) {
  const { nombre, cupoMaximo, inscritos, horario, dias, instructor } = req.body || {};
  if (!nombre || !cupoMaximo) return res.status(400).json({ message: 'nombre y cupoMaximo son requeridos' });

  await query(
    `INSERT INTO actividades (nombre, cupo_maximo, inscritos, horario, dias, instructor)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nombre, Number(cupoMaximo), Number(inscritos || 0), horario || null, dias || null, instructor || null]
  );

  const [rows] = await query('SELECT * FROM actividades ORDER BY id DESC LIMIT 1');
  return res.status(201).json(mapActRow(rows[0]));
}

async function update(req, res) {
  const id = Number(req.params.id);
  const { nombre, cupoMaximo, inscritos, horario, dias, instructor } = req.body || {};

  const [exist] = await query('SELECT id FROM actividades WHERE id = ?', [id]);
  if (!exist.length) return res.status(404).json({ message: 'Actividad no encontrada' });

  await query(
    `UPDATE actividades SET nombre = ?, cupo_maximo = ?, inscritos = ?, horario = ?, dias = ?, instructor = ?
     WHERE id = ?`,
    [nombre, Number(cupoMaximo), Number(inscritos), horario, dias, instructor, id]
  );

  const [rows] = await query('SELECT * FROM actividades WHERE id = ?', [id]);
  return res.json(mapActRow(rows[0]));
}

async function remove(req, res) {
  const id = Number(req.params.id);
  const [exist] = await query('SELECT id FROM actividades WHERE id = ?', [id]);
  if (!exist.length) return res.status(404).json({ message: 'Actividad no encontrada' });

  await query('DELETE FROM actividades WHERE id = ?', [id]);
  return res.json({ ok: true });
}

module.exports = { list, getById, create, update, remove };
