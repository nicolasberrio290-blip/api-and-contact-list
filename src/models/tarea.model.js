const db = require('../db');

const toObj = (r) => r && { ...r, completada: !!r.completada };

module.exports = {
  all: () => db.prepare('SELECT * FROM tareas ORDER BY id').all().map(toObj),
  find: (id) => toObj(db.prepare('SELECT * FROM tareas WHERE id = ?').get(id)),
  create: ({ titulo, descripcion = '' }) => {
    const info = db.prepare('INSERT INTO tareas (titulo, descripcion) VALUES (?, ?)').run(titulo, descripcion);
    return module.exports.find(info.lastInsertRowid);
  },
  update: (id, { titulo, descripcion, completada }) => {
    db.prepare('UPDATE tareas SET titulo = ?, descripcion = ?, completada = ? WHERE id = ?')
      .run(titulo, descripcion ?? '', completada ? 1 : 0, id);
    return module.exports.find(id);
  },
  remove: (id) => db.prepare('DELETE FROM tareas WHERE id = ?').run(id).changes > 0,
};
