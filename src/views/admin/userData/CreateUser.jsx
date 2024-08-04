import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../service/api.js';

const token = Cookies.get('token');

export default function CreateUser({ isOpen, onClose }) {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [validation, setValidation] = useState([]);

    const storeUser = async (e) => {
        e.preventDefault();

        api.defaults.headers.common['Authorization'] = token;

        try {
            await api.post('/user', {
                username: username,
                name: name,
                email: email,
                password: password,
                role: role
            });
            
            setUsername('');
            setName('');
            setEmail('');
            setPassword('');
            setRole('');

            onClose();
            navigate('/admin/users');
        } catch (error) {
            setValidation(error.response.data);
        }
    }

    return (
        isOpen ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-50 backdrop-blur-sm z-50">
                <div className="bg-slate-600/35 backdrop-blur-lg p-8 rounded-lg shadow-lg shadow-slate-600/25 max-w-md w-full">
                    <button className="absolute top-5 right-5 text-gray-500 hover:text-gray-700" onClick={onClose}>
                        ✕
                    </button>
                    <h3 className="text-lg font-bold mb-4 text-center">Tambahkan User</h3>
                    {validation.errors && (
                        <div className="mb-4 text-red-500">
                            {validation.errors.map((error, index) => (
                                <p key={index}>{error.path} : {error.msg}</p>
                            ))}
                        </div>
                    )}
                    <form onSubmit={storeUser}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                className="input mt-1 block w-full border focus:border-primary rounded-lg shadow-sm"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium700">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                className="input mt-1 block w-full border focus:border-primary rounded-lg shadow-sm"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium700">E-mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="E-mail"
                                className="input mt-1 block w-full border focus:border-primary rounded-lg shadow-sm"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="input mt-1 block w-full border focus:border-primary rounded-lg shadow-sm"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <div className="flex gap-10 justify-center">
                                <div className="flex items-center">
                                    <input
                                        id="role-admin"
                                        type="radio"
                                        name="role"
                                        value="admin"
                                        checked={role === 'admin'}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="radio radio-primary"
                                        required
                                    />
                                    <label htmlFor="role-admin" className="ml-2 block text-lg">Admin</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="role-user"
                                        type="radio"
                                        name="role"
                                        value="user"
                                        checked={role === 'user'}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="radio radio-primary"
                                        required
                                    />
                                    <label htmlFor="role-user" className="ml-2 block text-lg">User</label>
                                </div>
                            </div>
                        </div>

                        <div className='text-center'>
                            <button
                                type="submit"
                                className="btn btn-primary btn-outline">
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        ) : null
    );
}
