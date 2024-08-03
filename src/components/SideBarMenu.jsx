import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import Cookies from 'js-cookie';
import { AuthContext } from '../context/AuthContext';

export default function SidebarMenu() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);
    const [darkMode, setDarkMode] = useState(false);

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        setIsAuthenticated(false);
        navigate("/login", { replace: true });
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark', !darkMode);
    };

    return (
        <div className="fixed top-0 left-0 w-64 h-screen z-10">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                        Menu
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        <li className="text-lg font-semibold">
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </li>
                        <li className="text-lg font-semibold">
                            <Link to="/admin/users">Users</Link>
                        </li>
                        <li className="text-lg font-semibold">
                            <Link to="/admin/deskripsi">Deskripsi</Link>
                        </li>
                        <li className="text-lg font-semibold">
                            <Link to="/admin/hasil">Hasil</Link>
                        </li>
                        <div className="mt-32 text-center">
                            <div>
                                <a onClick={logout} style={{ cursor: 'pointer' }} className="btn btn-outline px-4">Logout</a>
                            </div>
                            <div className="mt-4">
                                <label className="flex cursor-pointer gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="5" />
                                        <path
                                            d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                                    </svg>
                                    <input
                                        type="checkbox"
                                        checked={darkMode}
                                        onChange={toggleDarkMode}
                                        className="toggle theme-controller"
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                    </svg>
                                </label>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
}
