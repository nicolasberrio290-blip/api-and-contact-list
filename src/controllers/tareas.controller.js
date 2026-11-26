const Tarea = require('../models/tarea.model');

const parseId = (req) => Number.parseInt(req.params.id, 10);
const esTexto = (v) => typeof v === 'string' && v.trim() !== '';

exports.listar = (req, res) => res.json(Tarea.all());

exports.obtener = (req, res) => {
  const id = parseId(req);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'El id debe ser numérico' });
  const t = Tarea.find(id);
  if (!t) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json(t);
};

exports.crear = (req, res) => {
  const { titulo, descripcion } = req.body || {};
  if (!esTexto(titulo)) return res.status(400).json({ error: 'El campo "titulo" es obligatorio' });
  res.status(201).json(Tarea.create({ titulo: titulo.trim(), descripcion }));
};

exports.actualizar = (req, res) => {
  const id = parseId(req);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'El id debe ser numérico' });
  const actual = Tarea.find(id);
  if (!actual) return res.status(404).json({ error: 'Tarea no encontrada' });
  const { titulo, descripcion, completada } = req.body || {};
  if (!esTexto(titulo)) return res.status(400).json({ error: 'El campo "titulo" es obligatorio' });
  if (completada !== undefined && typeof completada !== 'boolean')
    return res.status(400).json({ error: '"completada" debe ser true o false' });
  res.json(Tarea.update(id, { titulo: titulo.trim(), descripcion, completada: completada ?? actual.completada }));
};

exports.eliminar = (req, res) => {
  const id = parseId(req);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'El id debe ser numérico' });
  if (!Tarea.remove(id)) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.status(204).send();
};
