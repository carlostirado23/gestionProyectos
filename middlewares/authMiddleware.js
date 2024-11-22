const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(403).json({ message: "Acceso denegado" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Información del usuario decodificada
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido o expirado" });
    }
};

module.exports = authMiddleware;
