import React from 'react';

export default function FooterLandingPage({ children }) {
    return (
        <div className=" flex flex-col">
            <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
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
