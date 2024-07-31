import SidebarMenu from '../../../components/SideBarMenu.jsx';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../service/api.js';
import Modal from './CreateUser.jsx';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState('username');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const usersPerPage = 10;

    const openModal = () => setIsModalOpen(true);

    const fetchDataUsers = async () => {
        const token = Cookies.get('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = `${token}`;
            try {
                const response = await api.get('/user');
                setUsers(response.data.data);
                setFilteredUsers(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the users!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    }
    
    const handleModalClose = () => {
        setIsModalOpen(false);
        fetchDataUsers();
    }

    useEffect(() => {
        fetchDataUsers();
    }, []);

    useEffect(() => {
        setFilteredUsers(users.filter(user =>
            user[searchCategory].toLowerCase().includes(searchTerm.toLowerCase())
        ));
        setCurrentPage(1);
    }, [searchTerm, searchCategory, users]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const handleNextPage = () => {
        if (indexOfLastUser < filteredUsers.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="flex h-screen">
            <div>
                <SidebarMenu />
            </div>

            <div className="flex-1 ml-80 p-6 overflow-auto">
                <h1 className="text-2xl font-bold text-center">
                    Kelola Data Users
                </h1>

                <div>
                    <div className='btn btn-outline btn-success shadow-lg w-[106px]'>
                        <div onClick={openModal}>
                            Add User
                        </div>
                    </div>
                    <Modal isOpen={isModalOpen} onClose={handleModalClose} />
                </div>

                <div>
                    <div className="mb-4 pt-2 join">
                        <select
                            id="searchCategory"
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}
                            className="input input-bordered join-item mr-1 shadow-lg"
                        >
                            <option value="username">username</option>
                            <option value="name">name</option>
                            <option value="email">e-mail</option>
                            <option value="role">role</option>
                        </select>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={`Cari berdasarkan ${searchCategory}`}
                            className="btn bg-slate-600/15 join-item rounded-r-md w-full shadow-lg "
                        />
                    </div>
                </div>
                <div className="overflow-x-auto bg-slate-600/15 rounded-lg shadow-lg">
                    <table className="min-w-full rounded-lg table">
                        <thead>
                            <tr>
                                <th className="font-semibold text-lg">no</th>
                                <th className="font-semibold text-lg">id</th>
                                <th className="font-semibold text-lg">username & e-mail</th>
                                <th className="font-semibold text-lg">name</th>
                                <th className="font-semibold text-lg">role</th>
                                <th className="font-semibold text-lg text-center">date</th>
                                <th className="font-semibold text-lg text-center">actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentUsers.length > 0
                                    ? currentUsers.map((user, index) => (
                                        <tr key={user.id} className="hover transition duration-200">
                                            <td className="px-5 py-3 truncate">{indexOfFirstUser + index + 1}</td>
                                            <td className="px-5 py-3 truncate">{user.id}</td>
                                            <td className="px-5 py-3 truncate">
                                                <div className='font-semibold flex gap-2'>
                                                    <p>username: </p>{user.username}
                                                </div>
                                                <div className='flex gap-2 text-slate-400/40'>
                                                    <p>e-mail: </p>{user.email}
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 truncate">{user.name}</td>
                                            <td className="px-5 py-3 truncate font-semibold">{user.role}</td>
                                            <td className="px-5 py-3 truncate">
                                                <div className='flex gap-2 text-success'>
                                                    <p>Created</p>{user.created_at}
                                                </div>
                                                <div className='flex gap-2 text-primary'>
                                                    <p>Updated</p>{user.updated_at}
                                                </div>
                                                <div className='flex gap-2 text-secondary'>
                                                    <p>Deleted</p>{user.deleted_at}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className='flex justify-center gap-3'>
                                                    <Link to={`/admin/user/edit/${user.id}`} className="btn btn-outline btn-primary">Edit</Link>
                                                    <button className="btn btn-outline btn-secondary">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    : <tr>
                                        <td colSpan="7" className="px-6 py-4 text-center text-red-500 flex gap-5">
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
                                    <button onClick={handleNextPage} disabled={indexOfLastUser >= filteredUsers.length}>Berikutnya</button>
                                </div>
                            </div>
                        </div>
            </div>
        </div>
    )
}
