const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const saltRounds = 10; // Puedes ajustar el número de rondas de sal según tu necesidad

const register = async (req, res) => {
    const { nombre, apellido, correo, contrasena, compania_id } = req.body;

    if (!nombre || !apellido || !correo || !contrasena || !compania_id) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        // Llama al modelo para crear el usuario
        const newUser = await User.create({ nombre, apellido, correo, contrasena, compania_id });

        res.status(201).json({
            message: "Usuario registrado con éxito",
            user: {
                id: newUser.id,
                nombre: newUser.nombre,
                correo: newUser.correo,
                compania_id: newUser.compania_id,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al registrar el usuario" });
    }
};



const login = async (req, res) => {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
        return res.status(400).json({ message: "Correo y contraseña son obligatorios" });
    }

    try {
        // Verificar si el usuario existe
        const user = await User.findByEmail(correo);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Comparar la contraseña ingresada con la contraseña encriptada
        const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Generar el token JWT
        const token = jwt.sign(
            { id: user.id, correo: user.correo, compania_id: user.compania_id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Responder con el token
        res.json({
            message: "Inicio de sesión exitoso",
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};




module.exports = { register, login };
