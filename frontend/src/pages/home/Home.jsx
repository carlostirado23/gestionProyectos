import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    // Función para cerrar sesión
    const handleLogout = () => {
        localStorage.clear(); // Limpia el localStorage
        navigate("/"); // Redirige a la página de inicio de sesión
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">¡Bienvenido a la página de inicio!</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700">
                Cerrar Sesión
            </button>
        </div>
    );
};

export default Home;
