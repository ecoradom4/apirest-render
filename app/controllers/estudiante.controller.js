const db = require("../models");
const Estudiante = db.estudiantes;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nombre || !req.body.carnet) {
    res.status(400).send({
      message: "Los campos nombre y carnet son requeridos!"
    });
    return;
  }

  const estudiante = {
    nombre: req.body.nombre,
    carnet: req.body.carnet,
    correo: req.body.correo
  };

  Estudiante.create(estudiante)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error al crear el estudiante."
      });
    });
};

exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  const condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  Estudiante.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error al recuperar los estudiantes."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Estudiante.findByPk(id, {
    include: [{
      model: db.libros,
      through: {
        attributes: ['fechaPrestamo', 'fechaDevolucion']
      }
    }]
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se encontró el estudiante con id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al recuperar el estudiante con id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Estudiante.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Estudiante actualizado correctamente."
        });
      } else {
        res.send({
          message: `No se pudo actualizar el estudiante con id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el estudiante con id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Estudiante.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Estudiante eliminado correctamente!"
        });
      } else {
        res.send({
          message: `No se pudo eliminar el estudiante con id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar el estudiante con id=" + id
      });
    });
};