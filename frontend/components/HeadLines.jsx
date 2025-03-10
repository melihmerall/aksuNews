import React from 'react';
import Marquee from 'react-fast-marquee';
import Link from 'next/link';

const HeadLines = ({news}) => {


    return (
        <div className="container">
            <div className="news-area">
                <div className="title">Son Dakika :</div>
                <div className="news-wrap">
                    <div className="row slick-marquee">
                        <div className="col-auto">
                        <Marquee speed={50} pauseOnHover={true} gradient={false}>
  {news && Object.keys(news).length > 0 &&
    Object.keys(news).map((c, i) => (
      news[c] && news[c].length > 0 &&
      news[c].map((n, i) => (
        <Link key={i} href={`/news/${n.slug}`} className="breaking-news mx-3">
          {n.title}
        </Link>
      ))
    ))
  }
</Marquee>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeadLines;
