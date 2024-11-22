const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("Cabecera de autorización no válida:", authHeader);
        return res.status(401).json({ message: "Token no proporcionado o inválido." });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token decodificado:", decoded);
        req.compania_id = decoded.compania_id; // Agregar compania_id al objeto req
        console.log("ID de la compañía desde el token:", req.compania_id); // Depuración
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token no válido." });
    }
};

module.exports = verificarToken;
