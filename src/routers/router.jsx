import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Register from "../components/Register";
import Login from "../components/Login";
import HomePage from "../pages/HomePage";
import Topup from "../pages/topup/Topup";
import ServiceTransaction from "../pages/ServiceTransaction";
import Pembelian from "../pages/pembelian/Pembelian";
import Transaction from "../pages/transaction/Transaction";
import Akun from "../pages/akun/Akun";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/homepage",
                element: <HomePage />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/topup",
                element: <Topup />
            },
            {
                path: "/pembelian",
                element: <Pembelian />
            },
            {
                path: "/transaction",
                element: <Transaction />
            },
            {
                path: "/akun",
                element: <Akun />
            },
            { 
              index: true, 
              element: <Navigate to="/login" replace /> 
            }
        ]
    }
]);

export default router;
