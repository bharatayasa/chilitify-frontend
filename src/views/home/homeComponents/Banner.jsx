import React from 'react'

function Banner() {
    return (
        <div className='-mt-20'>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://storage.googleapis.com/image_chillitify/web-asset/bg1_11zon.png)",
                }}>
                <div className="hero-overlay backdrop-blur-sm"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Chillitify Web App</h1>
                    <p className="mb-5 text-justify">
                        Chillitify adalah web app yang memanfaatkan Machine Learning untuk memprediksi penyakit pada tanaman cabai. Pengguna dapat mengunggah foto daun cabai, dan sistem akan menganalisis serta mengidentifikasi penyakitnya, membantu petani menangani masalah secara cepat.
                    </p>
                        <div className='flex gap-5 justify-center'>
                            <button className="btn btn-primary">Login</button>
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner