import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SimpleNewsCard = ({ item, type }) => {

    return (
        <div className="position-relative overflow-hidden group">
            {/* Haber Görseli */}
            <div className={`overflow-hidden ${type ? 'h-100' : 'h-75'} w-100`}>
                <img
                    className="img-fluid w-100 h-100 object-fit-cover transition-all scale-hover"
                    src={`http://localhost:5175${item.image}`}
                    alt="news image"
                />
            </div>

            {/* Hover Efekti */}
            <div className="position-absolute w-100 h-100 start-0 top-0 bg-white opacity-0 group-hover-opacity-5 transition-all"></div>

            {/* Haber Bilgileri */}
            <div className="position-absolute start-0 bottom-0 p-3 text-dark fw-bold d-flex flex-column">
                <div className="px-2 py-1 bg-danger text-white rounded text-sm">
                    {item.category}
                </div>
                <Link href={`/news/${item.slug}`} className="text-decoration-none text-dark h4">
                    {item.title}
                </Link>
                <div className="d-flex gap-2 text-muted text-sm">
                    <span>{item.date}</span>
                    <span>By {item.writerName}</span>
                </div>
            </div>
        </div>
    );
};

export default SimpleNewsCard;
