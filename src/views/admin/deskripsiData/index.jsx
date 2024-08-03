import SidebarMenu from '../../../components/SideBarMenu.jsx';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../../../service/api.js';

export default function DeskripsiData() {
    const [descriptions, setDescriptions] = useState([]);
    const [filteredDescriptions, setFilteredDescriptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState('calss');
    const [currentPage, setCurrentPage] = useState(1);
    const descriptionsPerPage = 10;

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

    useEffect(() => {
        setFilteredDescriptions(descriptions.filter(description =>
            description[searchCategory]?.toLowerCase().includes(searchTerm.toLowerCase())
        ));
        setCurrentPage(1);
    }, [searchTerm, searchCategory, descriptions]);

    const indexOfLastDescription = currentPage * descriptionsPerPage;
    const indexOfFirstDescription = indexOfLastDescription - descriptionsPerPage;
    const currentDescriptions = filteredDescriptions.slice(indexOfFirstDescription, indexOfLastDescription);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredDescriptions.length / descriptionsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

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
                        <div className="mb-4 pt-2 join">
                            <select
                                id="searchCategory"
                                value={searchCategory}
                                onChange={(e) => setSearchCategory(e.target.value)}
                                className="input input-bordered join-item mr-1 shadow-lg"
                            >
                                <option value="calss">class</option>
                                <option value="description">description</option>
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
                                    <th className="font-semibold text-lg">no</th>
                                    <th className="font-semibold text-lg">id</th>
                                    <th className="font-semibold text-lg">class</th>
                                    <th className="font-semibold text-lg text-center">description</th>
                                    <th className="font-semibold text-lg text-center">prevention</th>
                                    <th className="font-semibold text-lg text-center">deleted at</th>
                                    <th className="font-semibold text-lg text-center">aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentDescriptions.length > 0
                                        ? currentDescriptions.map((description, index) => (
                                            <tr key={description.id} className="hover transition duration-200">
                                                <td className="px-5 py-3 truncate">{indexOfFirstDescription + index + 1}</td>
                                                <td className="px-5 py-3 truncate">{description.id}</td>
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

                                                <td className="px-5 py-3 truncate text-secondary/50">{description.deleted_at}</td>

                                                <td className='px-5 py-3 truncat'>
                                                    <div className=''>
                                                        <div className='flex flex-col gap-2'>
                                                            <button className="btn btn-outline btn-primary">Edit</button>
                                                            <button className="btn btn-outline btn-secondary">Nonaktif</button>
                                                            <button className="btn btn-outline btn-success">Restore</button>
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
                    <div className='text-lg mt-5'>
                        <div className="flex gap-2 justify-center">
                            <div className='btn btn-outline btn-success'>
                                <button onClick={handlePrevPage} disabled={currentPage === 1}>Sebelumnya</button>
                            </div>
                            <div className='btn btn-outline btn-success'>
                                <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(filteredDescriptions.length / descriptionsPerPage)}>Berikutnya</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
