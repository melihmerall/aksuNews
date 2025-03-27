"use client"; // Client Component olduğu için eklenmeli
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Category from "@/components/Category";
import SimpleDetailsNewCard from "@/components/news/item/SimpleDetailsNewCard";
import PopularNews from "@/components/news/PopularNews";
import { use } from "react";
import RecentNews from "@/components/news/RecentNews";
import Search from "@/components/news/Search";
import { base_api_url } from "@/config/config";
import InfiniteNews from "@/app/InfiniteNews";

import React from "react";
import Link from "next/link";
import RelatedNews from "@/components/news/RelatedNews";
import { useDate } from "/app/DateContext";
import Footer from "@/components/Footer";

const Details =  ()  => {


  
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const formatDate = useDate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/news/details/${slug}`);
        const data = await res.json();
        setNews(data.news);
        setRelatedNews(data.relatedNews); // ✅ relatedNews ekleniyor
      } catch (error) {
        console.error("Haber yüklenirken hata oluştu:", error);
      }
    };

    if (slug) fetchNews();
  }, [slug]);
    // Kategorileri API'den çekme

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/category/all`);
        const data = await res.json();
        setCategories(data.categories); // API'den dönen kategorileri state'e kaydet
      } catch (error) {
        console.error("Kategoriler yüklenirken hata oluştu:", error);
      }
    };

    fetchCategories();
  }, []);
 
  return (
    <div>
      {/* Breadcrumb Section */}
      <div className="breadcumb-wrapper">
        <div className="container">
          <ul className="breadcumb-menu">
            <li>
              <a href="/">Anasayfa</a>
            </li>
            <li> <a href="/news/kategori/news?.category"></a> {news?.category}</li>
            <li>{news?.title}</li>
          </ul>
        </div>
      </div>


      {/* Main Content */}
      <section className="th-blog-wrapper blog-details space-top space-extra-bottom">
        <div className="container">
          <div className="row">
            <div className="col-xxl-9 col-lg-8">
              <div className="th-blog blog-single">
                <a
                  data-theme-color="#4E4BD0"
                  href="blog.html"
                  className="category"
                >
                  {news?.category}
                </a>
                <h2 className="blog-title">{news?.title}</h2>
                <div className="blog-meta">
                  <a className="author" href="blog.html">
                    <i className="far fa-user"></i>
                    {news?.writerName}
                  </a>
                  <a href="blog.html">
                    <i className="fal fa-calendar-days"></i>
                    {formatDate(news?.date)}
                  </a>
                  <span>
                    <i className="far fa-book-open"></i>5 Mins Read
                  </span>
                </div>
                <div className="blog-img">
                  
                {news?.video ? (
  <video
    controls
    width="896px"
    height="430px"
    className="rounded-lg"
  >
    <source src={`http://localhost:5173${news.video}`} type="video/mp4" />
    Tarayıcınız video etiketini desteklemiyor.
  </video>
) : (
  <img
    style={{ width: "896px" }}
    src={`http://localhost:5173${news?.image || "/default.jpg"}`}
    alt={news?.title}
  />
)}
                </div>
                <div className="blog-content-wrap">
                  <div className="share-links-wrap">
                    <div className="share-links">
                      <span className="share-links-title">Paylaş:</span>
                      <div className="multi-social">
                        <a href="https://facebook.com/" target="_blank">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com/" target="_blank">
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://linkedin.com/" target="_blank">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="https://pinterest.com/" target="_blank">
                          <i className="fab fa-pinterest-p"></i>
                        </a>
                        <a href="https://instagram.com/" target="_blank">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="blog-content">
                    <div className="blog-info-wrap">
                      {/* Yazdır Butonu */}
                      <button className="blog-info ms-sm-auto">
                      </button>
                      <span className="blog-info">
                      {news?.count} <i className="fas fa-eye"></i>
                      </span>
                     
                    </div>
                    <div className="content">
                      <div
                        dangerouslySetInnerHTML={{ __html: news?.description }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="blog-navigation">
                        <div className="nav-btn prev">
                            <div className="img">
                                <img src="assets/img/blog/blog-nav-1.jpg" alt="blog img" className="nav-img"/>
                            </div>
                            <div className="media-body">
                                <h5 className="title">
                                    <a className="hover-line" href="blog-details.html">Game on! Embrace the spirit of sportsmanship</a>
                                </h5>
                                <a href="blog-details.html" className="nav-text"><i className="fas fa-arrow-left me-2"></i>Prev</a>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="nav-btn next">
                            <div className="media-body">
                                <h5 className="title">
                                    <a className="hover-line" href="blog-details.html">Push your limits, redefine what's possible</a>
                                </h5>
                                <a href="blog-details.html" className="nav-text">Next<i className="fas fa-arrow-right ms-2"></i></a>
                            </div>
                            <div className="img">
                                <img src="assets/img/blog/blog-nav-2.jpg" alt="blog img" className="nav-img"/>
                            </div>
                        </div>
                    </div>
                    <div className="blog-author">
                        <div className="auhtor-img">
                            <img src="assets/img/blog/blog-author.jpg" alt="Blog Author Image"/>
                        </div>
                        <div className="media-body">
                            <div className="author-top">
                                <div>
                                    <h3 className="author-name"><a className="text-inherit" href="team-details.html">Ronald Richards</a></h3>
                                    <span className="author-desig">Founder & CEO</span>
                                </div>
                                <div className="social-links">
                                    <a href="https://facebook.com/" target="_blank"><i className="fab fa-facebook-f"></i></a>
                                    <a href="https://twitter.com/" target="_blank"><i className="fab fa-twitter"></i></a>
                                    <a href="https://linkedin.com/" target="_blank"><i className="fab fa-linkedin-in"></i></a>
                                    <a href="https://instagram.com/" target="_blank"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                            <p className="author-text">Adventurer and passionate travel blogger. With a backpack full of stories and a camera in hand, she takes her readers on exhilarating journeys around the world.</p>
                        </div>
                    </div> */}
<hr></hr>
<h4>Daha fazla haber...</h4>
              {/* <RelatedNews news={relatedNews} type="Related News" /> */}

              <InfiniteNews />
            </div>
            <div className="col-xxl-3 col-lg-4 sidebar-wrap">
              <aside className="sidebar-area">
                <div className="widget widget_categories  ">
                  <h3 className="widget_title">Kategoriler</h3>
                  <ul>
                  {categories.length > 0 && categories.slice(0, 7).map((c, index) => (
  <li key={`${c._id}-${index}`}>
    <Link href={`/news/category/${c.slug}`}>
      {c.category}
    </Link>
  </li>
))}

                  </ul>
                </div>
                <RecentNews></RecentNews>
                <div className="widget  ">
                  <div className="widget-ads">
                    <a href="https://themeforest.net/user/themeholy/portfolio">
                      <img
                        className="w-100"
                        src="/assets/img/ads/siderbar_ads_1.jpg"
                        alt="ads"
                      />
                    </a>
                  </div>
                </div>
                <div className="widget widget_tag_cloud  ">
                  <h3 className="widget_title">Popular Tags</h3>
                  <div className="tagcloud">
                    <a href="blog.html">Sports</a>
                    <a href="blog.html">Politics</a>
                    <a href="blog.html">Business</a>
                    <a href="blog.html">Music</a>
                    <a href="blog.html">Food</a>
                    <a href="blog.html">Technology</a>
                    <a href="blog.html">Travels</a>
                    <a href="blog.html">Health</a>
                    <a href="blog.html">Fashions</a>
                    <a href="blog.html">Animal</a>
                    <a href="blog.html">Weather</a>
                    <a href="blog.html">Movies</a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>

      </section>
      
    </div>
    
  );
};

export default Details;
