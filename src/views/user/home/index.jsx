import NavbarMenu from '../../../components/NavbarMenu';
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
            <div>
                <div>
                    <NavbarMenu />
                </div>
                <div>
                    <div>
                        <div>
                            HALAMAN USER
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