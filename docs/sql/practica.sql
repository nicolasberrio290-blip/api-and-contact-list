-- Práctica SQL: Tareas y Contactos (SQLite)
-- Ejecutar: sqlite3 practica.db < docs/sql/practica.sql

DROP TABLE IF EXISTS tareas;
DROP TABLE IF EXISTS contactos;

CREATE TABLE contactos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telefono TEXT DEFAULT '',
  creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tareas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  descripcion TEXT DEFAULT '',
  completada INTEGER NOT NULL DEFAULT 0,
  creada_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- INSERT
INSERT INTO contactos (nombre, email, telefono) VALUES
  ('Ana Pérez', 'ana@correo.com', '3001234567'),
  ('Luis Gómez', 'luis@correo.com', '3109876543');

INSERT INTO tareas (titulo, descripcion, completada) VALUES
  ('Estudiar Express', 'Repasar rutas y controladores', 0),
  ('Entregar taller', 'Subir último commit', 0),
  ('Leer README guía', '', 1);

-- SELECT
SELECT * FROM tareas;
SELECT * FROM tareas WHERE completada = 0;
SELECT nombre, email FROM contactos ORDER BY nombre;
SELECT COUNT(*) AS pendientes FROM tareas WHERE completada = 0;

-- UPDATE
UPDATE tareas SET completada = 1 WHERE titulo = 'Estudiar Express';
UPDATE contactos SET telefono = '3200000000' WHERE email = 'ana@correo.com';

-- DELETE
DELETE FROM tareas WHERE completada = 1;
DELETE FROM contactos WHERE email = 'luis@correo.com';
