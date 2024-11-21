const Pool = require("../../config/db");

const getProyectos = async (req, res) => {
    const companiaId = req.params.companiaId;
    const query = "SELECT * FROM proyectos WHERE compania_id = $1";
    try {
        const { rows } = await Pool.query(query, [companiaId]);
        return res.json(rows);
    } catch (error) {
        console.error("Error al obtener proyectos:", error.message);
        return res.status(500).json({ message: "Error al obtener proyectos." });
    }
};

const postCreateProyecto = async (req, res) => {
    const { nombre, descripcion, compania_id } = req.body;
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

const putActualzarProyecto = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const query = `
        UPDATE proyectos SET nombre = $1, descripcion = $2
        WHERE id = $3 RETURNING *;
    `;
    try {
        const result = await Pool.query(query, [nombre, descripcion, id]);
        return res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al actualizar proyecto:", error.message);
        return res.status(500).json({ message: "Error al actualizar proyecto." });
    }
};

const deleteProyecto = async (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM proyectos WHERE id = $1";
    try {
        await Pool.query(query, [id]);
        return res.json({ message: "Proyecto eliminado." });
    } catch (error) {
        console.error("Error al eliminar proyecto:", error.message);
        return res.status(500).json({ message: "Error al eliminar proyecto." });
    }
};

module.exports = { getProyectos, postCreateProyecto, putActualzarProyecto, deleteProyecto };
