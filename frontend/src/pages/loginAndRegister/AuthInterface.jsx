import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "./hook/useAuth";

const AuthInterface = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { register: authRegister, login, loading, error, success } = useAuth(); // Desestructura funciones y estados del hook
    const [companias, setCompanias] = useState([]);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const fetchCompanias = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_USER_API}/api/companias/idNombre`);
                const data = await response.json();
                setCompanias(data);
            } catch (err) {
                console.error("Error al obtener las compañias:", err);
            }
        };
        fetchCompanias();
    }, []);

    const onSubmit = async (data) => {
        if (isLogin) {
            try {
                await login(data); // Llamada a la función login del hook
            } catch (err) {
                console.error("Error al iniciar sesión:", err);
            }
        } else {
            if (data.contrasena === data.confirmContrasena) {
                try {
                    await authRegister(data); // Llamada a la función register del hook
                } catch (err) {
                    console.error("Error al registrarse:", err);
                }
            } else {
                console.error("Las contraseñas no coinciden");
            }
        }
        reset();
    };

    return (
        <div className="absolute inset-0 -z-10 h-screen w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
            <div className="flex justify-center items-center h-screen">
                <div className="bg-slate-50 p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-lg font-bold mb-4">{isLogin ? "Iniciar Sesión" : "Registrarse"}</h2>
                    {loading && <p className="text-blue-500 text-sm">Cargando...</p>}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-sm">{success}</p>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {!isLogin && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="nombre"
                                    {...register("nombre", { required: "El usuario es requerido" })}
                                />
                                {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correo">
                                Correo electrónico
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="correo"
                                {...register("correo", {
                                    required: "El correo electrónico es requerido",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Formato de correo inválido",
                                    },
                                })}
                            />
                            {errors.correo && <p className="text-red-500 text-sm">{errors.correo.message}</p>}
                        </div>
                        {!isLogin && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="compania_id">
                                    Compañia
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="compania_id"
                                    {...register("compania_id", {
                                        required: "La compañia es requerida",
                                    })}>
                                    <option value="">Seleccionar compañia</option>
                                    {companias.map((compania) => (
                                        <option key={compania.id} value={compania.id}>
                                            {compania.nombre}
                                        </option>
                                    ))}
                                </select>
                                {errors.compania_id && (
                                    <p className="text-red-500 text-sm">{errors.compania_id.message}</p>
                                )}
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contrasena">
                                Contraseña
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="contrasena"
                                type="password"
                                {...register("contrasena", {
                                    required: "La contraseña es requerida",
                                    minLength: {
                                        value: 4,
                                        message: "La contraseña debe tener al menos 4 caracteres",
                                    },
                                })}
                            />
                            {errors.contrasena && <p className="text-red-500 text-sm">{errors.contrasena.message}</p>}
                        </div>
                        {!isLogin && (
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="confirmContrasena">
                                    Confirmar contraseña
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="confirmContrasena"
                                    type="password"
                                    {...register("confirmContrasena", {
                                        required: "La confirmación de contraseña es requerida",
                                    })}
                                />
                                {watch("contrasena") !== watch("confirmContrasena") && !errors.confirmContrasena && (
                                    <p className="text-red-500 text-sm">Las contraseñas no coinciden</p>
                                )}
                            </div>
                        )}
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={loading}>
                            {isLogin ? "Iniciar Sesión" : "Registrarse"}
                        </button>
                        <p className="text-sm text-gray-700 mt-4">
                            {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
                            <span
                                className="text-blue-500 hover:text-blue-700 cursor-pointer"
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    reset();
                                }}>
                                {isLogin ? " Registrarse" : " Iniciar Sesión"}
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthInterface;
