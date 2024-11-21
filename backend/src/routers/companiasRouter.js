const express = require("express");
const router = express.Router();
const { getCompanias, getCompaniasIdNombre, postCreateCompania } = require("../controllers/companiasController");
const validacionDeParametros = require("../../middlewares/validationsMiddleware");

// Ruta para obtener todas las compañías
router.get("/", getCompanias);

// Obtener una compañía por id y nombre
router.get("/idNombre", getCompaniasIdNombre);

// Ruta para crear una nueva compañía
router.post("/",validacionDeParametros, postCreateCompania);

module.exports = router;
