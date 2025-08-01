module.exports = (sequelize, Sequelize) => {
  const Estudiante = sequelize.define("estudiante", {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    carnet: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    correo: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    }
  });
  return Estudiante;
};