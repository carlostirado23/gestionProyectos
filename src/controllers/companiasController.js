const Pool = require("../../config/db");

// Obtener todas las compañías
const getCompanias = async (req, res) => {
    const query = "SELECT * FROM companias";
    try {
        const { rows } = await Pool.query(query);
        return res.json(rows); // Respuesta en formato JSON
    } catch (error) {
        console.error("Error al obtener las compañías:", error.message);
        return res.status(500).json({ message: "Error al obtener las compañías." });
    }
};

// Obtener una compañía por id y nombre
const getCompaniasIdNombre = async (req, res) => {
    const query = "SELECT id, nombre FROM companias"; // Solo seleccionamos id y nombre
    try {
        const { rows } = await Pool.query(query);
        return res.json(rows); // Respuesta en formato JSON
    } catch (error) {
        console.error("Error al obtener las compañías:", error.message);
        return res.status(500).json({ message: "Error al obtener las compañías." });
    }
};

// Crear una nueva compañía
const postCreateCompania = async (req, res) => {
    const { nombre, nit, telefono, direccion, correo } = req.body;

    if (!nombre || !nit || !telefono || !direccion || !correo) {
        return res.status(400).json({ message: "Todos los campos son requeridos." });
    }

    const query = `
        INSERT INTO companias (nombre, nit, telefono, direccion, correo)
        VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    try {
        const result = await Pool.query(query, [nombre, nit, telefono, direccion, correo]);
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error al crear la compañía:", error.message);
        return res.status(500).json({ message: "Error al crear la compañía." });
    }
};

module.exports = { getCompanias, getCompaniasIdNombre, postCreateCompania };
