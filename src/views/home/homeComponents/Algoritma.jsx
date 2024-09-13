import React from 'react'

export default function Algoritma() {
    return (
        <div className='lg:-mt-20'>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className='mt-20'>
                        <img
                            src="https://storage.cloud.google.com/image_chillitify/web-asset/cabai2.jpeg"
                            className="max-w-xs lg:max-w-sm rounded-lg shadow-2xl" />
                    </div>
                    <div>
                        <h1 className="text-5xl font-bold text-center pb-5">Algoritma CNN</h1>
                        <h1 className="text-2xl font-bold">Arsitektur Densenet</h1>
                        <p className="pb-6 text-justify">
                        DenseNet (Densely Connected Convolutional Networks) adalah arsitektur CNN yang menghubungkan setiap layer ke semua layer sebelumnya. Alih-alih layer hanya menerima input dari layer sebelumnya, setiap layer menerima input dari semua layer sebelumnya, yang membuatnya lebih efisien dalam penggunaan fitur. Ini membantu mengurangi masalah vanishing gradient dan meningkatkan pemanfaatan kembali fitur, membuat DenseNet lebih efisien dan mudah dilatih dibandingkan arsitektur tradisional.
                        </p>
                        <h1 className="text-2xl font-bold">Confidence</h1>
                        <p className="pb-6 text-justify">
                        Confidence dalam prediksi penyakit menggunakan CNN adalah tingkat keyakinan model terhadap hasil prediksinya. Model memberikan probabilitas untuk setiap penyakit, menunjukkan seberapa yakin model bahwa prediksi tersebut benar. Confidence tinggi berarti model sangat yakin dengan prediksinya, sementara confidence rendah menunjukkan ketidakpastian.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
