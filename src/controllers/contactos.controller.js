const Contacto = require('../models/contacto.model');

const parseId = (req) => Number.parseInt(req.params.id, 10);
const esTexto = (v) => typeof v === 'string' && v.trim() !== '';
const emailValido = (v) => esTexto(v) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

exports.listar = (req, res) => res.json(Contacto.all());

exports.obtener = (req, res) => {
  const id = parseId(req);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'El id debe ser numérico' });
  const c = Contacto.find(id);
  if (!c) return res.status(404).json({ error: 'Contacto no encontrado' });
  res.json(c);
};

exports.crear = (req, res) => {
  const { nombre, email, telefono } = req.body || {};
  if (!esTexto(nombre)) return res.status(400).json({ error: 'El campo "nombre" es obligatorio' });
  if (!emailValido(email)) return res.status(400).json({ error: 'El campo "email" no es válido' });
  if (Contacto.findByEmail(email)) return res.status(409).json({ error: 'Ya existe un contacto con ese email' });
  res.status(201).json(Contacto.create({ nombre: nombre.trim(), email: email.trim(), telefono }));
};

exports.actualizar = (req, res) => {
  const id = parseId(req);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'El id debe ser numérico' });
  if (!Contacto.find(id)) return res.status(404).json({ error: 'Contacto no encontrado' });
  const { nombre, email, telefono } = req.body || {};
  if (!esTexto(nombre)) return res.status(400).json({ error: 'El campo "nombre" es obligatorio' });
  if (!emailValido(email)) return res.status(400).json({ error: 'El campo "email" no es válido' });
  const otro = Contacto.findByEmail(email);
  if (otro && otro.id !== id) return res.status(409).json({ error: 'Ya existe un contacto con ese email' });
  res.json(Contacto.update(id, { nombre: nombre.trim(), email: email.trim(), telefono }));
};

exports.eliminar = (req, res) => {
  const id = parseId(req);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'El id debe ser numérico' });
  if (!Contacto.remove(id)) return res.status(404).json({ error: 'Contacto no encontrado' });
  res.status(204).send();
};
