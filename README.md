# API REST de Tareas y Contactos

API con Node.js + Express y SQLite (los datos persisten al reiniciar el servidor).

## Cómo ejecutar

```bash
npm install
npm start        # http://localhost:3000
```

Pruebas: abre `api.http` en VS Code con la extensión **REST Client** y pulsa "Send Request".

## Estructura

```
src/
  app.js            # servidor y middlewares
  db.js             # conexión SQLite y creación de tablas
  routes/           # define las URLs
  controllers/      # validación y respuestas HTTP
  models/           # consultas SQL
docs/
  sql/practica.sql
  modelo-datos.md
api.http
```

## Endpoints

| Método | Ruta | Descripción | Códigos |
|---|---|---|---|
| GET | /tareas | Lista tareas | 200 |
| GET | /tareas/:id | Obtiene una tarea | 200, 400, 404 |
| POST | /tareas | Crea tarea (`titulo` obligatorio) | 201, 400 |
| PUT | /tareas/:id | Actualiza tarea | 200, 400, 404 |
| DELETE | /tareas/:id | Elimina tarea | 204, 400, 404 |
| GET | /contactos | Lista contactos | 200 |
| GET | /contactos/:id | Obtiene un contacto | 200, 400, 404 |
| POST | /contactos | Crea contacto (`nombre`, `email`) | 201, 400, 409 |
| PUT | /contactos/:id | Actualiza contacto | 200, 400, 404, 409 |
| DELETE | /contactos/:id | Elimina contacto | 204, 400, 404 |

## Aprendizajes

<!-- ESCRIBE AQUÍ con tus palabras (4-6 líneas): qué aprendiste de rutas/controladores/modelos,
     códigos de estado, validación, y de SQLite. Ejemplo de qué contar: qué te costó, qué error
     encontraste y cómo lo resolviste. -->

## Uso de IA

| Herramienta | Para qué | Qué pedí (ejemplo) | Qué corregí / verifiqué |
|---|---|---|---|
| Claude | Estructura inicial de la API y archivos de documentación | "Ayúdame a hacer la API de tareas y contactos con Express y SQLite" | <!-- COMPLETA: ej. probé cada petición de api.http, revisé que los códigos 400/404/409 respondieran bien, ajusté ... --> |

> Completa las secciones marcadas con comentarios con tu experiencia real: el taller exige que seas responsable de lo que entregas.
