import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../views/home/index.jsx";
import Register from "../views/auth/Register.jsx";
import Login from "../views/auth/Login.jsx";

// halaman admin
import Dashboard from "../views/admin/dashboard/index"
import UserList from "../views/admin/userData/index"
import DeskripsiData from '../views/admin/deskripsiData/index.jsx';
import HasilDeteksi from '../views/admin/hasilDeteksi/index.jsx';

// halaman user
import HomeUsers from "../views/user/home/index"
import Predict from '../views/user/predict/index.jsx';
import History from '../views/user/history/index.jsx';
import About from '../views/user/about/index.jsx';

import Profile from '../../src/views/user/profile/index.jsx'
import EditProfile from '../../src/views/user/profile/EditProfile.jsx'
import EditPassword from '../views/user/profile/EditPassword.jsx';

export default function AppRoutes() {
    const { isAuthenticated, userRole } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/register" element={
                isAuthenticated ? <Navigate to={userRole === 'admin' ? "/admin/dashboard" : "/user/home"} replace /> : <Register />
            } />

            <Route path="/login" element={
                isAuthenticated ? <Navigate to={userRole === 'admin' ? "/admin/dashboard" : "/user/home"} replace /> : <Login />
            } />

            {/* admin */}
            <Route path="/admin/dashboard" element={
                isAuthenticated && userRole === 'admin' ? <Dashboard /> : <Navigate to="/login" replace />
            } />
            <Route path="/admin/users" element={
                isAuthenticated && userRole === 'admin' ? <UserList /> : <Navigate to="/login" replace />
            } />
            <Route path="/admin/deskripsi" element={
                isAuthenticated && userRole === 'admin' ? <DeskripsiData /> : <Navigate to="/login" replace />
            } />
            <Route path="/admin/hasil" element={
                isAuthenticated && userRole === 'admin' ? <HasilDeteksi /> : <Navigate to="/login" replace />
            } />

            {/* user */}
            <Route path="/user/home" element={
                isAuthenticated && userRole === 'user' ? <HomeUsers /> : <Navigate to="/login" replace />
            } />
            <Route path="/user/predict" element={
                isAuthenticated && userRole === 'user' ? <Predict /> : <Navigate to="/login" replace />
            } />
            <Route path="/user/history" element={
                isAuthenticated && userRole === 'user' ? <History /> : <Navigate to="/login" replace />
            } />
            <Route path="/user/about" element={
                isAuthenticated && userRole === 'user' ? <About /> : <Navigate to="/login" replace />
            } />

            <Route path="/user/profile" element={
                isAuthenticated && userRole === 'user' ? <Profile /> : <Navigate to="/login" replace />
            } />
            <Route path="/user/edit/profile" element={
                isAuthenticated && userRole === 'user' ? <EditProfile /> : <Navigate to="/login" replace />
            } />
            <Route path="/user/edit/password" element={
                isAuthenticated && userRole === 'user' ? <EditPassword /> : <Navigate to="/login" replace />
            } />
        </Routes>
    );
}
