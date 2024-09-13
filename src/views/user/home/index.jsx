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
                            <img
                                src="https://storage.googleapis.com/image_chillitify/web-asset/cabai.jpeg"
                                className="max-w-xs lg:max-w-sm rounded-lg shadow-2xl" />
                            <div>
                                <h1 className="text-5xl font-bold">Welcome To Chillitify</h1>
                                <p className="py-6">
                                    Cegah kerusakan tanaman cabai Anda! Unggah foto dan prediksi penyakitnya sekarang untuk hasil panen yang lebih sehat.
                                </p>
                                <div className='flex justify-center gap-5'>
                                    <div>
                                        <Link to={'/user/predict'} className="btn btn-primary">Predict</Link>
                                    </div>
                                </div>
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