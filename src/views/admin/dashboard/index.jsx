import SidebarMenu from '../../../components/SideBarMenu';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'

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
                <div className="flex-1 ml-80 p-6 overflow-auto bg-white rounded-lg">
                    <div>
                        <div>
                            DASHBOARD NYUSUL YA YANG
                        </div>
                        <div>
                            Selamat Datang, <strong>{username?.username}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
