import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../views/home/index.jsx";
import Register from "../views/auth/Register.jsx";
import Login from "../views/auth/Login.jsx";

// halaman admin
import Dashboard from "../views/admin/dashboard/index"

// halaman user
import Userpage from "../views/user/home/index"

export default function AppRoutes() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={<Home />} />

            {/* route "/register" */}
            <Route path="/register" element={
                isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Register />
            } />

            {/* route "/login" */}
            <Route path="/login" element={
                isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Login />
            } />

             {/* route "/admin/dashboard" */}
            <Route path="/admin/dashboard" element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
            } />
            
            {/* route "/admin/dashboard" */}
            <Route path="/user/home" element={
                isAuthenticated ? <Userpage /> : <Navigate to="/login" replace />
            } />
        </Routes>
    );
}
