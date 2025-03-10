import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const RecentNewsFooter = () => {
    return (
        <div className="w-full flex flex-col gap-y-4">
            {/* Başlık */}
            <div className="text-xl font-bold text-white relative before:absolute before:w-[4px] before:bg-[#5271ff] before:h-full before:-left-0 pl-3">
                Son Dakika Haberleri
            </div>

            {/* Haber Listesi */}
            <div className="grid grid-cols-1 gap-y-3 pt-1">
                {[1, 2, 3].map((r, i) => (
                    <Link key={i} href={`/`} className="flex w-full items-center hover:bg-[#444] transition duration-300 p-2 rounded-lg">
                        {/* Görsel */}
                        <div className="group relative overflow-hidden w-[80px] h-[65px] flex-shrink-0">
                            <Image
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                width={80}
                                height={65}
                                src="https://res.cloudinary.com/dbxtifnah/image/upload/v1727025332/news_images/oxpv0zjlkcqsvnd6v94e.png"
                                alt="Haber Görseli"
                            />
                            {/* Hover Efekti */}
                            <div className="absolute inset-0 bg-white opacity-10 transition-opacity duration-300 group-hover:opacity-20"></div>
                        </div>

                        {/* Haber İçeriği */}
                        <div className="w-[calc(100%-90px)] pl-3">
                            <div className="flex flex-col">
                                <h2 className="text-sm font-semibold text-white hover:text-[#c80000] transition duration-300">
                                    Maraşta gelişmeler neler
                                </h2>
                                <div className="flex gap-x-2 text-xs font-normal text-white opacity-80">
                                    <span>20-09-2024</span>
                                    <span>Yazar Adı</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RecentNewsFooter;
