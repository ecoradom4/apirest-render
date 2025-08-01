const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

// Sincronizar base de datos
db.sequelize.sync()
  .then(() => {
    console.log("Base de datos sincronizada.");
  })
  .catch(err => {
    console.log("Error al sincronizar la base de datos: " + err.message);
  });

// Ruta simple
app.get("/", (req, res) => {
  res.json({ message: "API de Biblioteca" });
});

// Importar rutas
require("./app/routes/libro.routes")(app);
require("./app/routes/estudiante.routes")(app);
require("./app/routes/prestamo.routes")(app);

// Configurar puerto
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}.`);
});