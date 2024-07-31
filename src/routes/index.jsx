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
import CreateUser from '../views/admin/userData/CreateUser.jsx';
import UsersEdit from '../views/admin/userData/EditUser.jsx';

// halaman user
import Userpage from "../views/user/home/index"

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

            {/*  */}
            <Route path="/admin/dashboard" element={
                isAuthenticated && userRole === 'admin' ? <Dashboard /> : <Navigate to="/login" replace />
            } />
            {/*  */}
            <Route path="/admin/users" element={
                isAuthenticated && userRole === 'admin' ? <UserList /> : <Navigate to="/login" replace />
            } />
            {/* <Route path="/admin/add/users" element={
                isAuthenticated && userRole === 'admin' ? <CreateUser /> : <Navigate to="/login" replace />
            } /> */}
            {/*  */}
            {/* <Route path="/admin/user/edit/:id" element={
                isAuthenticated && userRole === 'admin' ? <UsersEdit /> : <Navigate to="/login" replace />
            } /> */}
            <Route path="/admin/deskripsi" element={
                isAuthenticated && userRole === 'admin' ? <DeskripsiData /> : <Navigate to="/login" replace />
            } />
            <Route path="/admin/hasil" element={
                isAuthenticated && userRole === 'admin' ? <HasilDeteksi /> : <Navigate to="/login" replace />
            } />
            {/*  */}

            <Route path="/user/home" element={
                isAuthenticated && userRole === 'user' ? <Userpage /> : <Navigate to="/login" replace />
            } />
        </Routes>
    );
}
