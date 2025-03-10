import React from 'react';
import Title from '../Title';
import SimpleDetailsNewCard from './item/SimpleDetailsNewCard';

const PopularNews = ({ type }) => {
    return (
        <div className="w-full pb-8 mt-5 bg-white p-4 shadow-lg rounded-lg">
            {/* Başlık */}
            <Title title="Popüler Haberler" />

            {/* Popüler Haber Kartları */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item, i) => (
                    <SimpleDetailsNewCard type={type} item={item} key={i} height={230} />
                ))}
            </div>
        </div>
    );
};

export default PopularNews;
