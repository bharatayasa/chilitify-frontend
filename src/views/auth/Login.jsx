import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../../service/api.js'
import Cookies from 'js-cookie'
import { AuthContext } from '../../context/AuthContext';
import NavbarLandingPage from "../../components/NavbarLandingPage.jsx";

export default function Login() {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUserRole } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [validation, setValidation] = useState([]);
    const [loginFailed, setLoginFailed] = useState([]);

    const login = async (e) => {
        e.preventDefault();
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
        }
    };

    return (
            <div>
                <div className="hero bg-base-200 min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">sini Login yang, abistu kita kawin lari!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <div className="flex justify-center gap-5">
                            <button className="btn btn-primary"><Link to="/register">Register</Link></button>
                            <button className="btn btn-accent"><Link to="/">Kembali</Link></button>
                        </div>
                        </div>
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

                        {
                            validation.errors && (
                                <div>
                                    {
                                        validation.errors.map((error, index) => (
                                            <p key={index}>{error.path} : {error.msg}</p>
                                        ))
                                    }
                                </div>
                            )
                        }
                        {
                            loginFailed.message && (
                                <div>
                                    {loginFailed.message}
                                </div>
                            )
                        }

                        <form className="card-body" onSubmit={login}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input className="input input-bordered" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input className="input input-bordered" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}
