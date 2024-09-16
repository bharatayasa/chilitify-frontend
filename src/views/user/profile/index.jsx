import React, { useState, useEffect } from 'react';
import NavbarMenu from '../../../components/NavbarMenu';
import Cookies from 'js-cookie';
import api from '../../../service/api';
import { Link } from 'react-router-dom';

export default function Index() {
    const [getMe, setGetMe] = useState([]);

    const fetchMyData = async () => {
        const token = Cookies.get('token');
        api.defaults.headers.common['Authorization'] = token;

        if (token) {
            try {
                const response = await api.get('/get/me');
                setGetMe(response.data.data);
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

    return (
        <div>
            <div>
                <NavbarMenu />
            </div>

            <div className='min-h-screen mt-20'>
                <div>
                    {getMe.length > 0 ? (
                        <div className='flex items-center justify-center'>
                            <form className='flex flex-col bg-primary/25 px-5 py-5 rounded-xl'>
                                <div className='text-center font-semibold text-2xl'>
                                    <h1>My Profile</h1>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Username</span>
                                    </label>
                                    <input className="input input-bordered" type="text" value={getMe[0].username} readOnly/>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input className="input input-bordered" type="text" value={getMe[0].name} readOnly/>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input className="input input-bordered" type="text" value={getMe[0].email} readOnly/>
                                </div>

                                <div className=' flex gap-5 mt-10'>
                                    <div className='btn btn-primary'><Link to={'/user/edit/profile'}>Edit Biodata</Link></div>
                                    <div className='btn btn-accent'><Link to={'/user/edit/password'}>Edit Password</Link></div>
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
