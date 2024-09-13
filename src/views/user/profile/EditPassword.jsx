import React, { useState, useEffect } from 'react';
import NavbarMenu from '../../../components/NavbarMenu';
import Cookies from 'js-cookie';
import api from '../../../service/api';
import { Link, useNavigate } from 'react-router-dom';
import show from '../../../assets/svg/show.svg'
import hide from '../../../assets/svg/hode.svg'

export default function EditPassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    const navigate = useNavigate();

    const updateBiodata = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token');
        api.defaults.headers.common['Authorization'] = token;

        try {
            await api.post(`/update/me/password`, {
                currentPassword: currentPassword,
                newPassword: newPassword,
            });
            navigate('/user/profile');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div>
                <NavbarMenu />
            </div>

            <div className='min-h-screen mt-20'>
                <div>
                        <div className='flex items-center justify-center'>
                            <form className='flex flex-col bg-primary/25 px-5 py-5 rounded-xl' onSubmit={updateBiodata}>
                                <div className='text-center font-semibold text-2xl px-20'>
                                    <h1>Edit Password</h1>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password Lama</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="input input-bordered w-full"
                                            type={showPassword ? "text" : "password"}
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            placeholder="Masukkan Password Lama"
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

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password Baru</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="input input-bordered w-full"
                                            type={showPassword1 ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Masukkan Password Baru"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword1(!showPassword1)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs"
                                        >
                                            {showPassword1 ? 
                                                <img src={hide} alt="" className="w-5" /> :
                                                <img src={show} alt="" className="w-5" />
                                            }
                                        </button>
                                    </div>
                                </div>

                                <div className='flex mt-10 justify-center gap-10'>
                                    <Link to='/user/profile' className='btn btn-primary'>Batal</Link>
                                    <button className='btn btn-accent' type="submit" >Simpan</button>
                                </div>
                            </form>
                        </div>
                </div>
            </div>
        </div>
    );
}
