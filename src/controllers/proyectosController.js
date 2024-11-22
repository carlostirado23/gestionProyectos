const Pool = require("../../config/db");

// Obtener proyectos por compañía (el ID se obtiene desde el token)
const getProyectos = async (req, res) => {
    const compania_id = req.compania_id; 
    const query = "SELECT * FROM proyectos WHERE compania_id = $1";
    try {
        const { rows } = await Pool.query(query, [compania_id]);
        console.log("Proyectos encontrados:", rows); 
        return res.json(rows);
    } catch (error) {
        console.error("Error al obtener proyectos:", error.message);
        return res.status(500).json({ message: "Error al obtener proyectos." });
    }
};

// Crear un nuevo proyecto asociado a la compañía del usuario
const postCreateProyecto = async (req, res) => {
    const compania_id = req.compania_id; 
    const { nombre, descripcion } = req.body;
    const query = `
        INSERT INTO proyectos (nombre, descripcion, compania_id)
        VALUES ($1, $2, $3) RETURNING *;
    `;
    try {
        const result = await Pool.query(query, [nombre, descripcion, compania_id]);
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error al crear proyecto:", error.message);
        return res.status(500).json({ message: "Error al crear proyecto." });
    }
};

// Actualizar un proyecto existente (verifica que pertenece a la compañía del usuario)
const putActualzarProyecto = async (req, res) => {
    const compania_id = req.compania_id; // Extraído del middleware verificarToken
    const { id } = req.params; // ID del proyecto
    const { nombre, descripcion } = req.body;

    // Verificar que el proyecto pertenece a la compañía
    const checkQuery = "SELECT * FROM proyectos WHERE id = $1 AND compania_id = $2";
    try {
        const checkResult = await Pool.query(checkQuery, [id, compania_id]);
        if (checkResult.rows.length === 0) {
            return res.status(403).json({ message: "No tienes permiso para actualizar este proyecto." });
        }

        const updateQuery = `
            UPDATE proyectos SET nombre = $1, descripcion = $2
            WHERE id = $3 RETURNING *;
        `;
        const result = await Pool.query(updateQuery, [nombre, descripcion, id]);
        return res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al actualizar proyecto:", error.message);
        return res.status(500).json({ message: "Error al actualizar proyecto." });
    }
};

// Eliminar un proyecto (verifica que pertenece a la compañía del usuario)
const deleteProyecto = async (req, res) => {
    const compania_id = req.compania_id; // Extraído del middleware verificarToken
    const { id } = req.params; // ID del proyecto

    // Verificar que el proyecto pertenece a la compañía
    const checkQuery = "SELECT * FROM proyectos WHERE id = $1 AND compania_id = $2";
    try {
        const checkResult = await Pool.query(checkQuery, [id, compania_id]);
        if (checkResult.rows.length === 0) {
            return res.status(403).json({ message: "No tienes permiso para eliminar este proyecto." });
        }

        const deleteQuery = "DELETE FROM proyectos WHERE id = $1";
        await Pool.query(deleteQuery, [id]);
        return res.json({ message: "Proyecto eliminado correctamente." });
    } catch (error) {
        console.error("Error al eliminar proyecto:", error.message);
        return res.status(500).json({ message: "Error al eliminar proyecto." });
    }
};

module.exports = {
    getProyectos,
    postCreateProyecto,
    putActualzarProyecto,
    deleteProyecto,
};
