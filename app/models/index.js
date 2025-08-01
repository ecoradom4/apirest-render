const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.libros = require("./libro.model.js")(sequelize, Sequelize);
db.estudiantes = require("./estudiante.model.js")(sequelize, Sequelize);
db.prestamos = require("./prestamo.model.js")(sequelize, Sequelize);

// Definir relaciones
db.libros.belongsToMany(db.estudiantes, {
  through: db.prestamos,
  foreignKey: "libroId",
  otherKey: "estudianteId"
});

db.estudiantes.belongsToMany(db.libros, {
  through: db.prestamos,
  foreignKey: "estudianteId",
  otherKey: "libroId"
});

module.exports = db;