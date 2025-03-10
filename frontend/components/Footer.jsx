import React from 'react';
import logo from '../public/assets/logo.png'
import Image from 'next/image';
import Gallery from './news/Gallery';
import Category from './Category';
import RecentNewsFooter from './news/RecentNewsFooter';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer-wrapper footer-layout1" src="assets/img/bg/footer_bg_1.png">
        <div className="widget-area">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-md-6 col-xl-3">
                        <div className="widget footer-widget">
                            <div className="th-widget-about">
                                <div className="about-logo">
                                    <a href="home-newspaper.html"><img src="/assets/logo.png" alt="Tnews"/></a>
                                </div>
                                <p className="about-text">Magazines cover a wide subjects, including not limited to fashion, lifestyle, health, politics, business, Entertainment, sports, science,</p>
                                <div className="th-social style-black">
                                    <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
                                    <a href="https://www.twitter.com/"><i className="fab fa-twitter"></i></a>
                                    <a href="https://www.linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                                    <a href="https://www.whatsapp.com/"><i className="fab fa-whatsapp"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-auto">
                        <div className="widget widget_nav_menu footer-widget">
                            <h3 className="widget_title">Categories</h3>
                            <div className="menu-all-pages-container">
                                <ul className="menu">
                                    <li><a href="blog.html">Political</a></li>
                                    <li><a href="blog.html">Business</a></li>
                                    <li><a href="blog.html">Health</a></li>
                                    <li><a href="blog.html">Technology</a></li>
                                    <li><a href="blog.html">Sports</a></li>
                                    <li><a href="blog.html">Entertainment</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-auto">
                        <div className="widget footer-widget">
                            <h3 className="widget_title">Recent Posts</h3>
                            <div className="recent-post-wrap">
                                <div className="recent-post">
                                    <div className="media-img">
                                        <a href="blog-details.html"><img src="/assets/img/blog/recent-post-2-1.jpg" alt="Blog Image"/></a>
                                    </div>
                                    <div className="media-body">
                                        <h4 className="post-title"><a className="hover-line" href="blog-details.html">Equality and justice for Every citizen</a></h4>
                                        <div className="recent-post-meta">
                                            <a href="blog.html"><i className="fal fa-calendar-days"></i>21 June, 2023</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="recent-post">
                                    <div className="media-img">
                                        <a href="blog-details.html"><img src="/assets/img/blog/recent-post-2-2.jpg" alt="Blog Image"/></a>
                                    </div>
                                    <div className="media-body">
                                        <h4 className="post-title"><a className="hover-line" href="blog-details.html">Key eyes on the latest update of technology</a></h4>
                                        <div className="recent-post-meta">
                                            <a href="blog.html"><i className="fal fa-calendar-days"></i>22 June, 2023</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <div className="widget widget_tag_cloud footer-widget">
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
                    </div>
                </div>
            </div>
        </div>
        <div className="copyright-wrap">
            <div className="container">
                <div className="row jusity-content-between align-items-center">
                    <div className="col-lg-5">
                        <p className="copyright-text">Copyright <i className="fal fa-copyright"></i> 2023 <a href="home-newspaper.html">Tnews</a>. All Rights Reserved.</p>
                    </div>
                    <div className="col-lg-auto ms-auto d-none d-lg-block">
                        <div className="footer-links">
                            <ul>
                                <li><a href="home-newspaper.html">Home</a></li>
                                <li><a href="about.html">About Us</a></li>
                                <li><a href="about.html">Faq</a></li>
                                <li><a href="contact.html">Contact Us</a></li>
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
