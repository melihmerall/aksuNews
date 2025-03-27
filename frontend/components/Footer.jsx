import React from "react";
import logo from "../public/assets/logo.png";
import Image from "next/image";
import Gallery from "./news/Gallery";
import Category from "./Category";
import RecentNewsFooter from "./news/RecentNewsFooter";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = ({ categories = [], recentPosts = [], companyInfo = {} }) => {
  return (
    <footer
      className="footer-wrapper footer-layout1"
      src="assets/img/bg/footer_bg_1.png"
    >
      <div className="widget-area">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-3 col-xl-3">
              <div className="widget footer-widget">
                <div className="th-widget-about">
                  <div className="about-logo">
                    <a href="home-newspaper.html">
                      <img src="/assets/logo.png" alt="Tnews" />
                    </a>
                  </div>
                  <p className="about-text">
                    aksutvhaber.net, yepyeni temasıyla sizleri buluştururken,
                    sadelik ve modernizmi bir araya getiriyor. Şatafattan
                    kaçınıyor ve insanlara haber okuyabilecekleri bir altyapı
                    sunuyor.
                  </p>
                  <div className="th-social style-black">
                    <a href="https://www.facebook.com/aksutvhaber">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://x.com/aksutv">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.instagram.com/aksutv/">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.youtube.com/aksutvhaber">
                      <i className="fab fa-youtube"></i>
                    </a>
                    <a href="https://api.whatsapp.com/send?phone=05051417272">
                      <i className="fab fa-whatsapp"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-xl-auto">
              <div className="widget widget_nav_menu footer-widget">
                <div className="menu-all-pages-container">
                  <ul className="menu">
                    {categories.map((cat, i) => (
                      <li key={i}>
                        <a href={`/news/category/${cat.slug}`}>{cat.category}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-xl-auto">
              <div className="widget footer-widget">
                <div className="recent-post-wrap">
                  {recentPosts.map((post, i) => (
                    <div className="recent-post" key={i}>
                      <div className="media-img">
                        <a href={`/news/${post.slug}`}>
                          <img
                            src={`http://localhost:5173${post.image}`}
                            alt={post.title}
                          />
                        </a>
                      </div>
                      <div className="media-body">
                        <h4 className="post-title">
                          <a className="hover-line" href={`/news/${post.slug}`}>
                            {post.title}
                          </a>
                        </h4>
                        <div className="recent-post-meta">
                          <a href="#">
                            <i className="fal fa-calendar-days"></i>{" "}
                            {new Date(post.createdAt).toLocaleDateString()}
                          </a>
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
      <div className="copyright-wrap">
        <div className="container">
          <div className="row jusity-content-between align-items-center">
            <div className="col-lg-5">
              <p className="copyright-text">
                Copyright <i className="fal fa-copyright"></i> {" "}
                <a href="/">Aksu Haber</a>. Tüm hakları saklıdır.
              </p>
            </div>
            <div className="col-lg-auto ms-auto d-none d-lg-block">
              <div className="footer-links">
                <ul>
                  <li>
                    <a href="/">Anasayfa</a>
                  </li>
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
