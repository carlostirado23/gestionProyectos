const express = require("express");
const { login, register } = require("../controllers/userController");
const { validateRegister } = require("../../schemas/userSchema");

const router = express.Router();

// Ruta para login
router.post("/login", login);

// Ruta para registrar usuarios
router.post("/register", validateRegister, register);

module.exports = router;
