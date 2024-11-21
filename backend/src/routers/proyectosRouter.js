
const express = require("express");
const router = express.Router();
const {
    getProyectos,
    postCreateProyecto,
    putActualzarProyecto,
    deleteProyecto,
} = require("../controllers/proyectosController");
const validacionDeParametros = require("../../middlewares/validationsMiddleware");

router.get("/:companiaId", getProyectos); // Obtiene proyectos de una compañía
router.post("/", validacionDeParametros, postCreateProyecto); // Crea un nuevo proyecto
router.put("/:id", validacionDeParametros, putActualzarProyecto); // Actualiza un proyecto
router.delete("/:id", deleteProyecto); // Elimina un proyecto


module.exports = router;
