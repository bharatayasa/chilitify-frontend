import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useContext } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";

export default function NavbarMenu() {
    const location = useLocation();
    const navigate = useNavigate();

    const { setIsAuthenticated } = useContext(AuthContext);

    const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");

    setIsAuthenticated(false);

    navigate("/login", { replace: true });
};

    return (
        <div className="pb-20">
            <div className="navbar bg-base-100 fixed w-full z-50 bg-primary/10 backdrop-blur-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li className={`text-lg font-semibold ${location.pathname === '/user/home' ? 'bg-primary text-white rounded-lg' : ''}`}>
                                <div>
                                    <Link to="/user/home">Home</Link>
                                </div>
                            </li>
                            <li className={`text-lg font-semibold ${location.pathname === '/user/predict' ? 'bg-primary text-white rounded-lg' : ''}`}>
                                <div>
                                    <Link to="/user/predict">Predict</Link>
                                </div>
                            </li>
                            <li className={`text-lg font-semibold ${location.pathname === '/user/history' ? 'bg-primary text-white rounded-lg' : ''}`}>
                                <div>
                                    <Link to="/user/history">History</Link>
                                </div>
                            </li>
                            <li className={`text-lg font-semibold ${location.pathname === '/user/about' ? 'bg-primary text-white rounded-lg' : ''}`}>
                                <div>
                                    <Link to="/user/about">About</Link>
                                </div>
                            </li>
                            <li className={`text-lg font-semibold ${location.pathname === '/user/about' ? 'bg-primary text-white rounded-lg' : ''}`}>
                                <div className="mt-10">
                                    <a onClick={logout} style={{ cursor: 'pointer' }}>Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="flex ml-20">
                        <a className="text-xl">Chilitify</a>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li className={`text-lg ${location.pathname === '/user/home' ? 'bg-primary text-white rounded-lg font-semibold' : ''}`}>
                            <div>
                                <Link to="/user/home">Home</Link>
                            </div>
                        </li>
                        <li className={`text-lg ${location.pathname === '/user/predict' ? 'bg-primary text-white rounded-lg font-semibold' : ''}`}>
                            <div>
                                <Link to="/user/predict">Predict</Link>
                            </div>
                        </li>
                        <li className={`text-lg ${location.pathname === '/user/history' ? 'bg-primary text-white rounded-lg font-semibold' : ''}`}>
                            <div>
                                <Link to="/user/history">History</Link>
                            </div>
                        </li>
                        <li className={`text-lg ${location.pathname === '/user/about' ? 'bg-primary text-white rounded-lg font-semibold' : ''}`}>
                            <div>
                                <Link to="/user/about">About</Link>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end">
                    <div className="hidden md:flex mr-20">
                        <span>
                            <a className="btn" onClick={logout} style={{ cursor: 'pointer' }}>Logout</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
