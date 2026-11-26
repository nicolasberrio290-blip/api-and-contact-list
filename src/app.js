const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json({ mensaje: 'API de Tareas y Contactos', endpoints: ['/tareas', '/contactos'] }));
app.use('/tareas', require('./routes/tareas.routes'));
app.use('/contactos', require('./routes/contactos.routes'));

app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

// Manejo de errores (JSON mal formado, etc.)
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'JSON inválido' });
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
