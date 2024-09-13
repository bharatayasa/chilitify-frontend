import React, { useState, useEffect } from 'react';
import NavbarMenu from '../../../components/NavbarMenu';
import Cookies from 'js-cookie';
import api from '../../../service/api';
import { Link, useNavigate } from 'react-router-dom';

export default function EditProfile() {
    const [getMe, setGetMe] = useState([]);

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const fetchMyData = async () => {
        const token = Cookies.get('token');
        api.defaults.headers.common['Authorization'] = token;

        if (token) {
            try {
                const response = await api.get('/get/me');
                const userData = response.data.data[0];
                setGetMe(response.data.data);
                setUsername(userData.username);
                setName(userData.name);
                setEmail(userData.email);
            } catch (error) {
                console.error("There was an error fetching my data", error);
            }
        } else {
            console.error("Token is not available!");
        }
    };

    useEffect(() => {
        fetchMyData();
    }, []);

    const updateBiodata = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token');
        api.defaults.headers.common['Authorization'] = token;

        try {
            await api.post(`/update/me`, {
                username: username,
                name: name, 
                email: email
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
                    {getMe.length > 0 ? (
                        <div className='flex items-center justify-center'>
                            <form className='flex flex-col bg-primary/25 px-5 py-5 rounded-xl' onSubmit={updateBiodata}>
                                <div className='text-center font-semibold text-2xl px-24'>
                                    <h1>My Profile</h1>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Username</span>
                                    </label>
                                    <input className="input input-bordered" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input className="input input-bordered" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input className="input input-bordered" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>

                                <div className='flex mt-10 justify-center gap-10'>
                                    {/* Link langsung, tidak membungkus button */}
                                    <Link to='/user/profile' className='btn btn-primary'>Batal</Link>
                                    <button className='btn btn-accent' type="submit" >Simpan</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className='flex items-center justify-center'>
                            <div className='flex flex-col gap-3 bg-primary/25 px-5 py-5 rounded-xl'>
                                <p>Loading...</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
