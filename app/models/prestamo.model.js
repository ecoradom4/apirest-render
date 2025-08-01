module.exports = (sequelize, Sequelize) => {
  const Prestamo = sequelize.define("prestamo", {
    fechaPrestamo: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    fechaDevolucion: {
      type: Sequelize.DATE,
      allowNull: true
    }
  });

  // Agrega estas asociaciones
  Prestamo.associate = function(models) {
    Prestamo.belongsTo(models.libros, {
      foreignKey: 'libroId',
      as: 'libro'
    });
    Prestamo.belongsTo(models.estudiantes, {
      foreignKey: 'estudianteId',
      as: 'estudiante'
    });
  };

  return Prestamo;
};