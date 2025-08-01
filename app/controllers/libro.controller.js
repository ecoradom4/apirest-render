const db = require("../models");
const Libro = db.libros;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.titulo || !req.body.autor || !req.body.anioPublicacion) {
    res.status(400).send({
      message: "Los campos titulo, autor y anioPublicacion son requeridos!"
    });
    return;
  }

  const libro = {
    titulo: req.body.titulo,
    autor: req.body.autor,
    anioPublicacion: req.body.anioPublicacion,
    genero: req.body.genero,
    disponible: req.body.disponible !== undefined ? req.body.disponible : true
  };

  Libro.create(libro)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error al crear el libro."
      });
    });
};

exports.findAll = (req, res) => {
  const titulo = req.query.titulo;
  const condition = titulo ? { titulo: { [Op.iLike]: `%${titulo}%` } } : null;

  Libro.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error al recuperar los libros."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Libro.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se encontró el libro con id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al recuperar el libro con id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Libro.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Libro actualizado correctamente."
        });
      } else {
        res.send({
          message: `No se pudo actualizar el libro con id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el libro con id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Libro.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Libro eliminado correctamente!"
        });
      } else {
        res.send({
          message: `No se pudo eliminar el libro con id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar el libro con id=" + id
      });
    });
};

exports.findAllDisponibles = (req, res) => {
  Libro.findAll({ where: { disponible: true } })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error al recuperar los libros disponibles."
      });
    });
};