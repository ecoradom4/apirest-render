const db = require("../models");
const Libro = db.libros;
const Estudiante = db.estudiantes;
const Prestamo = db.prestamos;

exports.asignarLibro = async (req, res) => {
  if (!req.body.libroId || !req.body.estudianteId) {
    return res.status(400).send({
      message: "libroId y estudianteId son requeridos!"
    });
  }

  try {
    // Verificar si el libro está disponible
    const libro = await Libro.findByPk(req.body.libroId);
    if (!libro) {
      return res.status(404).send({
        message: "Libro no encontrado."
      });
    }
    
    if (!libro.disponible) {
      return res.status(400).send({
        message: "El libro no está disponible para préstamo."
      });
    }

    // Verificar si el estudiante existe
    const estudiante = await Estudiante.findByPk(req.body.estudianteId);
    if (!estudiante) {
      return res.status(404).send({
        message: "Estudiante no encontrado."
      });
    }

    // Crear el préstamo
    const prestamo = await Prestamo.create({
      libroId: req.body.libroId,
      estudianteId: req.body.estudianteId,
      fechaPrestamo: new Date(),
      fechaDevolucion: null
    });

    // Actualizar disponibilidad del libro
    await libro.update({ disponible: false });

    res.send(prestamo);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error al asignar el libro."
    });
  }
};

exports.marcarDevuelto = async (req, res) => {
  const id = req.params.id;

  try {
    const prestamo = await Prestamo.findByPk(id, {
      include: [{
        model: Libro,
        as: 'libro'
      }]
    });

    if (!prestamo) {
      return res.status(404).send({
        message: `No se encontró el préstamo con id=${id}.`
      });
    }

    if (prestamo.fechaDevolucion) {
      return res.status(400).send({
        message: "El libro ya fue devuelto anteriormente."
      });
    }

    // Actualizar préstamo
    await prestamo.update({
      fechaDevolucion: new Date()
    });

    // Actualizar disponibilidad del libro
    await prestamo.libro.update({ disponible: true });

    res.send({
      message: "Libro marcado como devuelto correctamente."
    });
  } catch (err) {
    res.status(500).send({
      message: "Error al marcar el libro como devuelto: " + err.message
    });
  }
};

exports.findPrestamosByEstudiante = (req, res) => {
  const estudianteId = req.params.id;

  Prestamo.findAll({
    where: { estudianteId: estudianteId },
    include: [
      {
        model: db.libros,
        as: 'libro', 
        attributes: ['id', 'titulo', 'autor', 'disponible']
      },
      {
        model: db.estudiantes,
        as: 'estudiante', 
        attributes: ['id', 'nombre', 'carnet']
      }
    ],
    order: [['fechaPrestamo', 'DESC']]
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.error("Error detallado:", err);
    res.status(500).send({
      message: err.message || "Error al recuperar los préstamos del estudiante."
    });
  });
};

exports.findAll = (req, res) => {
  Prestamo.findAll({
    include: [
      {
        model: Libro,
        as: 'libro',
        attributes: ['id', 'titulo', 'autor']
      },
      {
        model: Estudiante,
        as: 'estudiante',
        attributes: ['id', 'nombre', 'carnet']
      }
    ],
    order: [['fechaPrestamo', 'DESC']]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error al recuperar todos los préstamos."
      });
    });
};