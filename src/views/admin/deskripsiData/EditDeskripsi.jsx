import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../service/api';

const token = Cookies.get('token');

export default function EditDeskripsi({ isOpen, onClose, descId }) {
    const navigate = useNavigate();

    const [clas, setClass] = useState('');
    const [description, setDescription] = useState('');
    const [prevention, setPrevention] = useState('');

    const [validation, setValidation] = useState([]);

    useEffect(() => {
        if (descId) {
            fetchDataDescription(descId);
        }
    }, [descId]);

    const fetchDataDescription = async (descId) => {
        if (!token) return;

        api.defaults.headers.common['Authorization'] = `${token}`;
        try {
            const response = await api.get(`/description/${descId}`);
            const descData = response.data.data[0];
            setClass(descData.class || '');
            setDescription(descData.description || '');
            setPrevention(descData.prevention || '');
        } catch (error) {
            console.error("Error fetching Description data:", error);
        }
    };

    const updateDescription = async (e) => {
        e.preventDefault();

        if (!token) return;

        api.defaults.headers.common['Authorization'] = `${token}`;
        try {
            await api.put(`/description/${descId}`, {
                clas: clas || '',
                description: description || '',
                prevention: prevention || '',
            });

            setClass('');
            setDescription('');
            setPrevention('');

            onClose();
            navigate('/admin/deskripsi');
        } catch (error) {
            setValidation(error.response.data);
        }
    };

    return (
        isOpen ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-50 backdrop-blur-sm z-50">
                <div className="bg-slate-600/35 backdrop-blur-lg p-8 rounded-lg shadow-lg shadow-slate-600/25 max-w-md w-full">
                    <button className="absolute top-5 right-5 text-gray-500 hover:text-gray-700" onClick={onClose}>
                        ✕
                    </button>
                    <h3 className="text-lg font-bold mb-4 text-center">Edit Description</h3>
                    {validation.errors && (
                        <div className="mb-4 text-red-500">
                            {validation.errors.map((error, index) => (
                                <p key={index}>{error.path} : {error.msg}</p>
                            ))}
                        </div>
                    )}
                    <form onSubmit={updateDescription}>

                        <div className="mb-4">
                            <label className="block text-sm font-medium">Class</label>
                            <input
                                type="text"
                                value={clas}
                                onChange={(e) => setClass(e.target.value)}
                                placeholder="CLass"
                                className="input mt-1 block w-full border focus:border-primary rounded-lg shadow-sm"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium">Description</label>
                            <textarea 
                                className="textarea mt-1 w-full h-32 border focus:border-primary rounded-lg shadow-sm" 
                                placeholder="Description"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium">Prevention</label>
                            <textarea 
                                className="textarea mt-1 w-full h-32 border focus:border-primary rounded-lg shadow-sm" 
                                placeholder="Description"
                                onChange={(e) => setPrevention(e.target.value)}
                                value={prevention}
                            />
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
