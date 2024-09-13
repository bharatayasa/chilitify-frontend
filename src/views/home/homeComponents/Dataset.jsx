import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation, Mousewheel, Keyboard } from 'swiper/modules';
import image1 from '../../../assets/img/yellowish.jpg'
import image2 from '../../../assets/img/whitefly.jpg'
import image3 from '../../../assets/img/no_detect.jpg'
import image4 from '../../../assets/img/leaf_curl.jpg'
import image5 from '../../../assets/img/leaf_spot.jpg'

function Dataset() {
    return (
        <div className='lg:flex lg:mx-auto lg:container'>
            <div className="min-h-screen">
                <div className="hero-content flex lg:flex-row flex-col gap-10">

                    <div className='lg:w-[50%] w-[100%] lg:mt-20 lg:flex-row-reverse'>
                        <Swiper
                            effect={'coverflow'} 
                            grabCursor={true}
                            centeredSlides={true} 
                            slidesPerView={'auto'} 
                            coverflowEffect={{ rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true,}} 
                            pagination={true} 
                            navigation={true}
                            mousewheel={false}
                            keyboard={true}
                            modules={[EffectCoverflow, Pagination, Navigation, Mousewheel, Keyboard]} 
                            className="mySwiper">
                                <div>

                                    <SwiperSlide className='rounded-lg shadow-lg bg-primary/15 backdrop-blur-md'>
                                        <div className='flex'>
                                            <div className='w-80 h-52 mt-10 mx-10'>
                                                <img src={image1} className='w-full h-full object-cover shadow-lg rounded-lg'/>
                                            </div>
                                        </div>
                                        <p className='text-center mt-3'>
                                            yellowish
                                        </p>
                                    </SwiperSlide>

                                    <SwiperSlide className='rounded-lg shadow-lg bg-primary/15 backdrop-blur-md'>
                                        <div className='flex'>
                                            <div className='w-80 h-52 mt-10 mx-10'>
                                                <img src={image2} className='w-full h-full object-cover shadow-lg rounded-lg'/>
                                            </div>
                                        </div>
                                        <p className='text-center mt-3'>
                                            whitefly
                                        </p>
                                    </SwiperSlide>

                                    <SwiperSlide className='rounded-lg shadow-lg bg-primary/15 backdrop-blur-md'>
                                        <div className='flex'>
                                            <div className='w-80 h-52 mt-10 mx-10'>
                                                <img src={image3} className='w-full h-full object-cover shadow-lg rounded-lg'/>
                                            </div>
                                        </div>
                                        <p className='text-center mt-3'>
                                            healthy
                                        </p>
                                    </SwiperSlide>

                                    <SwiperSlide className='rounded-lg shadow-lg bg-primary/15 backdrop-blur-md'>
                                        <div className='flex'>
                                            <div className='w-80 h-52 mt-10 mx-10'>
                                                <img src={image4} className='w-full h-full object-cover shadow-lg rounded-lg'/>
                                            </div>
                                        </div>
                                        <p className='text-center mt-3'>
                                            leaf curl
                                        </p>
                                    </SwiperSlide>

                                    <SwiperSlide className='rounded-lg shadow-lg bg-primary/15 backdrop-blur-md'>
                                        <div className='flex'>
                                            <div className='w-80 h-52 mt-10 mx-10'>
                                                <img src={image5} className='w-full h-full object-cover shadow-lg rounded-lg'/>
                                            </div>
                                        </div>
                                        <p className='text-center mt-3'>
                                            leaf spot
                                        </p>
                                    </SwiperSlide>

                                </div>
                        </Swiper>
                    </div>

                    <div>
                        <h1 className="text-5xl font-bold text-center">dataset</h1>
                        <p className="py-6 text-justify">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dataset