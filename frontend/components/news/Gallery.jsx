import Image from 'next/image';
import React from 'react';

const Gallery = () => {
    return (
        <div className="w-full flex flex-col gap-y-4">
            {/* Galeri Başlığı */}
            <div className="text-xl font-bold text-white relative pl-4 before:absolute before:w-2 before:bg-blue-600 before:h-full before:left-0">
                Galeri
            </div>

            {/* Galeri İçeriği */}
            <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((item, i) => (
                    <div key={i} className="w-full h-24 relative overflow-hidden group">
                        <Image
                            className="object-cover w-full h-full transform group-hover:scale-110 transition duration-500"
                            layout="fill"
                            src={'https://res.cloudinary.com/dbxtifnah/image/upload/v1727024773/news_images/exyvlbygul69g61urbyn.png'}
                            alt="gallery image"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-500"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
