import React from 'react';
import Title from '../Title';
import SimpleDetailsNewCard from './item/SimpleDetailsNewCard';
import NewsCard from './item/NewsCard';

const DetailsNewsCol = ({ category }) => {
    return (
        <div className="w-100 d-flex flex-column gap-3 ps-2">
            {/* Başlık */}
            <Title title={category} />

            {/* Büyük Haber Kartı */}
            <div className="row g-3">
                <div className="col-12">
                    <SimpleDetailsNewCard type="details_news" height={300} />
                </div>
            </div>

            {/* Küçük Haber Kartları */}
            <div className="row g-2">
                {[1, 2, 3, 4].map((item, i) => (
                    <div key={i} className="col-12">
                        <NewsCard item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DetailsNewsCol;
