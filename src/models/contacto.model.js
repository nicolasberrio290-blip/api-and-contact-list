const db = require('../db');

module.exports = {
  all: () => db.prepare('SELECT * FROM contactos ORDER BY id').all(),
  find: (id) => db.prepare('SELECT * FROM contactos WHERE id = ?').get(id),
  findByEmail: (email) => db.prepare('SELECT * FROM contactos WHERE email = ?').get(email),
  create: ({ nombre, email, telefono = '' }) => {
    const info = db.prepare('INSERT INTO contactos (nombre, email, telefono) VALUES (?, ?, ?)').run(nombre, email, telefono);
    return module.exports.find(info.lastInsertRowid);
  },
  update: (id, { nombre, email, telefono }) => {
    db.prepare('UPDATE contactos SET nombre = ?, email = ?, telefono = ? WHERE id = ?')
      .run(nombre, email, telefono ?? '', id);
    return module.exports.find(id);
  },
  remove: (id) => db.prepare('DELETE FROM contactos WHERE id = ?').run(id).changes > 0,
};
