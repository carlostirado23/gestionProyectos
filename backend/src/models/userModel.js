const bcrypt = require("bcrypt");
const pool = require("../../config/db");

const User = {
    async create({ nombre, correo, contrasena, compania_id }) {
        if (!contrasena || typeof contrasena !== "string") {
            throw new Error("La contraseña es inválida");
        }

        // Generar hash de la contraseña
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(contrasena, saltRounds);

        // Insertar en la base de datos
        const result = await pool.query(
            `INSERT INTO usuarios (nombre, correo, contrasena, compania_id, password_hash) 
             VALUES ($1, $2, $3, $4, $5) RETURNING id, nombre, correo, compania_id`,
            [nombre, correo, contrasena, compania_id, passwordHash]
        );

        return result.rows[0];
    },

    async findByEmail(correo) {
        const result = await pool.query(
            `SELECT id, nombre, correo, compania_id, password_hash 
             FROM usuarios WHERE correo = $1`,
            [correo]
        );

        return result.rows[0];
    },
};

module.exports = User;
