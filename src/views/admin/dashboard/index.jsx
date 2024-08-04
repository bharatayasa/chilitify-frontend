import SidebarMenu from '../../../components/SideBarMenu';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import ChartTotalClass from './ChartTotalClass';
import TotalData from './TotalData';

export default function Dashboard() {
    const [username, setUsername] = useState([]);
    useEffect(() => {
        const userData = Cookies.get('user');
        
        if (userData) {
            setUsername(JSON.parse(userData));
        }
    }, []);

    return (
        <div>
            <div className='flex'>
                <div>
                    <SidebarMenu />
                </div>
                <div className="flex-1 ml-80 p-6 overflow-auto rounded-lg">
                    <div>
                        <div>
                            <div className='text-center'>
                                <div className='font-semibold text-lg'>
                                    <h1 className="text-2xl font-bold">Dashboard</h1>
                                </div>
                            </div>
                        </div>
                        {/* <div>
                            Selamat Datang, <strong>{username?.username}</strong>
                        </div> */}
                        <div className=''>
                            <div className='w-[500px]'>
                                <div className='mt-10'>
                                    <TotalData />
                                </div>
                            </div>
                            <div className='w-[500px]'>
                                <div className='bg-slate-600/15 shadow-lg rounded-lg'>
                                    <ChartTotalClass />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
