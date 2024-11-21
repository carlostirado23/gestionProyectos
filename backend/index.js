const express = require("express");
const app = express();

const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas
const userRoutes = require("./src/routers/userRoutes");
const companiasRoutes = require("./src/routers/companiasRouter");
const proyectosRouter = require("./src/routers/proyectosRouter");


// RUTAS
app.use("/api/auth", userRoutes);
app.use("/api/companias", companiasRoutes);
app.use("/api/proyectos", proyectosRouter);


// Ruta raíz
app.get("/", (req, res) => {
    res.send("¡Hola, mundo!");
});

// Servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
