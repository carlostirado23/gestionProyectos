import { useState } from "react";

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    const apiBaseUrl = import.meta.env.VITE_USER_API; // Base URL desde .env

    const sendRequest = async (endpoint, data) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(`${apiBaseUrl}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error en la solicitud");
            }

            const responseData = await response.json();
            return responseData;
        } catch (err) {
            setError(err.message);
            throw err; // Re-lanza el error si es necesario
        } finally {
            setLoading(false);
        }
    };

    const register = async (data) => {
        try {
            const result = await sendRequest("/api/auth/register", data);
            setSuccess(result.message || "Registro exitoso");
        } catch {
            // El error ya está manejado
        }
    };

    const login = async (data) => {
        try {
            const result = await sendRequest("/api/auth/login", data);
            setSuccess(result.message || "Inicio de sesión exitoso");

            if (result.token) {
                localStorage.setItem("token", result.token);
                setToken(result.token);
            }
        } catch {
            // El error ya está manejado
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setSuccess("Sesión cerrada con éxito");
    };

    return {
        loading,
        error,
        success,
        token,
        register,
        login,
        logout,
    };
};

export default useAuth;
