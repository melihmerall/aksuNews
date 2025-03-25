import SimpleDetailsNewCard from "@/components/news/item/SimpleDetailsNewCard";

const RelatedNews = ({ news, type }) => {
  return (
    <div className="related-post-wrapper pt-30 mb-30">
      {/* Başlık ve Butonlar */}
      <div className="row align-items-center">
        <div className="col">
          <h2 className="sec-title has-line">İlgili Haberler</h2>
        </div>
        <div className="col-auto">
          <div className="sec-btn">
            <div className="icon-box">
              <button
                data-slick-prev="#related-post-slide"
                className="slick-arrow default"
              >
                <i className="far fa-arrow-left"></i>
              </button>
              <button
                data-slick-next="#related-post-slide"
                className="slick-arrow default"
              >
                <i className="far fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row slider-shadow th-carousel"
        id="related-post-slide"
        data-slide-show="3"
        data-lg-slide-show="2"
        data-md-slide-show="2"
        data-sm-slide-show="2"
      >
        {news &&
          news.length > 0 &&
          news.map((item, i) => {
            return (
              <SimpleDetailsNewCard
                type={type}
                news={item}
                key={i}
                height={230}
              />
            );
          })}
      </div>
    </div>
  );
};

export default RelatedNews;
