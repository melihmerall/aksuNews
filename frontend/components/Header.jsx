"use client";

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";
import logo from '../public/assets/logo.png';
import bg_header from '../public/assets/header-bg.jpg';
import Image from 'next/image';
import Header_Category from './Header_Category';
import 'moment/locale/tr';
import { base_api_url } from '@/config/config';

moment.locale('tr');

const Header = () => {
  const [adsInfo, setAdsInfo] = useState({});

  useEffect(() => {
    const fetchAdsInfo = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/ads`);
        const data = await res.json();
        setAdsInfo(data.ads || {});
      } catch (error) {
        console.error("Reklam bilgileri alınamadı:", error);
      }
    };
    fetchAdsInfo();
  }, []);

  const today = new Date().toLocaleDateString("tr-TR", {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <header className='th-header header-layout1'>
      {/* Üst Menü */}
      <div className="header-top">
        <div className="container">
          <div className="row justify-content-center justify-content-lg-between align-items-center gy-2">
            <div className="col-auto d-none d-lg-block">
              <div className="header-links">
                <ul>
                  <li><i className="fal fa-calendar-days"></i><a href="#">{today}</a></li>
                  {/* <li><a href="/privacy">Privacy Policy</a></li>
                  <li><a href="/terms">Terms & Conditions</a></li> */}
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
                      <a href="https://www.facebook.com/aksutvhaber"><FaFacebookF /></a>
                      <a href="https://x.com/aksutv"><FaTwitter /></a>
                      <a href="https://www.youtube.com/aksutvhaber"><FaYoutube /></a>
                      <a href="https://api.whatsapp.com/send?phone=05051417272"><FaWhatsapp /></a>
                      <a href="https://www.instagram.com/aksutv/"><FaInstagram /></a>


                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orta Logo + Reklam */}
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
            <div className="col-auto d-none d-lg-block">
              <div className="header-logo">
                <a href="/">
                  <Image className="light-img" src={logo} alt="Tnews" width={200} height={100} priority />
                </a>
              </div>
            </div>

            {/* Reklam Alanı */}
            {adsInfo?.headerAdsImageUrl && (
              <div className="col-lg-8 text-end d-none d-md-block">
                <div className="header-ads">
  <a href="#">
    <Image
      className="img-fluid"
      src={`http://localhost:5173${adsInfo?.headerAdsImageUrl}`}
      alt="Header Reklam"
      width={728}
      height={90}
      priority
      style={{
        width: "728px",
        height: "100px",
        objectFit: "cover",
        borderRadius: "6px"
      }}
    />
  </a>
</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Kategoriler */}
      <Header_Category />
    </header>
  );
};

export default Header;
