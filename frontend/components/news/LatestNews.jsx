'use client'
import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SimpleNewsCard from './item/SimpleNewsCard';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const LatestNews = () => {
    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
    };

    const ButtonGroup = ({ next, previous }) => (
        <div className="flex justify-between items-center py-3 bg-white px-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <span className="w-2 h-6 bg-blue-600 mr-2 rounded-sm"></span> Son Haberler
            </h2>
            <div className="flex items-center space-x-2">
                <button onClick={previous} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-300 hover:text-gray-900 transition">
                    <FiChevronLeft size={20} />
                </button>
                <button onClick={next} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-300 hover:text-gray-900 transition">
                    <FiChevronRight size={20} />
                </button>
            </div>
        </div>
    );

    return (
        <div className="w-full flex flex-col-reverse gap-4 pr-0 lg:pr-2">
            <Carousel
                autoPlay={true}
                arrows={false}
                renderButtonGroupOutside={true}
                responsive={responsive}
                customButtonGroup={<ButtonGroup />}
                infinite={true}
                transitionDuration={500}
            >
                {[1, 2, 3, 4].map((item, i) => (
                    <SimpleNewsCard item={item} key={i} type='latest' />
                ))}
            </Carousel>
        </div>
    );
};

export default LatestNews;
