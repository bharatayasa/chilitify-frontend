import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import Cookies from 'js-cookie';
import { AuthContext } from '../context/AuthContext';
import dahsboard from '../assets/svg/dashboard.svg'

export default function SidebarMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const { setIsAuthenticated } = useContext(AuthContext);

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        setIsAuthenticated(false);
        navigate("/login", { replace: true });
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
                        <li className={`text-lg font-semibold ${location.pathname === '/admin/dashboard' ? 'bg-primary text-white rounded-lg' : ''}`}>
                            <Link to="/admin/dashboard">
                            <div className="flex flex-row gap-3 justify-center align-middle">
                                    Dashboard
                            </div>
                            </Link>
                        </li>
                        <li className={`text-lg font-semibold ${location.pathname === '/admin/users' ? 'bg-primary text-white rounded-lg' : ''}`}>
                            <Link to="/admin/users">Users</Link>
                        </li>
                        <li className={`text-lg font-semibold ${location.pathname === '/admin/deskripsi' ? 'bg-primary text-white rounded-lg' : ''}`}>
                            <Link to="/admin/deskripsi">Deskripsi</Link>
                        </li>
                        <li className={`text-lg font-semibold ${location.pathname === '/admin/hasil' ? 'bg-primary text-white rounded-lg' : ''}`}>
                            <Link to="/admin/hasil">Hasil</Link>
                        </li>
                        <div className="mt-32 text-center">
                            <div>
                                <a onClick={logout} style={{ cursor: 'pointer' }} className="btn btn-outline px-4">Logout</a>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
}
