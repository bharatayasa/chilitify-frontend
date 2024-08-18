import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../service/api.js'
import { Link } from "react-router-dom";
import NavbarLandingPage from "../../components/NavbarLandingPage.jsx";

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
                    <div className="hero bg-base-200 min-h-screen">
                        <div className="hero-content flex-col lg:flex-row-reverse">
                            <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold">Register now!</h1>
                            <p className="py-6">
                                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                                quasi. In deleniti eaque aut repudiandae et a id nisi.
                            </p>
                            <div className="flex justify-center gap-5">
                                <button className="btn btn-primary"><Link to="/login">Login</Link></button>
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

                            <form className="card-body" onSubmit={register}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Username</span>
                                    </label>
                                    <input className="input input-bordered" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input className="input input-bordered" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                                </div>
                                
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">E-Mail</span>
                                    </label>
                                    <input className="input input-bordered" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-Mail" />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input className="input input-bordered" type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                                </div>

                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-primary">Register</button>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}