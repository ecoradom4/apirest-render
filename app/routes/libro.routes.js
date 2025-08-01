module.exports = app => {
  const libros = require("../controllers/libro.controller.js");
  var router = require("express").Router();

  // Crear nuevo libro
  router.post("/", libros.create);
  // Obtener todos los libros
  router.get("/", libros.findAll);
  // Obtener libros disponibles
  router.get("/disponibles", libros.findAllDisponibles);
  // Obtener un libro por id
  router.get("/:id", libros.findOne);
  // Actualizar un libro por id
  router.put("/:id", libros.update);
  // Eliminar un libro por id
  router.delete("/:id", libros.delete);

  app.use('/api/libros', router);
};