import Head from 'next/head';
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

const Home = async () => {
  const news_data = await fetch(`${base_api_url}/api/all/news`, {
    next: { revalidate: 5 },
  });

  let news = await news_data?.json();
  news = news.news;

  return (
    <div>
      <Head>
        <title>Haberlers</title>
      </Head>

        <HeadLines news={news} />
        <section className="space">
        <div className="container">
            <div className="row">
                <div className="col-xl-3">
                    <div className="row gy-4">
                        <div className="col-xl-12 col-sm-6 border-blog">
                            <div className="blog-style1">
                                <div className="blog-img">
                                    <img src="/assets/img/blog/blog_1_5.jpg" alt="blog image"/>
                                    <a data-theme-color="#FF9500" href="blog.html" className="category">Politics</a>
                                </div>
                                <h3 className="box-title-22"><a className="hover-line" href="blog-details.html">Leadership for the People By the people</a></h3>
                                <div className="blog-meta">
                                    <a href="author.html"><i className="far fa-user"></i>By - Tnews</a>
                                    <a href="blog.html"><i className="fal fa-calendar-days"></i>28 Mar, 2023</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12 col-sm-6 border-blog">
                            <div className="blog-style1">
                                <div className="blog-img">
                                    <img src="/assets/img/blog/blog_1_6.jpg" alt="blog image"/>
                                    <a data-theme-color="#4E4BD0" href="blog.html" className="category">Sports</a>
                                </div>
                                <h3 className="box-title-22"><a className="hover-line" href="blog-details.html">Game on! Stay ahead withn Sports updates</a></h3>
                                <div className="blog-meta">
                                    <a href="author.html"><i className="far fa-user"></i>By - Tnews</a>
                                    <a href="blog.html"><i className="fal fa-calendar-days"></i>20 Mar, 2023</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 mt-4 mt-xl-0">
                    <div className="">
                        <div className="blog-style1 style-big">
                            <div className="blog-img">
                                <img src="/assets/img/blog/blog_2_1.jpg" alt="blog image"/>
                                <a data-theme-color="#FF9500" href="blog.html" className="category">Politics</a>
                            </div>
                            <h3 className="box-title-30"><a className="hover-line" href="blog-details.html">Following the Moon, they are in Close space. choose the best</a></h3>
                            <div className="blog-meta">
                                <a href="author.html"><i className="far fa-user"></i>By - Tnews</a>
                                <a href="blog.html"><i className="fal fa-calendar-days"></i>25 Mar, 2023</a>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-xl-3 mt-35 mt-xl-0">
                    <div className="nav tab-menu indicator-active" role="tablist">
                        <button className="tab-btn active" id="nav-one-tab" data-bs-toggle="tab" data-bs-target="#nav-one" type="button" role="tab" aria-controls="nav-one" aria-selected="true">Top News</button>
                        <button className="tab-btn" id="nav-two-tab" data-bs-toggle="tab" data-bs-target="#nav-two" type="button" role="tab" aria-controls="nav-two" aria-selected="false">Recent News</button>
                    </div>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="nav-one" role="tabpanel" aria-labelledby="nav-one-tab">
                            <div className="row gy-4">
                                <div className="col-xl-12 col-md-6 border-blog">
                                    <div className="blog-style2">
                                        <div className="blog-img">
                                            <img src="/assets/img/blog/blog_3_1.jpg" alt="blog image"/>
                                        </div>
                                        <div className="blog-content">
                                            <a data-theme-color="#FF9500" href="blog.html" className="category">Politics</a>
                                            <h3 className="box-title-18"><a className="hover-line" href="blog-details.html">Stay informed, Navigate the world</a></h3>
                                            <div className="blog-meta">
                                                <a href="blog.html"><i className="fal fa-calendar-days"></i>14 Mar, 2023</a>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-xl-12 col-md-6 border-blog">
                                    <div className="blog-style2">
                                        <div className="blog-img">
                                            <img src="/assets/img/blog/blog_3_2.jpg" alt="blog image"/>
                                        </div>
                                        <div className="blog-content">
                                            <a data-theme-color="#007BFF" href="blog.html" className="category">Travel</a>
                                            <h3 className="box-title-18"><a className="hover-line" href="blog-details.html">Your beach resort Sanctuary.</a></h3>
                                            <div className="blog-meta">
                                                <a href="blog.html"><i className="fal fa-calendar-days"></i>22 Mar, 2023</a>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-xl-12 col-md-6 border-blog">
                                    <div className="blog-style2">
                                        <div className="blog-img">
                                            <img src="/assets/img/blog/blog_3_3.jpg" alt="blog image"/>
                                        </div>
                                        <div className="blog-content">
                                            <a data-theme-color="#00D084" href="blog.html" className="category">Life Style</a>
                                            <h3 className="box-title-18"><a className="hover-line" href="blog-details.html">Style your life news For modern living</a></h3>
                                            <div className="blog-meta">
                                                <a href="blog.html"><i className="fal fa-calendar-days"></i>30 Mar, 2023</a>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-xl-12 col-md-6 border-blog">
                                    <div className="blog-style2">
                                        <div className="blog-img">
                                            <img src="/assets/img/blog/blog_3_4.jpg" alt="blog image"/>
                                        </div>
                                        <div className="blog-content">
                                            <a data-theme-color="#4E4BD0" href="blog.html" className="category">Sports</a>
                                            <h3 className="box-title-18"><a className="hover-line" href="blog-details.html">Score big with the Latest sports news.</a></h3>
                                            <div className="blog-meta">
                                                <a href="blog.html"><i className="fal fa-calendar-days"></i>11 Mar, 2023</a>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="tab-pane fade" id="nav-two" role="tabpanel" aria-labelledby="nav-two-tab">
                            <div className="row gy-4">
                                <div className="col-xl-12 col-md-6 border-blog">
                                    <div className="blog-style2">
                                        <div className="blog-img">
                                            <img src="/assets/img/blog/blog_3_3.jpg" alt="blog image"/>
                                        </div>
                                        <div className="blog-content">
                                            <a data-theme-color="#00D084" href="blog.html" className="category">Life Style</a>
                                            <h3 className="box-title-18"><a className="hover-line" href="blog-details.html">Style your life news For modern living</a></h3>
                                            <div className="blog-meta">
                                                <a href="blog.html"><i className="fal fa-calendar-days"></i>16 Mar, 2023</a>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-xl-12 col-md-6 border-blog">
                                    <div className="blog-style2">
                                        <div className="blog-img">
                                            <img src="/assets/img/blog/blog_3_4.jpg" alt="blog image"/>
                                        </div>
                                        <div className="blog-content">
                                            <a data-theme-color="#4E4BD0" href="blog.html" className="category">Sports</a>
                                            <h3 className="box-title-18"><a className="hover-line" href="blog-details.html">Score big with the Latest sports news.</a></h3>
                                            <div className="blog-meta">
                                                <a href="blog.html"><i className="fal fa-calendar-days"></i>26 Mar, 2023</a>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-xl-12 col-md-6 border-blog">
                                    <div className="blog-style2">
                                        <div className="blog-img">
                                            <img src="/assets/img/blog/blog_3_5.jpg" alt="blog image"/>
                                        </div>
                                        <div className="blog-content">
                                            <a data-theme-color="#868101" href="blog.html" className="category">Action</a>
                                            <h3 className="box-title-18"><a className="hover-line" href="blog-details.html">Adventure awaits, seize the moment</a></h3>
                                            <div className="blog-meta">
                                                <a href="blog.html"><i className="fal fa-calendar-days"></i>11 Mar, 2023</a>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-xl-12 col-md-6 border-blog">
                                    <div className="blog-style2">
                                        <div className="blog-img">
                                            <img src="/assets/img/blog/blog_3_6.jpg" alt="blog image"/>
                                        </div>
                                        <div className="blog-content">
                                            <a data-theme-color="#868101" href="blog.html" className="category">Thriller</a>
                                            <h3 className="box-title-18"><a className="hover-line" href="blog-details.html">brace yourself for thrilling adventure.</a></h3>
                                            <div className="blog-meta">
                                                <a href="blog.html"><i className="fal fa-calendar-days"></i>22 Mar, 2023</a>
                                            </div>
                                        </div>

                                    </div>
                                </div>

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
                    <h2 className="sec-title has-line">Latest Video</h2>
                </div>
                <div className="col-auto">
                    <div className="sec-btn">
                        <div className="icon-box">
                            <button data-slick-prev="#blog-video-slide1" className="slick-arrow default"><i className="far fa-arrow-left"></i></button>
                            <button data-slick-next="#blog-video-slide1" className="slick-arrow default"><i className="far fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row th-carousel" id="blog-video-slide1" data-slide-show="3" data-lg-slide-show="3" data-md-slide-show="3" data-sm-slide-show="1" data-center-mode="true" data-xl-center-mode="true" data-ml-center-mode="true" data-lg-center-mode="true" data-md-center-mode="true" data-variable-width="true">
                <div className="col-auto video-center-mode">
                    <div className="blog-style3">
                        <div className="blog-img">
                            <img src="assets/img/blog/blog_5_1.jpg" alt="blog image"/>
                            <a href="https://www.youtube.com/watch?v=_sI_Ps7JSEk" className="play-btn popup-video"><i className="fas fa-play"></i></a>
                        </div>
                        <div className="blog-content">
                            <a data-theme-color="#4E4BD0" href="blog.html" className="category">Fashion</a>
                            <h3 className="box-title-30"><a className="hover-line" href="blog-details.html">Cat-tastic updates, keeping you feline fine</a></h3>
                            <div className="blog-meta">
                                <a href="author.html"><i className="far fa-user"></i>By - Tnews</a>
                                <a href="blog.html"><i className="fal fa-calendar-days"></i>24 Mar, 2023</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-auto video-center-mode">
                    <div className="blog-style3">
                        <div className="blog-img">
                            <img src="assets/img/blog/blog_5_2.jpg" alt="blog image"/>
                            <a href="https://www.youtube.com/watch?v=_sI_Ps7JSEk" className="play-btn popup-video"><i className="fas fa-play"></i></a>
                        </div>
                        <div className="blog-content">
                            <a data-theme-color="#4E4BD0" href="blog.html" className="category">Fashion</a>
                            <h3 className="box-title-30"><a className="hover-line" href="blog-details.html">Fashion spotlight, updates on The modeling scene</a></h3>
                            <div className="blog-meta">
                                <a href="author.html"><i className="far fa-user"></i>By - Tnews</a>
                                <a href="blog.html"><i className="fal fa-calendar-days"></i>18 Mar, 2023</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-auto video-center-mode">
                    <div className="blog-style3">
                        <div className="blog-img">
                            <img src="assets/img/blog/blog_5_3.jpg" alt="blog image"/>
                            <a href="https://www.youtube.com/watch?v=_sI_Ps7JSEk" className="play-btn popup-video"><i className="fas fa-play"></i></a>
                        </div>
                        <div className="blog-content">
                            <a data-theme-color="#4E4BD0" href="blog.html" className="category">Fashion</a>
                            <h3 className="box-title-30"><a className="hover-line" href="blog-details.html">Style, grace, & Glamour In model news portal</a></h3>
                            <div className="blog-meta">
                                <a href="author.html"><i className="far fa-user"></i>By - Tnews</a>
                                <a href="blog.html"><i className="fal fa-calendar-days"></i>27 Mar, 2023</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-auto video-center-mode">
                    <div className="blog-style3">
                        <div className="blog-img">
                            <img src="assets/img/blog/blog_5_4.jpg" alt="blog image"/>
                            <a href="https://www.youtube.com/watch?v=_sI_Ps7JSEk" className="play-btn popup-video"><i className="fas fa-play"></i></a>
                        </div>
                        <div className="blog-content">
                            <a data-theme-color="#4E4BD0" href="blog.html" className="category">Fashion</a>
                            <h3 className="box-title-30"><a className="hover-line" href="blog-details.html">Fashion-forward Where trends and Confidence collide</a></h3>
                            <div className="blog-meta">
                                <a href="author.html"><i className="far fa-user"></i>By - Tnews</a>
                                <a href="blog.html"><i className="fal fa-calendar-days"></i>17 Mar, 2023</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

<br></br>
<div className="container">
            <div className="row">
                <div className="col-xl-9">
                    <div className="row align-items-center">
                        <div className="col">
                            <h2 className="sec-title has-line">Popular News</h2>
                        </div>
                        <div className="col-auto">
                            <div className="sec-btn">
                                <div className="filter-menu filter-menu-active">
                                    <button data-filter="*" className="tab-btn active" type="button">ALL</button>
                                    <button data-filter=".cat1" className="tab-btn" type="button">Travel</button>
                                    <button data-filter=".cat2" className="tab-btn" type="button">Politics</button>
                                    <button data-filter=".cat3" className="tab-btn" type="button">Fitness</button>
                                    <button data-filter=".cat4" className="tab-btn" type="button">Fashion</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="filter-active">
                        <div className="border-blog2 filter-item cat1">
                            <div className="blog-style4">
                                <div className="blog-img">
                                    <img src="assets/img/blog/blog_6_1.jpg" alt="blog image"/>
                                </div>
                                <div className="blog-content">
                                    <a data-theme-color="#007BFF" href="blog.html" className="category">Travel</a>
                                    <h3 className="box-title-24"><a className="hover-line" href="blog-details.html">From catwalk to campaigns, modeling news revealed Vibrant</a></h3>
                                    <p className="blog-text">Quisque eget ex rutrum, consequat odio in, tempor purus. Mauris neque quam, Tellentesque sit amet rutrum ut, gravida sit amet felis.</p>
                                    <div className="blog-meta">
                                        <a href="author.html"><i className="far fa-user"></i>By - Tnews</a>
                                        <a href="blog.html"><i className="fal fa-calendar-days"></i>21 Mar, 2023</a>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="border-blog2 filter-item cat4">
                            <div className="blog-style4">
                                <div className="blog-img">
                                    <img src="assets/img/blog/blog_6_2.jpg" alt="blog image"/>
                                </div>
                                <div className="blog-content">
                                    <a data-theme-color="#59C2D6" href="blog.html" className="category">Fashion</a>
                                    <h3 className="box-title-24"><a className="hover-line" href="blog-details.html">Explore, wander, immerse: let your travels paint stories of life</a></h3>
                                    <p className="blog-text">Quisque eget ex rutrum, consequat odio in, tempor purus. Mauris neque quam, Tellentesque sit amet rutrum ut, gravida sit amet felis.</p>
                                    <div className="blog-meta">
                                        <a href="author.html"><i className="far fa-user"></i>By - Tnews</a>
                                        <a href="blog.html"><i className="fal fa-calendar-days"></i>30 Mar, 2023</a>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="border-blog2 filter-item cat2">
                            <div className="blog-style4">
                                <div className="blog-img">
                                    <img src="assets/img/blog/blog_6_3.jpg" alt="blog image"/>
                                </div>
                                <div className="blog-content">
                                    <a data-theme-color="#FF9500" href="blog.html" className="category">Politics</a>
                                    <h3 className="box-title-24"><a className="hover-line" href="blog-details.html">Vote with conviction, champion change Shape the destiny of politics</a></h3>
                                    <p className="blog-text">Quisque eget ex rutrum, consequat odio in, tempor purus. Mauris neque quam, Tellentesque sit amet rutrum ut, gravida sit amet felis.</p>
                                    <div className="blog-meta">
                                        <a href="author.html"><i className="far fa-user"></i>By - Tnews</a>
                                        <a href="blog.html"><i className="fal fa-calendar-days"></i>15 Mar, 2023</a>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="border-blog2 filter-item cat1">
                            <div className="blog-style4">
                                <div className="blog-img">
                                    <img src="assets/img/blog/blog_6_4.jpg" alt="blog image"/>
                                </div>
                                <div className="blog-content">
                                    <a data-theme-color="#007BFF" href="blog.html" className="category">Travel</a>
                                    <h3 className="box-title-24"><a className="hover-line" href="blog-details.html">From catwalk to campaigns, modeling news Revealed get popular</a></h3>
                                    <p className="blog-text">Quisque eget ex rutrum, consequat odio in, tempor purus. Mauris neque quam, Tellentesque sit amet rutrum ut, gravida sit amet felis.</p>
                                    <div className="blog-meta">
                                        <a href="author.html"><i className="far fa-user"></i>By - Tnews</a>
                                        <a href="blog.html"><i className="fal fa-calendar-days"></i>28 Mar, 2023</a>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="border-blog2 filter-item cat3">
                            <div className="blog-style4">
                                <div className="blog-img">
                                    <img src="assets/img/blog/blog_6_5.jpg" alt="blog image"/>
                                </div>
                                <div className="blog-content">
                                    <a data-theme-color="#E7473C" href="blog.html" className="category">Fitness</a>
                                    <h3 className="box-title-24"><a className="hover-line" href="blog-details.html">Embrace the grind, sweat, dedication Witness your fitness transformation.</a></h3>
                                    <p className="blog-text">Quisque eget ex rutrum, consequat odio in, tempor purus. Mauris neque quam, Tellentesque sit amet rutrum ut, gravida sit amet felis.</p>
                                    <div className="blog-meta">
                                        <a href="author.html"><i className="far fa-user"></i>By - Tnews</a>
                                        <a href="blog.html"><i className="fal fa-calendar-days"></i>25 Mar, 2023</a>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-xl-3 mt-35 mt-xl-0 mb-10 sidebar-wrap">
                    <div className="sidebar-area">
                        <div className="widget mb-30">
                            <div className="widget-ads">
                                <a href="https://themeforest.net/user/themeholy/portfolio">
                                    <img className="w-100" src="assets/img/ads/siderbar_ads_1.jpg" alt="ads"/>
                                </a>
                            </div>
                        </div>
                        <div className="widget newsletter-widget2 mb-30" data-bg-src="assets/img/bg/particle_bg_1.png">
                            <h3 className="box-title-24">Subscribe Our Newsletter</h3>
                            <form className="newsletter-form">
                                <input className="form-control" type="email" placeholder="Enter Email" required=""/>
                                <button type="submit" className="th-btn btn-fw">Subscribe Now</button>
                            </form>
                        </div>
                        <div className="nav tab-menu indicator-active" role="tablist">
                            <button className="tab-btn active" id="nav3-one-tab" data-bs-toggle="tab" data-bs-target="#nav3-one" type="button" role="tab" aria-controls="nav3-one" aria-selected="true">Top Rated</button>
                            <button className="tab-btn" id="nav3-two-tab" data-bs-toggle="tab" data-bs-target="#nav3-two" type="button" role="tab" aria-controls="nav3-two" aria-selected="false">Tranding</button>
                            <button className="tab-btn" id="nav3-three-tab" data-bs-toggle="tab" data-bs-target="#nav3-three" type="button" role="tab" aria-controls="nav3-three" aria-selected="false">Recent</button>
                        </div>
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="nav3-one" role="tabpanel" aria-labelledby="nav3-one-tab">
                                <div className="row gy-4">
                                    <div className="col-xl-12 col-md-6 border-blog">
                                        <div className="blog-style2">
                                            <div className="blog-img">
                                                <img src="assets/img/blog/blog_3_1.jpg" alt="blog image"/>
                                            </div>
                                            <div className="blog-content">
                                                <a data-theme-color="#FF9500" href="blog.html" className="category">Politics</a>
                                                <h3 className="box-title-18"><a className="hover-line" href="blog-details.html">Stay informed, Navigate the world</a></h3>
                                                <div className="blog-meta">
                                                    <a href="blog.html"><i className="fal fa-calendar-days"></i>15 Mar, 2023</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-xl-12 col-md-6 border-blog">
                                        <div className="blog-style2">
                                            <div className="blog-img">
                                                <img src="assets/img/blog/blog_3_2.jpg" alt="blog image"/>
                                            </div>
                                            <div className="blog-content">
                                                <a data-theme-color="#007BFF" href="blog.html" className="category">Travel</a>
                                                <h3 className="box-title-18"><a className="hover-line" href="blog-details.html">Your beach resort Sanctuary.</a></h3>
                                                <div className="blog-meta">
                                                    <a href="blog.html"><i className="fal fa-calendar-days"></i>24 Mar, 2023</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-xl-12 col-md-6 border-blog">
                                        <div className="blog-style2">
                                            <div className="blog-img">
                                                <img src="assets/img/blog/blog_3_3.jpg" alt="blog image"/>
                                            </div>
                                            <div className="blog-content">
                                                <a data-theme-color="#00D084" href="blog.html" className="category">Life Style</a>
                                                <h3 className="box-title-18"><a className="hover-line" href="blog-details.html">Style your life news For modern living</a></h3>
                                                <div className="blog-meta">
                                                    <a href="blog.html"><i className="fal fa-calendar-days"></i>24 Mar, 2023</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-xl-12 col-md-6 border-blog">
                                        <div className="blog-style2">
                                            <div className="blog-img">
                                                <img src="assets/img/blog/blog_3_4.jpg" alt="blog image"/>
                                            </div>
                                            <div className="blog-content">
                                                <a data-theme-color="#4E4BD0" href="blog.html" className="category">Sports</a>
                                                <h3 className="box-title-18"><a className="hover-line" href="blog-details.html">Score big with the Latest sports news.</a></h3>
                                                <div className="blog-meta">
                                                    <a href="blog.html"><i className="fal fa-calendar-days"></i>29 Mar, 2023</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="tab-pane fade" id="nav3-two" role="tabpanel" aria-labelledby="nav3-two-tab">
                                <div className="row gy-4">
                                    <div className="col-xl-12 col-md-6 border-blog">
                                        <div className="blog-style2">
                                            <div className="blog-img">
                                                <img src="assets/img/blog/blog_3_2.jpg" alt="blog image"/>
                                            </div>
                                            <div className="blog-content">
                                                <a data-theme-color="#007BFF" href="blog.html" className="category">Travel</a>
                                                <h3 className="box-title-18"><a className="hover-line" href="blog-details.html">Your beach resort Sanctuary.</a></h3>
                                                <div className="blog-meta">
                                                    <a href="blog.html"><i className="fal fa-calendar-days"></i>22 Mar, 2023</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-xl-12 col-md-6 border-blog">
                                        <div className="blog-style2">
                                            <div className="blog-img">
                                                <img src="assets/img/blog/blog_3_3.jpg" alt="blog image"/>
                                            </div>
                                            <div className="blog-content">
                                                <a data-theme-color="#00D084" href="blog.html" className="category">Life Style</a>
                                                <h3 className="box-title-18"><a className="hover-line" href="blog-details.html">Style your life news For modern living</a></h3>
                                                <div className="blog-meta">
                                                    <a href="blog.html"><i className="fal fa-calendar-days"></i>24 Mar, 2023</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-xl-12 col-md-6 border-blog">
                                        <div className="blog-style2">
                                            <div className="blog-img">
                                                <img src="assets/img/blog/blog_3_4.jpg" alt="blog image"/>
                                            </div>
                                            <div className="blog-content">
                                                <a data-theme-color="#4E4BD0" href="blog.html" className="category">Sports</a>
                                                <h3 className="box-title-18"><a className="hover-line" href="blog-details.html">Score big with the Latest sports news.</a></h3>
                                                <div className="blog-meta">
                                                    <a href="blog.html"><i className="fal fa-calendar-days"></i>11 Mar, 2023</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-xl-12 col-md-6 border-blog">
                                        <div className="blog-style2">
                                            <div className="blog-img">
                                                <img src="assets/img/blog/blog_3_5.jpg" alt="blog image"/>
                                            </div>
                                            <div className="blog-content">
                                                <a data-theme-color="#868101" href="blog.html" className="category">Action</a>
                                                <h3 className="box-title-18"><a className="hover-line" href="blog-details.html">Adventure awaits, seize the moment</a></h3>
                                                <div className="blog-meta">
                                                    <a href="blog.html"><i className="fal fa-calendar-days"></i>23 Mar, 2023</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="tab-pane fade" id="nav3-three" role="tabpanel" aria-labelledby="nav3-three-tab">
                                <div className="row gy-4">
                                    <div className="col-xl-12 col-md-6 border-blog">
                                        <div className="blog-style2">
                                            <div className="blog-img">
                                                <img src="assets/img/blog/blog_3_3.jpg" alt="blog image"/>
                                            </div>
                                            <div className="blog-content">
                                                <a data-theme-color="#00D084" href="blog.html" className="category">Life Style</a>
                                                <h3 className="box-title-18"><a className="hover-line" href="blog-details.html">Style your life news For modern living</a></h3>
                                                <div className="blog-meta">
                                                    <a href="blog.html"><i className="fal fa-calendar-days"></i>15 Mar, 2023</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-xl-12 col-md-6 border-blog">
                                        <div className="blog-style2">
                                            <div className="blog-img">
                                                <img src="assets/img/blog/blog_3_4.jpg" alt="blog image"/>
                                            </div>
                                            <div className="blog-content">
                                                <a data-theme-color="#4E4BD0" href="blog.html" className="category">Sports</a>
                                                <h3 className="box-title-18"><a className="hover-line" href="blog-details.html">Score big with the Latest sports news.</a></h3>
                                                <div className="blog-meta">
                                                    <a href="blog.html"><i className="fal fa-calendar-days"></i>30 Mar, 2023</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-xl-12 col-md-6 border-blog">
                                        <div className="blog-style2">
                                            <div className="blog-img">
                                                <img src="assets/img/blog/blog_3_5.jpg" alt="blog image"/>
                                            </div>
                                            <div className="blog-content">
                                                <a data-theme-color="#868101" href="blog.html" className="category">Action</a>
                                                <h3 className="box-title-18"><a className="hover-line" href="blog-details.html">Adventure awaits, seize the moment</a></h3>
                                                <div className="blog-meta">
                                                    <a href="blog.html"><i className="fal fa-calendar-days"></i>16 Mar, 2023</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-xl-12 col-md-6 border-blog">
                                        <div className="blog-style2">
                                            <div className="blog-img">
                                                <img src="assets/img/blog/blog_3_6.jpg" alt="blog image"/>
                                            </div>
                                            <div className="blog-content">
                                                <a data-theme-color="#868101" href="blog.html" className="category">Thriller</a>
                                                <h3 className="box-title-18"><a className="hover-line" href="blog-details.html">brace yourself for thrilling adventure.</a></h3>
                                                <div className="blog-meta">
                                                    <a href="blog.html"><i className="fal fa-calendar-days"></i>24 Mar, 2023</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    </section>

    </div>
  );
};

export default Home;
