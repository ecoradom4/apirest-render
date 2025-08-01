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

  Estudiante.associate = function(models) {
  Estudiante.belongsToMany(models.libros, {
    through: models.prestamos,
    foreignKey: 'estudianteId',
    as: 'libros'
  });
  Estudiante.hasMany(models.prestamos, {
    foreignKey: 'estudianteId',
    as: 'prestamos'
  });
};

  return Estudiante;
};