import React from 'react';
import moment from 'moment';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import logo from '../public/assets/logo.png'
import adver_image from '../public/assets/add.png'
import bg_header from '../public/assets/header-bg.jpg'
import Image from 'next/image';
import Header_Category from './Header_Category';
import 'moment/locale/tr'; // Türkçe dil desteğini ekleyin

moment.locale('tr'); // Dil ayarını Türkçe yapın

const Header = () => {
    const today = new Date().toLocaleDateString("tr-TR", {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    return (
        <header className='th-header header-layout1'>
        <div className="header-top">
            <div className="container">
                <div className="row justify-content-center justify-content-lg-between align-items-center gy-2">
                    <div className="col-auto d-none d-lg-block">
                        <div className="header-links">
                            <ul>
                                <li><i className="fal fa-calendar-days"></i><a href="blog.html">{today}</a></li>
                                <li><a href="about.html">Privacy Policy</a></li>
                                <li><a href="about.html">Terms & Conditions</a></li>
                                <li>
                                    <a className="theme-toggler" href="#">
                                        <span className="dark"><i className="fas fa-moon"></i>Siyah Mod</span>
                                        <span className="light"><i className="fas fa-sun-bright"></i>Açık Mod</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="header-links">
                            <ul>
                                <li>
                                    <div className="social-links">
                                        <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
                                        <a href="https://www.twitter.com/"><i className="fab fa-twitter"></i></a>
                                        <a href="https://www.linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                                        <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
                                        <a href="https://www.youtube.com/"><i className="fab fa-youtube"></i></a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    
        <div 
            className="header-middle text-center text-white py-4" 
            style={{ 
                backgroundImage: `url(${bg_header.src})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
            }}
        >
            <div className="container">
                <div className="row justify-content-center justify-content-lg-between align-items-center">
                    
                    {/* Logo Alanı */}
                    <div className="col-auto d-none d-lg-block">
                        <div className="header-logo">
                            <a href="home-newspaper.html">
                                <Image className="light-img" src={logo} alt="Tnews" width={200} height={100} priority />
                            </a>
                        </div>
                    </div>

                    {/* Reklam Alanı */}
                    <div className="col-lg-8 text-end d-none d-md-block">
                        <div className="header-ads">
                            <a href="https://themeforest.net/user/themeholy/portfolio">
                                <Image className="img-fluid" src={adver_image} alt="ads" width={728} height={90} priority />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    

        <Header_Category/> 
        </header>
    );
};

export default Header;