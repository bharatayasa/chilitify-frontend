import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../service/api.js'
import { Link } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [validation, setValidation] = useState([]);

    const register = async (e) => {
        e.preventDefault();

        await api.post('/register', {
            username: username,
            name: name,
            email: email,
            password: password,
        })
            .then(() => {
                navigate("/login");
            })
            .catch(error => {
                setValidation(error.response.data);
            })
    };

    return (
        <div>
            <div>
                <div>
                    <div>
                        <div>
                            <h1>REGISTER</h1>
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
                            <form onSubmit={register}>
                                <div>
                                    <div>
                                        <div>
                                            <label>Username</label>
                                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Username" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <div>
                                            <label>Name</label>
                                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Name" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <div>
                                            <label>Email</label>
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <div>
                                            <label>Password</label>
                                            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control"/>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <button type="submit" >REGISTER</button>
                                </div>
                                <div>
                                    <button><Link to="/login">Login</Link></button>
                                    <button><Link to="/">Home</Link></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}