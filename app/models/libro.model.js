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
  return Libro;
};