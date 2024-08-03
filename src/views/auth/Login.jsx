import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../service/api.js'
import Cookies from 'js-cookie'
import { AuthContext } from '../../context/AuthContext';

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
            <div>
                <div>
                    <div>
                        <h4>LOGIN</h4>
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
                        <form onSubmit={login}>
                            <div>
                                <label>Email address</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                            </div>

                            <div>
                                <label>Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                            </div>
                            <button type="submit">LOGIN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}