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
  return Prestamo;
};