import React from 'react'
import { Link } from 'react-router-dom'

function Banner() {
    return (
        <div className='lg:-mt-20'>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className='w-full h-full mt-20'>
                        <img src="https://storage.googleapis.com/image_chillitify/web-asset/ML-cabai.jpeg" className='w-full h-full object-cover shadow-lg rounded-lg' />
                    </div>

                    <div>
                        <div>
                            <h1 className="lg:text-5xl text-2xl font-bold text-center">Chilitify Web App</h1>
                        </div>
                        <p className="py-6 text-justify">
                            Chillitify adalah web app yang memanfaatkan Machine Learning untuk memprediksi penyakit pada tanaman cabai. Pengguna dapat mengunggah foto daun cabai, dan sistem akan menganalisis serta mengidentifikasi penyakitnya, membantu petani menangani masalah secara cepat.
                        </p>
                        <div className='flex gap-5 justify-center'>
                            <button className="btn btn-primary w-28"><Link to={'/login'}>Login</Link></button>
                            <button className="btn btn-primary w-28"><Link to={'/register'}>Register</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner