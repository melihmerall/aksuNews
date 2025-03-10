import React from 'react';
import Title from '../Title';
import SimpleDetailsNewCard from './item/SimpleDetailsNewCard';

const DetailsNews = ({ category }) => {
    return (
        <div className="w-100 d-flex flex-column gap-3 pe-2 py-4">
            {/* Başlık */}
            <Title title={category} />

            {/* Haber Kartları */}
            <div className="row g-3">
                <div className="col-12 col-sm-6">
                    <SimpleDetailsNewCard type="details_news" height={300} />
                </div>
                <div className="col-12 col-sm-6">
                    <SimpleDetailsNewCard type="details_news" height={300} />
                </div>
            </div>
        </div>
    );
};

export default DetailsNews;
