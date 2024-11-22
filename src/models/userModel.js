const bcrypt = require("bcrypt");
const pool = require("../../config/db");

const User = {
    async create({ nombre, apellido, correo, contrasena, compania_id }) {
        if (!contrasena || typeof contrasena !== "string") {
            throw new Error("La contraseña es inválida");
        }

        // Generar hash de la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

        
        const result = await pool.query(
            `INSERT INTO usuarios (nombre, apellido, correo, contrasena, compania_id) 
             VALUES ($1, $2, $3, $4, $5) RETURNING id, nombre, correo, compania_id`,
            [nombre, apellido, correo, hashedPassword, compania_id]
        );

        return result.rows[0];
    },

    async findByEmail(correo) {
        const result = await pool.query(
            `SELECT id, nombre, apellido, correo, compania_id, contrasena 
             FROM usuarios WHERE correo = $1`,
            [correo]
        );

        return result.rows[0];
    },
};

module.exports = User;
