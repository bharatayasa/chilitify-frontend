import React, { useState, useEffect } from 'react';
import NavbarMenu from '../../../components/NavbarMenu';
import FooterUser from '../../../components/FoooterUser.jsx';
import Cookies from 'js-cookie';
import api from '../../../service/api.js';

export default function History() {
    const [history, setHistory] = useState([]);
    const [displayedHistory, setDisplayedHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchDataPredicted = async () => {
        const token = Cookies.get('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `${token}`;
            try {
                const response = await api.get('/history');
                setHistory(response.data.data);
                setLoading(false);
            } catch (error) {
                setError('There was an error fetching the predictions!');
                setLoading(false);
                console.error("Error fetching predictions:", error);
            }
        } else {
            setError('Token is not available!');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataPredicted();
    }, []);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedHistory(history.slice(0, endIndex));
    }, [history, currentPage]);

    const handleNextPage = () => {
        if (history.length > displayedHistory.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const deletePredict = async (id) => {
        const token = Cookies.get('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `${token}`;
            try {
                await api.delete(`/history/${id}`);
                fetchDataPredicted();
            } catch (error) {
                console.error("There was an error deleting history!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    }

    return (
        <div>
            <NavbarMenu />
            <div className='mb-10' data-theme="cupcake">
                <div className='text-center font-semibold text-2xl mb-5'>
                    <h1>History</h1>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-4">
                        <p>Loading...</p>
                    </div>
                )}

                <div>
                    {displayedHistory.map((item, index) => (
                        <div key={index} className='mb-2'>
                            <div className="flex flex-col items-center mx-3 lg:mx-[400px] shadow-lg bg-primary/5 rounded-2xl">
                                <div className='collapse collapse-arrow'>
                                    <input
                                        type="checkbox"
                                        id={`accordion-item-${index}`}
                                        className="peer hidden"
                                    />
                                    <label htmlFor={`accordion-item-${index}`} className='collapse-title bg-primary/10 cursor-pointer shadow-lg'>
                                        <div className='flex justify-between'>
                                            <div>
                                                <p><strong>Class:</strong> {item.class}</p>
                                            </div>
                                            <div className='text-sm'>
                                                <p>{item.created_at}</p>
                                            </div>
                                        </div>
                                    </label>

                                    <div className="collapse-content flex flex-col justify-center items-center">
                                        <div className='w-80 h-80 my-5'>
                                            <img src={item.image_url} alt={`Prediction ${index}`} className='w-full h-full object-cover shadow-lg rounded-lg'/>
                                        </div>

                                        <div className='mb-5'>
                                            <p><strong className='font-semibold text-primary'>Confidence:</strong> {item.confidence}</p>
                                        </div>

                                        <div className='text-justify lg:mx-5 py-5 px-5 bg-primary/10 rounded-md mb-5 shadow-lg'>
                                            <p><strong className='font-semibold text-primary'>Description: </strong>{item.description}</p>
                                        </div>

                                        <div className='text-justify lg:mx-5 py-5 px-5 bg-primary/10 rounded-md mb-5 shadow-lg'>
                                            <p><strong className='font-semibold text-primary'>Prevention:</strong> {item.prevention}</p>
                                        </div>
                                        
                                        <div className='text-center mt-2'>
                                            <button onClick={() => deletePredict(item.id)} className="btn btn-outline btn-secondary">Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className='text-center mt-4'>
                        {history.length > displayedHistory.length && (
                            <button onClick={handleNextPage} className='btn btn-primary'>
                                Lainya
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <FooterUser />
        </div>
    );
}
