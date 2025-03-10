import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SimpleDetailsNewCard = ({ news, type }) => {
    return (
        <div className="bg-white shadow-lg rounded overflow-hidden">
            {/* Haber Görseli */}
            <div className="position-relative overflow-hidden">
                <div className="w-100 h-100 position-relative">
                <Image className='' layout='fill' src={'https://res.cloudinary.com/dbxtifnah/image/upload/v1726961431/news_images/r3ecljivitfbqwmmutov.png'} alt='images' />

                </div>

                {/* Hover Efekti */}
                <div className="position-absolute w-100 h-100 start-0 top-0 bg-white opacity-0 group-hover-opacity-5 transition-all"></div>

                {/* Haber Kategorisi */}
                <div className="position-absolute start-0 bottom-0 p-2 text-white fw-bold">
                    <span className="px-2 py-1 bg-danger text-white rounded text-sm">Category</span>
                </div>
            </div>

            {/* Haber İçeriği */}
            <div className="p-4">
                <Link href={'/'} className="text-decoration-none text-dark fw-bold h5 d-block mb-2">
                    What puzzles reveal about the depths of our own
                </Link>
                <div className="d-flex gap-2 text-muted text-sm">
                    <span className="fw-semibold">25-09-2024</span>
                    <span className="fw-semibold">By Ariyan</span>
                </div>

                {/* Detaylı Haber Açıklaması */}
                {type === 'details_news' && (
                    <p className="text-muted pt-3">
                        The news that Margot Robbie and Jacob Elordi are starring in Emerald Fennell's take on Emily Brontë's romance has caused a storm – no surprise in an age of increased casting scrutiny.
                    </p>
                )}
            </div>
        </div>
    );
};

export default SimpleDetailsNewCard;
