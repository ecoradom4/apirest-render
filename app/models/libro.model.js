module.exports = (sequelize, Sequelize) => {
  const Libro = sequelize.define("libro", {
    titulo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    autor: {
      type: Sequelize.STRING,
      allowNull: false
    },
    anioPublicacion: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    genero: {
      type: Sequelize.STRING
    },
    disponible: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });

  Libro.associate = function(models) {
  Libro.belongsToMany(models.estudiantes, {
    through: models.prestamos,
    foreignKey: 'libroId',
    as: 'prestamosActivos'
  });
  Libro.hasMany(models.prestamos, {
    foreignKey: 'libroId',
    as: 'registrosPrestamo'
  });
};

  return Libro;
};