import React from 'react'
import arsitektur from '.././../../assets/cloud/cloud arsitektur.png'

export default function Deployment() {
    return (
        <div id='#deployment' className='-mt-20'>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row gap-20">
                    <div>
                        <img src={arsitektur} className="max-w-sm rounded-lg shadow-2xl" />
                    </div>
                    <div className='flex flex-col gap-2 w-[50%]'>

                        <div className="collapse collapse-arrow bg-base-200">
                            <input type="radio" name="my-accordion-2" defaultChecked />
                            <div className="collapse-title text-xl font-medium">Cloud Run</div>
                            <div className="collapse-content">
                                <p className='text-justify'>
                                Cloud Run adalah layanan di Google Cloud Platform (GCP) yang memungkinkan Anda menjalankan aplikasi berbasis container secara otomatis dan terkelola penuh. Aplikasi yang di-deploy pada Cloud Run dapat diskalakan secara otomatis berdasarkan lalu lintas, tanpa perlu mengelola server. Layanan ini mendukung berbagai bahasa pemrograman dan framework, serta dapat diintegrasikan dengan layanan lain di GCP, seperti Cloud Storage dan Firestore. Cloud Run dirancang agar mudah digunakan, mendukung deployment cepat, dan hanya menagih sesuai penggunaan (pay-per-use).
                                </p>
                            </div>
                        </div>

                        <div className="collapse collapse-arrow bg-base-200">
                            <input type="radio" name="my-accordion-2" defaultChecked />
                            <div className="collapse-title text-xl font-medium">Bucket</div>
                            <div className="collapse-content">
                                <p className='text-justify'>
                                Google Cloud Storage adalah layanan penyimpanan objek di Google Cloud Platform (GCP) yang memungkinkan Anda menyimpan dan mengelola data dalam skala besar. Layanan ini mendukung berbagai jenis data, seperti file, gambar, dan video, dengan keamanan yang tinggi dan akses global. Cloud Storage dirancang untuk keandalan, memungkinkan pengguna menyimpan data dengan biaya rendah dan menyediakan fitur seperti versioning, enkripsi, dan kontrol akses. Anda dapat menggunakan Cloud Storage untuk backup, pengarsipan, dan hosting konten statis, serta integrasi dengan layanan lain di GCP.
                                </p>
                            </div>
                        </div>

                        <div className="collapse collapse-arrow bg-base-200">
                            <input type="radio" name="my-accordion-2" defaultChecked />
                            <div className="collapse-title text-xl font-medium">Cloud Sql</div>
                            <div className="collapse-content">
                                <p className='text-justify'>
                                Google Cloud SQL adalah layanan database terkelola di Google Cloud Platform (GCP) yang mendukung database relasional seperti MySQL, PostgreSQL, dan SQL Server. Cloud SQL memungkinkan pengguna untuk dengan mudah membuat, mengelola, dan menskalakan database tanpa perlu mengelola infrastruktur server. Layanan ini menawarkan fitur seperti backup otomatis, pemulihan, replikasi, enkripsi, dan keamanan yang tinggi. Cloud SQL cocok untuk aplikasi berbasis data seperti website, aplikasi bisnis, atau sistem manajemen data, serta terintegrasi dengan berbagai layanan lain di GCP.
                                </p>
                            </div>
                        </div>

                        <div className="collapse collapse-arrow bg-base-200">
                            <input type="radio" name="my-accordion-2" defaultChecked />
                            <div className="collapse-title text-xl font-medium">Container Registry</div>
                            <div className="collapse-content">
                                <p className='text-justify'>
                                Google Container Registry (GCR) adalah layanan di Google Cloud Platform (GCP) yang digunakan untuk menyimpan, mengelola, dan mengamankan image container Docker. Layanan ini memungkinkan pengembang untuk meng-host image container secara privat, melakukan deploy ke layanan seperti Google Kubernetes Engine (GKE) atau Cloud Run, serta menyediakan kontrol akses yang terintegrasi dengan Google Cloud IAM. Container Registry mendukung pengelolaan image container dengan mudah, termasuk otomatisasi build, scanning keamanan, dan logging aktivitas.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
