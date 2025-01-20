import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import Poster from '@/components/Poster';
import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'motion/react'

function index({ loading, programs }) {
    const [activeIndex, setActiveIndex] = useState(0);
    if (!programs) {
        return <div>No data available</div>;
    }

    return (
        <section>
            <div className="h-[80vh] flex justify-center items-center p-4">
                {loading ? (
                    <Swiper
                        centeredSlides={true}
                        autoplay={{
                            delay: 10000,
                            disableOnInteraction: false,
                        }}
                        slidesPerView={3}
                        spaceBetween={10}
                        loop={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        // pagination={{
                        //     clickable: true,
                        //     dynamicMainBullets: true,
                        // }}
                        className="h-full w-full"
                    >
                        {[...Array(5)].map((_, index) => (
                            <SwiperSlide
                                key={index}
                                className={`flex items-center justify-center h-full transition-transform duration-500 `}
                            >
                                <div className="h-full flex items-center justify-center overflow-hidden min-w-[280px] min-h-[300px] bg-slate-200 animate-pulse text-center"></div>
                            </SwiperSlide>
                        ))}

                    </Swiper>
                ) : (
                    // <motion.div
                    //     initial={{ opacity: 0 }}
                    //     animate={{ opacity: 1 }}
                    //     exit={{ opacity: 0 }}
                    //     transition={{ duration: 0.4 }}
                    // >

                    <Swiper
                        centeredSlides={true}
                        autoplay={{
                            delay: 10000,
                            disableOnInteraction: false,
                        }}
                        slidesPerView={3}
                        spaceBetween={10}
                        loop={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        pagination={{
                            clickable: true,
                            dynamicMainBullets: true,
                        }}
                        className="h-full w-full"
                    >
                        {programs.map((poster, index) => (
                            <SwiperSlide
                                key={index}
                                className={`flex items-center justify-center h-full transition-transform duration-500 `}
                            >
                                <div className="h-full flex items-center justify-center overflow-hidden">
                                    <Poster data={poster} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    // </motion.div>
                )}
            </div>

        </section>
    )
}

export default index
