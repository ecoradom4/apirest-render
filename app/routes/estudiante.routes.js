module.exports = app => {
  const estudiantes = require("../controllers/estudiante.controller.js");
  var router = require("express").Router();

  // Crear nuevo estudiante
  router.post("/", estudiantes.create);
  // Obtener todos los estudiantes
  router.get("/", estudiantes.findAll);
  // Obtener un estudiante por id (con sus préstamos)
  router.get("/:id", estudiantes.findOne);
  // Obtener préstamos de un estudiante
  router.get("/:id/prestamos", estudiantes.findPrestamosByEstudiante);
  // Actualizar un estudiante por id
  router.put("/:id", estudiantes.update);
  // Eliminar un estudiante por id
  router.delete("/:id", estudiantes.delete);

  app.use('/api/estudiantes', router);
};