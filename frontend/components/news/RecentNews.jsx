import React from 'react';
import Title from '../Title';
import NewsCard from './item/NewsCard';

const RecentNews = () => {
    return (
        <div className="w-full flex flex-col gap-y-4 bg-white p-4 shadow-lg rounded-lg">
            {/* Başlık */}
            <Title title="Son Dakika Haberleri" />

            {/* Haber Listesi */}
            <div className="grid grid-cols-1 gap-y-3">
                {[1, 2, 3, 4].map((item, i) => (
                    <NewsCard key={i} item={item} />
                ))}
            </div>
        </div>
    );
};

export default RecentNews;
