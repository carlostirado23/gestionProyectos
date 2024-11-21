import { Route, Routes } from "react-router-dom";
import AuthInterface from "./pages/loginAndRegister/AuthInterface";
import Home from "./pages/home/Home";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
    return (
        <Routes>
            {/* Ruta pública */}
            <Route path="/" element={<AuthInterface />} />
            {/* Ruta protegida */}
            <Route
                path="/home"
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};

export default App;
