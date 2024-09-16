import NavbarMenu from '../../../components/NavbarMenu';
import FooterUser from '../../../components/FoooterUser';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <div>
                <div className='-mb-24'>
                    <NavbarMenu />
                </div>

                <div>
                    <div className="hero lg:min-h-screen mt-20 lg:-mt-20">
                        <div className="hero-content flex-col lg:flex-row">
                            <div>
                                <h1 className="text-5xl font-bold text-center">Welcome To Chillitify</h1>
                                <h3 className='py-3 text-left text-xl font-semibold lg:mt-20'>
                                    Solusi Mudah Untuk Mendeteksi Penyakit Cabai
                                </h3>
                                <p className="text-justify">
                                    Cegah kerusakan tanaman cabai Anda! Unggah foto dan prediksi penyakitnya sekarang untuk mencegah penyebaran dan memastikan hasil panen yang lebih sehat. Dapatkan solusi cepat dan mudah untuk menjaga kualitas tanaman Anda!
                                </p>
                                <div className='flex justify-center gap-5 mt-20'>
                                    <div>
                                        <Link to={'/user/predict'} className="btn btn-primary">Prediksi Sekarang</Link>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <img src="https://storage.googleapis.com/image_chillitify/web-asset/cabai.jpeg" className="max-w-xs lg:max-w-sm rounded-lg shadow-2xl" />
                            </div>
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