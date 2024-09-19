import SidebarMenu from '../../../components/SideBarMenu.jsx';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../../../service/api.js';

export default function HasilDeteksi() {
    const [predictions, setPredictions] = useState([]);
    const [filteredPredictions, setFilteredPredictions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState('class');
    const [currentPage, setCurrentPage] = useState(1);
    const predictionsPerPage = 10;

    const fetchDataPredicted = async () => {
        const token = Cookies.get('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `${token}`;
            try {
                const response = await api.get('/predicted');
                setPredictions(response.data.data);
                setFilteredPredictions(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the predictions!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    };

    useEffect(() => {
        fetchDataPredicted();
    }, []);

    useEffect(() => {
        const filtered = predictions.filter(prediction =>
            prediction[searchCategory]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPredictions(filtered);
        setCurrentPage(1);
    }, [searchTerm, searchCategory, predictions]);

    const indexOfLastPrediction = currentPage * predictionsPerPage;
    const indexOfFirstPrediction = indexOfLastPrediction - predictionsPerPage;
    const currentPredictions = filteredPredictions.slice(indexOfFirstPrediction, indexOfLastPrediction);

    const handleNextPage = () => {
        if (indexOfLastPrediction < filteredPredictions.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const deletePredict = async (id) => {
        const token = Cookies.get('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `${token}`;
            try {
                await api.delete(`/predicted/${id}`);
                fetchDataPredicted();
            } catch (error) {
                console.error("There was an error deleting predict!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    }

    const restorePredict = async (id) => {
        const token = Cookies.get('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `${token}`;
            try {
                await api.put(`/predicted/restore/${id}`);
                fetchDataPredicted();
            } catch (error) {
                console.error("There was an error restoring the predict!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    }

    return (
        <div>
            <div className='lg:flex'>
                <SidebarMenu />
                <div className="flex-1 ml-80 p-6 overflow-auto">
                    <h1 className="text-2xl font-bold text-center">Kelola Data Hasil Prediksi</h1>
                    <div className="mb-4 pt-2 join">
                        <select
                            id="searchCategory"
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}
                            className="input input-bordered join-item mr-1 shadow-lg"
                        >
                            <option value="class">Class</option>
                            <option value="username">Username</option>
                        </select>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={`Cari berdasarkan ${searchCategory}`}
                            className="btn bg-slate-600/15 join-item rounded-r-md w-full shadow-lg"
                        />
                    </div>
                    <div className="overflow-x-auto bg-slate-600/15 rounded-lg shadow-lg">
                        <table className="min-w-full rounded-lg table">
                            <thead>
                                <tr>
                                    <th className="font-semibold text-lg">No</th>
                                    <th className="font-semibold text-lg">ID</th>
                                    <th className="font-semibold text-lg">User</th>
                                    <th className="font-semibold text-lg">Class</th>
                                    <th className="font-semibold text-lg">Confidence</th>
                                    <th className="font-semibold text-lg">Images</th>
                                    <th className="font-semibold text-lg text-center">Date</th> 
                                    <th className="font-semibold text-lg text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentPredictions.length > 0
                                        ? currentPredictions.map((prediction, index) => (
                                            <tr key={prediction.id} className="hover transition duration-200">
                                                <td className="px-5 py-3 truncate">{indexOfFirstPrediction + index + 1}</td>

                                                <td className="px-5 py-3 truncate">{prediction.id}</td>

                                                <td className="px-5 py-3 truncate">
                                                    <div>
                                                        <div className='flex gap-2 text-success'>
                                                            <p>ID User:</p>{prediction.user_id}
                                                        </div>
                                                        <div className='flex gap-2 text-primary'>
                                                            <p>Username:</p>{prediction.username}
                                                        </div>
                                                        <div className='flex gap-2 text-secondary/50'>
                                                            <p>Email:</p>{prediction.email}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-3 truncate font-bold">{prediction.class}</td>

                                                <td className="px-5 py-3 truncate text-pretty">{prediction.confidence}</td>

                                                <td className="px-5 py-3">
                                                    <div className='w-20 h-20 my-5'>
                                                        <img src={prediction.image_url} className='w-full h-full object-cover shadow-lg rounded-lg' />
                                                    </div>
                                                </td>

                                                <td className="px-5 py-3 truncate">
                                                    <div className='text-success flex gap-2'>
                                                        <p>predicted:</p>{prediction.created_at}
                                                    </div>
                                                    <div className='text-secondary flex gap-2'>
                                                        <p>deleted:</p>{prediction.deleted_at}
                                                    </div>
                                                </td>

                                                <td className='px-5 py-3 truncat'>
                                                    <div className='flex justify-center'>
                                                        <div className='flex justify-center gap-2'>
                                                        <button onClick={() => {
                                                            if (window.confirm("Apakah Anda yakin ingin menghapus history ini?")) {
                                                                deletePredict(prediction.id);
                                                            }
                                                        }} className="btn btn-outline btn-secondary">Delete</button>
                                                            <button onClick={() => restorePredict(prediction.id)} className="btn btn-outline btn-success">Restore</button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                        : <tr>
                                            <td colSpan="8" className="px-6 py-4 text-center text-red-500 flex gap-5">
                                                <p>Data Belum Tersedia!</p>
                                                <span className="loading loading-spinner"></span>
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='text-lg mt-5'>
                        <div className="flex gap-2 justify-center">
                            <button onClick={handlePrevPage} disabled={currentPage === 1} className='btn btn-outline btn-success'>
                                Sebelumnya
                            </button>
                            <button onClick={handleNextPage} disabled={indexOfLastPrediction >= filteredPredictions.length} className='btn btn-outline btn-success'>
                                Berikutnya
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
