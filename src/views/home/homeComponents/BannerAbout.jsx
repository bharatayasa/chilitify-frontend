import React from 'react'
import { Link } from 'react-router-dom'

function BannerAbout() {
    return (
        <div className='-mt-20'>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className='w-full h-full'>
                        <img src="https://storage.cloud.google.com/image_chillitify/web-asset/ML-cabai.jpeg" className='w-full h-full object-cover shadow-lg rounded-lg' />
                    </div>

                    <div>
                        <div>
                            <h1 className="text-5xl font-bold text-center">Chilitify Web App</h1>
                        </div>
                        <p className="py-6 text-justify">
                            Chillitify adalah web app yang memanfaatkan Machine Learning untuk memprediksi penyakit pada tanaman cabai. Pengguna dapat mengunggah foto daun cabai, dan sistem akan menganalisis serta mengidentifikasi penyakitnya, membantu petani menangani masalah secara cepat.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerAbout