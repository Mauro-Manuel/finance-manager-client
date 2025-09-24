import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Income from "./pages/income.jsx";
import Expense from "./pages/Expense.jsx";
import Category from "./pages/Category.jsx";
import Home from "./pages/Home.jsx";
import Filter from "./pages/Filter.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import {Toaster} from "react-hot-toast";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import AuthRoute from "./routes/AuthRoute.jsx";

const App = () => {
    return (
        <>
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Root />} />

                    {/* Rotas privadas */}
                    <Route path="/dashboard" element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path="/income" element={<PrivateRoute><Income /></PrivateRoute>} />
                    <Route path="/expense" element={<PrivateRoute><Expense /></PrivateRoute>} />
                    <Route path="/category" element={<PrivateRoute><Category /></PrivateRoute>} />
                    <Route path="/filter" element={<PrivateRoute><Filter /></PrivateRoute>} />

                    {/* Rotas públicas apenas para não logados */}
                    <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
                    <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />

                    {/* Se rota não existir */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

const Root = () => {
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated ? (
        <Navigate to="/dashboard" />
    ) : (
        <Navigate to="/login" />
    );
}

export default App;
