import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NewsCard = ({ item }) => {
    return (
        <div className="bg-light shadow-sm rounded d-flex p-3 align-items-center transition-shadow hover-shadow-md">
            {/* Haber Görseli */}
            <div className="position-relative flex-shrink-0 overflow-hidden rounded">
                <div className="position-relative w-100 h-auto">
                <Image
            layout='fill'
            className='object-cover rounded-md'
            src="https://res.cloudinary.com/dbxtifnah/image/upload/v1726960712/news_images/m3xqhhcapfjaudcdlkfl.png" alt='Image'
            />

                </div>

                {/* Hover Efekti */}
                <div className="position-absolute w-100 h-100 start-0 top-0 bg-dark opacity-0 hover-opacity-50 transition-all rounded"></div>
            </div>

            {/* Haber İçeriği */}
            <div className="flex-grow-1 ps-3">
                <Link href={`/`} className="text-decoration-none text-primary fw-semibold small">
                    Kategori Adı
                </Link>

                <Link href={`/`} className="d-block text-dark fw-semibold h6 mt-1 hover-text-primary transition-colors">
                    Maraştan haberler
                </Link>

                <div className="d-flex gap-2 text-muted small">
                    <span className="fw-semibold">02-09-2024</span>
                    <span className="fw-semibold">Yazar</span>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
