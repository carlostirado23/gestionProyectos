const express = require("express");
const router = express.Router();
const {
    getProyectos,
    postCreateProyecto,
    putActualzarProyecto,
    deleteProyecto,
} = require("../controllers/proyectosController");
const validacionDeParametros = require("../../middlewares/validationsMiddleware");
const verificarToken = require("../../middlewares/verificarToken"); // Middleware para validar el token

// Usar el middleware para proteger las rutas y extraer el ID de la compañía desde el token
router.get("/", verificarToken, getProyectos); // Obtiene proyectos de la compañía del usuario
router.post("/", verificarToken, validacionDeParametros, postCreateProyecto); // Crea un nuevo proyecto para la compañía del usuario
router.put("/:id", verificarToken, validacionDeParametros, putActualzarProyecto); // Actualiza un proyecto
router.delete("/:id", verificarToken, deleteProyecto); // Elimina un proyecto

module.exports = router;
