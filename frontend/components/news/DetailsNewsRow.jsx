import React from 'react';
import Title from '../Title';
import SimpleDetailsNewCard from './item/SimpleDetailsNewCard';
import NewsCard from './item/NewsCard';

const DetailsNewsRow = ({ category, type }) => {
    return (
        <div className="w-full flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg transition duration-500 hover:shadow-xl">
            {/* Başlık */}
            <Title title={category} />

            {/* Haber Kartları */}
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                {/* Büyük Haber Kartı */}
                <div className="overflow-hidden rounded-lg">
                    <SimpleDetailsNewCard type={type} height={300} />
                </div>

                {/* Küçük Haber Kartları */}
                <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3].map((item, i) => (
                        <div key={i} className="transition-transform duration-300 hover:scale-105">
                            <NewsCard item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DetailsNewsRow;
