import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../../service/api.js';
import Cookies from 'js-cookie';
import { AuthContext } from '../../context/AuthContext';
import show from '../../assets/svg/show.svg'
import hide from '../../assets/svg/hode.svg'

export default function Login() {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUserRole } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [validation, setValidation] = useState([]);
    const [loginFailed, setLoginFailed] = useState([]);

    const [showPassword, setShowPassword] = useState(false);

    const login = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/login', {
                username: username,
                password: password,
            });

            const { token, user } = response.data.data;
            
            Cookies.set('token', token);
            Cookies.set('user', JSON.stringify(user));

            setIsAuthenticated(true);
            setUserRole(user.role);

            if (user.role === 'admin') {
                navigate("/admin/dashboard", { replace: true });
            } else if (user.role === 'user') {
                navigate("/user/home", { replace: true });
            }
        } catch (error) {
            if (error.response) {
                setValidation(error.response.data);
                setLoginFailed(error.response.data);
            } else {
                setLoginFailed({ message: "An unexpected error occurred" });
            } 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        {validation.errors && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                {validation.errors.map((error, index) => (
                                    <p className="text-sm" key={index}>{error.path} : {error.msg}</p>
                                ))}
                            </div>
                        )}
                        {loginFailed.message && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                <p className="text-sm">{loginFailed.message}</p>
                            </div>
                        )}

                        <form className="card-body" onSubmit={login}>
                            <div className="text-xl text-center font-semibold lg:px-36 px-28">
                                <h1>Login</h1>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input 
                                    className="input input-bordered" 
                                    type="text" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    placeholder="Username" 
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        className="input input-bordered w-full"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs"
                                    >
                                        {showPassword ? 
                                            <img src={hide} alt="" className="w-5" /> :
                                            <img src={show} alt="" className="w-5" />
                                        }
                                    </button>
                                </div>
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary" type="submit" disabled={loading}>
                                    {loading ? 'Loading...' : 'Login'}
                                </button>
                            </div>

                            <div className="form-control">
                                <div className="mt-10 text-center flex flex-col gap-5">
                                    <div><Link to="/register">Belum punya akun..? <span className="text-sky-600">Register</span></Link></div>
                                    <div><Link to="/"> <span className="text-sky-600">Kembali</span></Link></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
