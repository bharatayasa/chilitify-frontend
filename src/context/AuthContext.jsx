import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('token'));
    const [userRole, setUserRole] = useState(Cookies.get('user') ? JSON.parse(Cookies.get('user')).role : null);

    useEffect(() => {
        const updateAuthStatus = () => {
            const token = Cookies.get('token');
            const user = Cookies.get('user');
            setIsAuthenticated(!!token);
            setUserRole(user ? JSON.parse(user).role : null);
        };

        updateAuthStatus();

        window.addEventListener('storage', updateAuthStatus);

        return () => {
            window.removeEventListener('storage', updateAuthStatus);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userRole, setUserRole }}>
            {children}
        </AuthContext.Provider>
    );
};
