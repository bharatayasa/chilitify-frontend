import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../service/api.js';

const token = Cookies.get('token');

export default function CreateDeskripsi({ isOpen, onClose }) {
    const navigate = useNavigate();

    const [clas, setClass] = useState('');
    const [description, setDescription] = useState('');
    const [prevention, setPrevention] = useState('');
    
    const [validation, setValidation] = useState([]);

    const storeDescription = async (e) => {
        e.preventDefault();

        api.defaults.headers.common['Authorization'] = token;

        try {
            await api.post('/description', {
                clas: clas,
                description: description,
                prevention: prevention,
            });
            
            setClass('');
            setDescription('');
            setPrevention('');

            onClose();
            navigate('/admin/deskripsi');
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
                    <h3 className="text-lg font-bold mb-4 text-center">Tambahkan Deskripsi</h3>
                    {validation.errors && (
                        <div className="mb-4 text-red-500">
                            {validation.errors.map((error, index) => (
                                <p key={index}>{error.path} : {error.msg}</p>
                            ))}
                        </div>
                    )}
                    <form onSubmit={storeDescription}>

                        <div className="mb-4">
                            <label className="block text-sm font-medium">Class</label>
                            <input
                                type="text"
                                value={clas}
                                onChange={(e) => setClass(e.target.value)}
                                placeholder="Class"
                                className="input mt-1 block w-full border focus:border-primary rounded-lg shadow-sm"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium">Description</label>
                            <textarea 
                                className="textarea mt-1 w-full border focus:border-primary rounded-lg shadow-sm" 
                                placeholder="Description"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium">Prevention</label>
                            <textarea 
                                className="textarea mt-1 w-full border focus:border-primary rounded-lg shadow-sm" 
                                placeholder="Prevention"
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
