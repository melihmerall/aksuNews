
import Head from "next/head";
import HeadLines from "@/components/HeadLines";
import DetailsNews from "@/components/news/DetailsNews";
import DetailsNewsCol from "@/components/news/DetailsNewsCol";
import DetailsNewsRow from "@/components/news/DetailsNewsRow";
import NewsCard from "@/components/news/item/NewsCard";
import SimpleNewsCard from "@/components/news/item/SimpleNewsCard";
import LatestNews from "@/components/news/LatestNews";
import PopularNews from "@/components/news/PopularNews";
import Title from "@/components/Title";
import { base_api_url } from "@/config/config";
import FilteredPopularNews from "@/components/news/FilteredPopularNews";

import Footer from "@/components/Footer";

const Home = async () => {
  const ads_res = await fetch(`${base_api_url}/api/ads`, {
    next: { revalidate: 5 },
  });
  const adsData = await ads_res.json();
  const adsInfo = adsData.ads || {};
  const news_data = await fetch(`${base_api_url}/api/all/news`, {
    next: { revalidate: 5 },
  });

  let news = await news_data?.json();
  news = news.news;

  const popular_news_data = await fetch(`${base_api_url}/api/popular/news`, {
    next: { revalidate: 5 },
  });

  let popularNews = await popular_news_data?.json();
  popularNews = popularNews.popularNews;
  const latest_news_data = await fetch(`${base_api_url}/api/eleven/news`, {
    next: { revalidate: 5 },
  });

  let latestNews = await latest_news_data?.json();
  latestNews = latestNews.latestNews;

  const video_news_data = await fetch(`${base_api_url}/api/video/news`, {
    next: { revalidate: 5 }, // 5 saniyede bir veriyi yenile
  });

  let videoNews = await video_news_data?.json();
  videoNews = videoNews.videoNews;

  const toprated_data = await fetch(`${base_api_url}/api/toprated/news`, {
    next: { revalidate: 5 },
  });
  let topRated = await toprated_data.json();
  topRated = topRated.news;

  const tranding_data = await fetch(`${base_api_url}/api/tranding/news`, {
    next: { revalidate: 5 },
  });
  let tranding = await tranding_data.json();
  tranding = tranding.news;

  const recent_data = await fetch(`${base_api_url}/api/recent/news`, {
    next: { revalidate: 5 },
  });
  let recent = await recent_data.json();
  recent = recent.news;
  const categories_res = await fetch(`${base_api_url}/api/category/all`, {
    next: { revalidate: 5 },
  });
  const categories_data = await categories_res.json();
  const categories = categories_data.categories || [];
  
  const recent_footer_res = await fetch(`${base_api_url}/api/recent/news`, {
    next: { revalidate: 5 },
  });
  const recent_footer_data = await recent_footer_res.json();
  const recentFooterNews = recent_footer_data.news || [];
  

  return (
    <div>
      <Head>

      </Head>

      <HeadLines news={news} />
      <section className="space">
        <div className="container">
          <div className="row">
            {/* Sol Taraf - 2 Küçük Haber */}
            <div className="col-xl-3">
              <div className="row gy-4">
                {latestNews.slice(0, 2).map((news, index) => (
                  <div key={index} className="col-xl-12 col-sm-6 border-blog">
                    <div className="blog-style1">
                      <div className="blog-img">
                        <img
                          src={`http://localhost:5173${
                            news?.image || "/default.jpg"
                          }`}
                          alt="Blog Image"
                        />
                        <a
                          data-theme-color="#FF9500"
                          href={`/category/${news.category}`}
                          className="category"
                        >
                          {news.category}
                        </a>
                      </div>
                      <h3 className="box-title-22">
                        <a className="hover-line" href={`/news/${news.slug}`}>
                          {news.title}
                        </a>
                      </h3>
                      <div className="blog-meta">
                        <a href={`/author/${news.writerName}`}>
                          <i className="far fa-user"></i> {news.writerName}
                        </a>
                        <a href="#">
                          <i className="fal fa-calendar-days"></i>
                          {new Date(news.createdAt).toLocaleDateString()}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Orta Kısım - Büyük Haber */}
            <div className="col-xl-6 mt-4 mt-xl-0">
              {latestNews.length > 2 && latestNews[2] ? (
                <div className="blog-style1 style-big">
                  <div className="blog-img">
                    <img
                      style={{
                        width: "100%",
                        height: "550px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                      src={`http://localhost:5173${
                        latestNews[2]?.image || "/default.jpg"
                      }`}
                      alt="Blog Image"
                    />
                    <a
                      data-theme-color="#FF9500"
                      href={`/category/${latestNews[2]?.category || ""}`}
                      className="category"
                    >
                      {latestNews[2]?.category || "Kategori Yok"}
                    </a>
                  </div>
                  <h3 className="box-title-30">
                    <a
                      className="hover-line"
                      href={`/news/${latestNews[2]?.slug || ""}`}
                    >
                      {latestNews[2]?.title || "Başlık Yok"}
                    </a>
                  </h3>
                  <div className="blog-meta">
                    <a href={`/author/${latestNews[2]?.writerName || ""}`}>
                      <i className="far fa-user"></i>{" "}
                      {latestNews[2]?.writerName || "Yazar Bilgisi Yok"}
                    </a>
                    <a href="#">
                      <i className="fal fa-calendar-days"></i>
                      {latestNews[2]?.createdAt
                        ? new Date(latestNews[2].createdAt).toLocaleDateString()
                        : "Tarih Yok"}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center py-5">
                  <p className="text-muted">
                    Henüz büyük haber bulunmamaktadır.
                  </p>
                </div>
              )}
            </div>

            {/* Sağ Taraf - Tab Menü ve Küçük Haberler */}
            <div className="col-xl-3 mt-35 mt-xl-0">
              <div className="nav tab-menu indicator-active" role="tablist">
                <button
                  className="tab-btn active"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-one"
                >
                  En Yeniler
                </button>
                <button
                  className="tab-btn"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-two"
                >
                  Son Okunanlar
                </button>
              </div>
              <div className="tab-content">
                {/* Top News */}
                <div className="tab-pane fade show active" id="nav-one">
                  <div className="row gy-4">
                    {latestNews.slice(3, 7).map((news, index) => (
                      <div
                        key={index}
                        className="col-xl-12 col-md-6 border-blog"
                      >
                        <div className="blog-style2">
                          <div className="blog-img">
                            <img
                              src={`http://localhost:5173${
                                news?.image || "/default.jpg"
                              }`}
                              alt="Blog Image"
                            />
                          </div>
                          <div className="blog-content">
                            <a
                              data-theme-color="#FF9500"
                              href={`/category/${news.category}`}
                              className="category"
                            >
                              {news.category}
                            </a>
                            <h3 className="box-title-18">
                              <a
                                className="hover-line"
                                href={`/news/${news.slug}`}
                              >
                                {news.title}
                              </a>
                            </h3>
                            <div className="blog-meta">
                              <a href="#">
                                <i className="fal fa-calendar-days"></i>
                                {new Date(news.createdAt).toLocaleDateString()}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent News */}
                <div className="tab-pane fade" id="nav-two">
                  <div className="row gy-4">
                    {latestNews.slice(7, 11).map((news, index) => (
                      <div
                        key={index}
                        className="col-xl-12 col-md-6 border-blog"
                      >
                        <div className="blog-style2">
                          <div className="blog-img">
                            <img
                              src={`http://localhost:5173${
                                news?.image || "/default.jpg"
                              }`}
                              alt="Blog Image"
                            />
                          </div>
                          <div className="blog-content">
                            <a
                              data-theme-color="#868101"
                              href={`/category/${news.category}`}
                              className="category"
                            >
                              {news.category}
                            </a>
                            <h3 className="box-title-18">
                              <a
                                className="hover-line"
                                href={`/news/${news.slug}`}
                              >
                                {news.title}
                              </a>
                            </h3>
                            <div className="blog-meta">
                              <a href="#">
                                <i className="fal fa-calendar-days"></i>
                                {new Date(news.createdAt).toLocaleDateString()}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <h2 className="sec-title has-line">Video Galeri</h2>
            </div>
            <div className="col-auto">
              <div className="sec-btn">
                <div className="icon-box">
                  <button
                    data-slick-prev="#blog-video-slide1"
                    className="slick-arrow default"
                  >
                    <i className="far fa-arrow-left"></i>
                  </button>
                  <button
                    data-slick-next="#blog-video-slide1"
                    className="slick-arrow default"
                  >
                    <i className="far fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="row th-carousel"
            id="blog-video-slide1"
            data-slide-show="2"
            data-lg-slide-show="2"
            data-md-slide-show="2"
            data-sm-slide-show="1"
            data-center-mode="true"
            data-variable-width="true"
          >
            {videoNews.length > 0 ? (
              videoNews.map((news, index) => (
                <div key={index} className="col-auto video-center-mode">
                  <div className="blog-style3">
                    <div className="blog-img">
                      <img
                        src={`http://localhost:5173${news.image}`}
                        alt={news.title}
                      />
                      <a
                        href={`http://localhost:5173${news.video}`}
                        className="play-btn popup-video"
                      >
                        <i className="fas fa-play"></i>
                      </a>
                    </div>
                    <div className="blog-content">
                      <a
                        data-theme-color="#4E4BD0"
                        href={`/category/${news.category}`}
                        className="category"
                      >
                        {news.category}
                      </a>
                      <h3 className="box-title-30 text-white">
  <a className="hover-line text-white" href={`/news/${news.slug}`}>
    {news.title}
  </a>
</h3>
                      <div className="blog-meta text-white">
                        <a className="text-white" href={`/author/${news.writerName}`}>
                          <i className="far fa-user text-white"></i> {news.writerName}
                        </a>
                        <a className="text-white" href="#">
                          <i className="fal fa-calendar-days text-white"></i>{" "}
                          {new Date(news.createdAt).toLocaleDateString()}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Henüz videolu haber bulunmuyor.</p>
            )}
          </div>
        </div>

        <br></br>
        <div className="container">
          <div className="row">
          <FilteredPopularNews />
            <div className="col-xl-3 mt-35 mt-xl-0 mb-10 sidebar-wrap">
              <div className="sidebar-area">
                <div className="widget mb-30">
                  <div className="widget-ads">
                    <a >
                      <img
                        className="w-100"
                        src={`http://localhost:5173${adsInfo?.bannerAdsImageUrl}`}
                        alt="ads"
                      />
                    </a>
                  </div>
                </div>

                {/* <div
                  className="widget newsletter-widget2 mb-30"
                  data-bg-src="assets/img/bg/particle_bg_1.png"
                >
                  <h3 className="box-title-24">Subscribe Our Newsletter</h3>
                  <form className="newsletter-form">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Enter Email"
                      required=""
                    />
                    <button type="submit" className="th-btn btn-fw">
                      Subscribe Now
                    </button>
                  </form>
                </div> */}
                <div className="nav tab-menu indicator-active" role="tablist">
                  <button
                    className="tab-btn active"
                    id="nav3-one-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav3-one"
                    type="button"
                    role="tab"
                    aria-controls="nav3-one"
                    aria-selected="true"
                  >
                    Çok Tıklanan
                  </button>
                  <button
                    className="tab-btn"
                    id="nav3-two-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav3-two"
                    type="button"
                    role="tab"
                    aria-controls="nav3-two"
                    aria-selected="false"
                  >
                    Güncel
                  </button>
                  <button
                    className="tab-btn"
                    id="nav3-three-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav3-three"
                    type="button"
                    role="tab"
                    aria-controls="nav3-three"
                    aria-selected="false"
                  >
                    En son
                  </button>
                </div>
                <div className="tab-content">
                  {/* TOP RATED TAB */}
                  <div
                    className="tab-pane fade show active"
                    id="nav3-one"
                    role="tabpanel"
                    aria-labelledby="nav3-one-tab"
                  >
                    <div className="row gy-4">
                      {topRated.map((news, i) => (
                        <div key={i} className="col-xl-12 col-md-6 border-blog">
                          <div className="blog-style2">
                            <div className="blog-img">
                              <img src={`http://localhost:5173${
                              news?.image || "/default.jpg"
                            }`} alt="blog image" />
                            </div>
                            <div className="blog-content">
                              <a
                                data-theme-color="#FF9500"
                                href={`/category/${news.category}`}
                                className="category"
                              >
                                {news.category}
                              </a>
                              <h3 className="box-title-18">
                                <a
                                  className="hover-line"
                                  href={`/news/${news.slug}`}
                                >
                                  {news.title}
                                </a>
                              </h3>
                              <div className="blog-meta">
                                <a href={`/news/${news.slug}`}>
                                  <i className="fal fa-calendar-days"></i>
                                  {news.date}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TRANDING TAB */}
                  <div
                    className="tab-pane fade"
                    id="nav3-two"
                    role="tabpanel"
                    aria-labelledby="nav3-two-tab"
                  >
                    <div className="row gy-4">
                      {tranding.map((news, i) => (
                        <div key={i} className="col-xl-12 col-md-6 border-blog">
                          <div className="blog-style2">
                            <div className="blog-img">
                              <img src={`http://localhost:5173${
                              news?.image || "/default.jpg"
                            }`} alt="blog image" />
                            </div>
                            <div className="blog-content">
                              <a
                                data-theme-color="#FF9500"
                                href={`/category/${news.category}`}
                                className="category"
                              >
                                {news.category}
                              </a>
                              <h3 className="box-title-18">
                                <a
                                  className="hover-line"
                                  href={`/news/${news.slug}`}
                                >
                                  {news.title}
                                </a>
                              </h3>
                              <div className="blog-meta">
                                <a href={`/news/${news.slug}`}>
                                  <i className="fal fa-calendar-days"></i>
                                  {news.date}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RECENT TAB */}
                  <div
                    className="tab-pane fade"
                    id="nav3-three"
                    role="tabpanel"
                    aria-labelledby="nav3-three-tab"
                  >
                    <div className="row gy-4">
                      {recent.map((news, i) => (
                        <div key={i} className="col-xl-12 col-md-6 border-blog">
                          <div className="blog-style2">
                            <div className="blog-img">
                              <img src={`http://localhost:5173${
                              news?.image || "/default.jpg"
                            }`} alt="blog image" />
                            </div>
                            <div className="blog-content">
                              <a
                                data-theme-color="#FF9500"
                                href={`/category/${news.category}`}
                                className="category"
                              >
                                {news.category}
                              </a>
                              <h3 className="box-title-18">
                                <a
                                  className="hover-line"
                                  href={`/news/${news.slug}`}
                                >
                                  {news.title}
                                </a>
                              </h3>
                              <div className="blog-meta">
                                <a href={`/news/${news.slug}`}>
                                  <i className="fal fa-calendar-days"></i>
                                  {news.date}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <br></br>

      <Footer
  categories={categories}
  recentPosts={recentFooterNews}
 
/>
    </div>
  );
};

export default Home;
