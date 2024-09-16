import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../service/api.js'
import { Link } from "react-router-dom";
import show from '../../assets/svg/show.svg'
import hide from '../../assets/svg/hode.svg'

export default function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [validation, setValidation] = useState([]);
    const [loginFailed, setLoginFailed] = useState([]);

    const [showPassword, setShowPassword] = useState(false);

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
                if (error.response) {
                    setValidation(error.response.data);
                    setLoginFailed(error.response.data);
                } else {
                    setLoginFailed({ message: "An unexpected error occurred" });
                }
            })
    };

    return (
        <div>
            <div>
                <div>
                    <div className="hero bg-base-200 min-h-screen">
                        <div className="hero-content flex-col lg:flex-row-reverse">

                            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                                {
                                    validation.errors && (
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                            {
                                                validation.errors.map((error, index) => (
                                                    <p className="text-sm" key={index}>{error.path} : {error.msg}</p>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                                {
                                    loginFailed.message && (
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                            <p className="text-sm">
                                                {loginFailed.message}
                                            </p>
                                        </div>
                                    )
                                }

                                <form className="card-body" onSubmit={register}>
                                    <div className="text-xl text-center font-semibold lg:px-[120px] px-28">
                                        <h1>Register</h1>
                                    </div>

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
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input className="input input-bordered" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
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
                                        <button type="submit" className="btn btn-primary">Register</button>
                                    </div>

                                    <div className="mt-10 text-center flex flex-col gap-5">
                                            <div className=""><Link to="/login">Kembali ke halaman login..? <span className="text-sky-600">Login</span></Link></div>
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