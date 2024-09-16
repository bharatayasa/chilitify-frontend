import React, { useState } from 'react';
import NavbarMenu from '../../../components/NavbarMenu';
import Cookies from 'js-cookie';
import api from '../../../service/api.js';
import FoooterUser from '../../../components/FoooterUser.jsx';

const token = Cookies.get('token');

export default function Predict() {
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            alert('Please select a file');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            api.defaults.headers.common['Authorization'] = `${token}`;

            const res = await api.post('/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setResponse(res.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='min-h-screen'>
                <div>
                    <NavbarMenu />
                </div>

                <div className='text-center font-semibold text-2xl mb-5'>
                    <h1>Predict</h1>
                </div>

                <div className='flex justify-center'>
                    <form className='px-5 py-5 bg-primary/10 rounded-lg shadow-lg mx-5' onSubmit={handleSubmit}>
                        <div className='mb-5'>
                            <input type="file" className="file-input file-input-bordered file-input-primary w-full h-20 max-w-xl" onChange={handleFileChange} />
                        </div>

                        <div className='flex justify-center'>
                            <button className='btn btn-primary' type="submit" disabled={loading}>
                                {loading ? 'Predicting...' : 'Predict'}
                            </button>
                        </div>
                    </form>
                </div>

                {response && (
                    <div>
                        <div className='flex justify-center'>
                            <div className='w-80 h-80 my-5'>
                                <img src={response.image_url} alt="Prediction" className='w-full h-full object-cover shadow-lg rounded-lg' />
                            </div>
                        </div>

                        <div className='flex flex-col gap-5 px-4 md:px-8 lg:px-52'>
                            <div className='text-justify bg-primary/10 rounded-md shadow-lg p-4 flex justify-between mt-5'>
                                <div>
                                    <p><strong className='font-semibold text-primary'>Class:</strong> {response.data.class}</p>
                                    <p><strong className='font-semibold text-primary'>Confidence:</strong> {`${response.confidence} / 1`}</p>
                                    <p><strong className='font-semibold text-primary'>Description:</strong> {response.data.description}</p>
                                </div>
                            </div>
                            <div className='text-justify bg-primary/10 rounded-md shadow-lg p-4'>
                                <p><strong className='font-semibold text-primary'>Prevention:</strong> {response.data.prevention}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div>
                <FoooterUser />
            </div>
        </div>
    );
}
