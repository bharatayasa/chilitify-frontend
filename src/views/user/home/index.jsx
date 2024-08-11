import NavbarMenu from '../../../components/NavbarMenu';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import FooterUser from '../../../components/FoooterUser';

export default function Home() {
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
                <div>
                    <FooterUser />
                </div>
            </div>
        </div>
    )
}