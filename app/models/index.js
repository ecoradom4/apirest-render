const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
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

// Relación muchos a muchos a través de préstamos
db.libros.belongsToMany(db.estudiantes, {
  through: db.prestamos,
  foreignKey: "libroId",
  otherKey: "estudianteId",
  as: "prestamosActivos"  
});

db.estudiantes.belongsToMany(db.libros, {
  through: db.prestamos,
  foreignKey: "estudianteId",
  otherKey: "libroId",
  as: "librosPrestados"  
});

// Relaciones uno a muchos 
db.prestamos.belongsTo(db.libros, {
  foreignKey: "libroId",
  as: "libro"  
});

db.prestamos.belongsTo(db.estudiantes, {
  foreignKey: "estudianteId",
  as: "estudiante" 
});

db.libros.hasMany(db.prestamos, {
  foreignKey: "libroId",
  as: "registrosPrestamo"
});

db.estudiantes.hasMany(db.prestamos, {
  foreignKey: "estudianteId",
  as: "historialPrestamos"
});

module.exports = db;