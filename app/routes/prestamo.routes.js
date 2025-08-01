module.exports = app => {
  const prestamos = require("../controllers/prestamo.controller.js");
  var router = require("express").Router();

  // Asignar libro a estudiante
  router.post("/", prestamos.asignarLibro);
  // Marcar libro como devuelto
  router.put("/:id/devolver", prestamos.marcarDevuelto);

  app.use('/api/prestamos', router);
};