import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import Poster from '@/components/Poster';
import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/autoplay";
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'motion/react'

function index({ loading, programs }) {
    const swiperRef = useRef(null);
    const [swiperReady, setSwiperReady] = useState(false);

    useEffect(() => {
        const checkAndStartAutoplay = () => {
            if (swiperRef.current && swiperRef.current.swiper) {
                const swiperInstance = swiperRef.current.swiper;

                // Start autoplay if not running
                if (!swiperInstance.autoplay.running) {
                    swiperInstance.autoplay.start();
                }

                // Force slide change to trigger motion
                setTimeout(() => {
                    swiperInstance.slideNext();
                }, 2000);
            }
        };

        setTimeout(checkAndStartAutoplay, 1000); // Small delay to ensure Swiper is initialized
    }, [loading]);


    if (!programs) {
        return <div className="flex h-[80vh] justify-center items-center font-semibold text-xl text-black bg-slate-100 animate-pulse">No data available</div>;
    }

    return (
        <section>
            <div className="h-[80vh] flex justify-center items-center p-4">
                <Swiper
                    ref={swiperRef}
                    centeredSlides={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    // autoplay={true}
                    slidesPerView={3}
                    spaceBetween={10}
                    loop={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    pagination={{
                        clickable: true,
                        dynamicMainBullets: true,
                    }}
                    className="h-full w-full"
                    onSwiper={(swiper) => {
                        setTimeout(() => {
                            if (!swiper.autoplay.running) {
                                swiper.autoplay.start();
                            }
                        }, 500);
                    }}
                >
                    {loading ? (

                        [...Array(5)].map((_, index) => (
                            <SwiperSlide
                                key={index}
                                className={`flex items-center justify-center h-full transition-transform duration-500 `}
                            >
                                <div className="h-full flex items-center justify-center mx-auto overflow-hidden min-w-[280px] max-w-[380px] max-h-[500px] min-h-[300px] bg-slate-200 animate-pulse text-center"></div>
                            </SwiperSlide>
                        ))) : (

                        programs.map((poster, index) => (
                            <SwiperSlide
                                key={index}
                                className={`flex items-center justify-center h-full transition-transform duration-500 `}
                            >
                                <div className="h-full flex items-center justify-center overflow-hidden">
                                    <Poster data={poster} />
                                </div>
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
            </div>

        </section>
    )
}

export default index
