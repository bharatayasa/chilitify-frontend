import SidebarMenu from '../../../components/SideBarMenu';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import ChartTotalClass from './ChartTotalClass';
import TotalData from './TotalData';
import TotalPredictNow from './totalPredictNow';

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
                        <div className='flex flex-col items-center'>
                            <div className='bg-slate-600/15 flex align-middle mt-2 rounded-xl shadow-xl'>
                                <div className='my-2 mx-2'>
                                    <TotalData />
                                </div>
                            </div>
                            <div className='flex flex-row gap-5 mt-5'>
                                <div className='bg-slate-600/15 shadow-xl rounded-xl w-[500px]'>
                                    <ChartTotalClass />
                                </div>
                                <div className='bg-slate-600/15 shadow-xl rounded-xl w-[500px]'>
                                    <TotalPredictNow />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
