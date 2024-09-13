import React from 'react'
import { Link } from 'react-router-dom'

function BannerAbout() {
    return (
        <div className='-mt-20'>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://storage.googleapis.com/image_chillitify/web-asset/bg1_11zon.png)",
                }}>
                <div className="hero-overlay backdrop-blur-md"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="">
                    <h1 className="mb-5 text-5xl font-bold">Chillitify Web App</h1>
                    <p className="mb-5 text-justify bg-black/5 backdrop-blur-xl px-5 py-5 rounded-lg shadow-xl text-xl lg:mx-32">
                        Chillitify adalah web app yang memanfaatkan Machine Learning untuk memprediksi penyakit pada tanaman cabai. Pengguna dapat mengunggah foto daun cabai, dan sistem akan menganalisis serta mengidentifikasi penyakitnya, membantu petani menangani masalah secara cepat.
                    </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerAbout