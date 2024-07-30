import React, { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

import Home from "../view/banner/index";
import Register from "../view/auth/Register";
import Login from "../view/auth/Login";

import Admin from "../view/admin/index";
import UserDashboard from "../view/user/index";

export default function AppRoutes() {
    const { isAuthenticated, userRole } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={
                isAuthenticated ? <Navigate to={`/${userRole}/dashboard`} replace /> : <Register />
            } />
            <Route path="/login" element={
                isAuthenticated ? <Navigate to={`/${userRole}/dashboard`} replace /> : <Login />
            } />
            <Route path="/admin/dashboard" element={
                isAuthenticated && userRole === 'admin' ? <Admin /> : <Navigate to="/login" replace />
            } />
            <Route path="/user/dashboard" element={
                isAuthenticated && userRole === 'user' ? <UserDashboard /> : <Navigate to="/login" replace />
            } />
        </Routes>
    );
}
