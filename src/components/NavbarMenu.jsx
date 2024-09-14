import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useContext } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";
import profile from '../assets/svg/profile.svg'

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

                            <div tabIndex={0} className="menu bg-base-100 rounded-box shadow flex items-center gap-2">
                                <div>
                                    <div className="btn btn-primary"><Link to={'/user/profile'}>My Profile</Link></div>
                                </div>
                                <div>
                                    <a className="btn btn-secondary flex flex-row" onClick={logout} style={{ cursor: 'pointer' }}>
                                        Logout
                                    </a>
                                </div>
                            </div>
                        </ul>
                    </div>
                    <div className="flex ml-20">
                        <a className="text-xl font-extrabold">Chilitify</a>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 lg:flex lg:gap-5">
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
                        <div className="dropdown dropdown-bottom">
                            <span tabIndex={0} role="button" className="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </span>

                            <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box shadow flex items-center gap-5">
                                <div>
                                    <div className="btn btn-primary"><Link to={'/user/profile'}>My Profile</Link></div>
                                </div>
                                <div>
                                    <a className="btn btn-secondary flex flex-row" onClick={logout} style={{ cursor: 'pointer' }}>
                                        Logout
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
