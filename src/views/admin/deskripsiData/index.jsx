import SidebarMenu from '../../../components/SideBarMenu.jsx';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../../../service/api.js';
import CreateDeskripsi from './CreateDeskripsi.jsx';
import EditDeskripsi from './EditDeskripsi.jsx';

export default function DeskripsiData() {
    const [descriptions, setDescriptions] = useState([]);
    const [filteredDescriptions, setFilteredDescriptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState('calss');
    const [currentPage, setCurrentPage] = useState(1);
    const descriptionsPerPage = 10;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedDescId, setSelectedDescId] = useState(null);

    const openModal = () => setIsModalOpen(true);

    const fetchDataDescription = async () => {
        const token = Cookies.get('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = `${token}`;
            try {
                const response = await api.get('/description');
                setDescriptions(response.data.data);
                setFilteredDescriptions(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the description!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    };

    useEffect(() => {
        fetchDataDescription();
    }, []);

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedDescId(null);
        fetchDataDescription();
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        fetchDataDescription();
    };

    const handleEditClick = (descId) => {
        setSelectedDescId(descId);
        setIsEditModalOpen(true);
    };

    useEffect(() => {
        setFilteredDescriptions(descriptions.filter(description =>
            description[searchCategory]?.toLowerCase().includes(searchTerm.toLowerCase())
        ));
        setCurrentPage(1);
    }, [searchTerm, searchCategory, descriptions]);

    const indexOfLastDescription = currentPage * descriptionsPerPage;
    const indexOfFirstDescription = indexOfLastDescription - descriptionsPerPage;
    const currentDescriptions = filteredDescriptions.slice(indexOfFirstDescription, indexOfLastDescription);

    const deleteDescription = async (id) => {
        const token = Cookies.get('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = token;

            try {
                await api.delete(`/description/${id}`);
                fetchDataDescription();
            } catch (error) {
                console.error("There was an error deleting the description!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    }


    const restoreDescription = async (id) => {
        const token = Cookies.get('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = token;

            try {
                await api.put(`/description/restore/${id}`);
                fetchDataDescription();
            } catch (error) {
                console.error("There was an error restoring the description!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    }

    return (
        <div>
            <div className='lg:flex'>
                <div>
                    <SidebarMenu />
                </div>
                <div className="flex-1 ml-80 p-6 overflow-auto">
                    <h1 className="text-2xl font-bold text-center">
                        Kelola Data Deskripsi
                    </h1>

                    <div>
                        <div className='btn btn-outline btn-success shadow-lg w-[170px]'>
                            <div onClick={openModal}>
                                Tambah Deskripsi
                            </div>
                        </div>
                        <CreateDeskripsi isOpen={isModalOpen} onClose={handleModalClose}/>
                    </div>

                    <div>
                        <div className="mb-4 pt-2 join">
                            <select
                                id="searchCategory"
                                value={searchCategory}
                                onChange={(e) => setSearchCategory(e.target.value)}
                                className="input input-bordered join-item mr-1 shadow-lg">
                                <option value="calss">Class</option>
                                <option value="description">Description</option>
                            </select>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={`Cari berdasarkan ${searchCategory}`}
                                className="btn bg-slate-600/15 join-item rounded-r-md w-full shadow-lg"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto bg-slate-600/15 rounded-lg shadow-lg">
                        <table className="min-w-full rounded-lg table">
                            <thead>
                                <tr>
                                    <th className="font-semibold text-lg">No</th>
                                    <th className="font-semibold text-lg">Class</th>
                                    <th className="font-semibold text-lg text-center">Description</th>
                                    <th className="font-semibold text-lg text-center">Prevention</th>
                                    <th className="font-semibold text-lg text-center">Date</th>
                                    <th className="font-semibold text-lg text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentDescriptions.length > 0
                                        ? currentDescriptions.map((description, index) => (
                                            <tr key={description.id} className="hover transition duration-200">
                                                <td className="px-5 py-3 truncate">{indexOfFirstDescription + index + 1}</td>

                                                <td className="px-5 py-3 truncate font-bold">{description.calss}</td>

                                                <td className="px-5 py-3 truncate ">
                                                    <div className="whitespace-normal text-justify text-pretty">
                                                        {description.description}
                                                    </div>
                                                </td>

                                                <td className="px-5 py-3 truncate">
                                                    <div className="whitespace-normal text-justify text-pretty">
                                                        {description.prevention}
                                                    </div>
                                                </td>

                                                <td className="px-5 py-3 truncate">
                                                    <div className='flex gap-2 text-success'>
                                                        <p>Created: </p>{description.created_at}
                                                    </div>
                                                    <div className='flex gap-2 text-primary'>
                                                        <p>Updated: </p>{description.updated_at}
                                                    </div>
                                                    <div className='flex gap-2 text-secondary'>
                                                        <p>Nonaktif: </p>{description.deleted_at}
                                                    </div>
                                                </td>

                                                <td className='px-5 py-3 truncat'>
                                                    <div className=''>
                                                        <div className='flex flex-col gap-2'>
                                                            <button onClick={() => restoreDescription(description.id)} className="btn btn-outline btn-success">Restore</button>
                                                            <button onClick={() => handleEditClick(description.id)} className="btn btn-outline btn-primary">Edit</button>
                                                            <button onClick={() => {
                                                                if (window.confirm("Apakah Anda yakin ingin menonaktifkan deskripsi ini?")) {
                                                                    deleteDescription(description.id);
                                                                }
                                                            }} className="btn btn-outline btn-secondary">Nonaktif</button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                        : <tr>
                                            <td colSpan="6" className="px-6 py-4 text-center text-red-500 flex gap-5">
                                                <p>
                                                    Data Belum Tersedia!
                                                </p>
                                                <span className="loading loading-spinner"></span>
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isEditModalOpen && (
                <EditDeskripsi 
                    isOpen={isEditModalOpen} 
                    onClose={handleCloseEditModal}
                    descId={selectedDescId}
                />
            )}
        </div>
    );
}
