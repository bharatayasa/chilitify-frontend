import React from 'react';
import { Link } from 'react-router-dom';

export default function FooterUser({ children }) {
    return (
        <div className=" flex flex-col">
            <main className="flex-grow">
                {children}
            </main>
            <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
                <nav className="grid grid-flow-col gap-4 text-primary font-semibold">
                    <div className="link link-hover">
                        <Link to={'/user/home'}>Home</Link>
                    </div>
                    <div className="link link-hover">
                        <Link to={'/user/predict'}>Predict</Link>
                    </div>
                    <div className="link link-hover">
                        <Link to={'/user/history'}>History</Link>
                    </div>
                    <div className="link link-hover">
                        <Link to={'/user/about'}>About</Link>
                    </div>
                </nav>
                <div className=''>
                    <p className='text-center w-96'>
                        Cegah kerusakan tanaman cabai Anda! Unggah foto dan prediksi penyakitnya sekarang untuk hasil panen yang lebih sehat.
                    </p>
                </div>

                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by <strong>Nisa Agni Afifah</strong></p>
                </aside>
            </footer>
        </div>
    );
}
