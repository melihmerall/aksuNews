"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { IoMdList, IoMdCloseCircle, IoMdArrowDropdown } from "react-icons/io";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { base_api_url } from "../config/config";

const Header_Category = () => {
  const path = usePathname();
  const [cate_show, setCateShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const menuRef = useRef(null); // Menü pozisyonunu ayarlamak için ref
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAll && menuRef.current && !menuRef.current.contains(event.target)) {
        setShowAll(false);
      }
    };
  
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showAll]);
  const handleLinkClick = () => {
    setShowAll(false);
  };
  // ✅ API'den kategorileri çekme
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/category/all`);
        const data = await res.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Kategoriler yüklenirken hata oluştu:", error);
      }
    };

    fetchCategories();
  }, []);

  // ✅ Maksimum 7 kategori gösterelim
  const visibleCategories = categories.slice(0, 7);
  const extraCategories = categories.slice(7); // Fazladan olanlar

  return (
    <div  className="sticky-wrapper">
      <div  className="menu-area" ref={menuRef}>
        <div  className="container">
          <div className="row align-items-center justify-content-between">
            {/* Logo (Sadece Mobil) */}
            <div className="col-auto d-lg-none d-block">
              <div className="header-logo">
                <a href="/">
                  <img src="/assets/logo.png" alt="Aksu" />
                </a>
              </div>
            </div>

            {/* Mobil Menü Aç/Kapa Butonu */}
            <div  className="col-auto d-lg-none d-block">
              <button
                onClick={() => setCateShow(!cate_show)}
                className="btn btn-link p-0"
                aria-label="Mobil menüyü aç/kapat"
              >
                {cate_show ? (
                  <IoMdCloseCircle size={24} />
                ) : (
                  <IoMdList size={24} />
                )}
              </button>
            </div>

            {/* Normal Menü (Desktop) */}
            <div className="col-auto d-none d-lg-block">
              <nav className="main-menu d-flex align-items-center">
                <ul className="d-flex align-items-center">
                  <li key="live">
                    <Link className="px-3 py-2 fw-medium text-decoration-none text-light" href="https://www.aksutvhaber.net/aksutv-canli-yayin">
                      CANLI YAYIN
                    </Link>
                  </li>

                  {categories.length > 0 ? (
                    <>
                      {visibleCategories.map((c, index) => (
                        <li key={c._id || index}>
                          <Link className="px-3 py-2 fw-medium text-decoration-none text-light" href={`/news/category/${c.slug.toLowerCase()}`}>
                            {c.category}
                          </Link>
                        </li>
                      ))}
                      {extraCategories.length > 0 && (
                        <li>
                          <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-3 py-2 fw-medium text-decoration-none text-light border-0 bg-transparent d-flex align-items-center"
                          >
                            {showAll ? "Daha Az" : "Daha Fazla"} <IoMdArrowDropdown size={18} />
                          </button>
                        </li>
                      )}
                    </>
                  ) : (
                    <li key="loading">
                      <span className="text-light">Kategoriler yükleniyor...</span>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ "Daha Fazla" Açılır Menü (Kategori menüsünün hemen altında açılıyor) */}
      {showAll && (
        <div
          className="floating-menu"
          style={{
          }}
        >
          <div className="container p-4 bg-white shadow-lg rounded">
            <div className="row g-3">
              {/* Ekstra Kategoriler */}
              <div className="col-md-4">
              <h5 className="fw-bold  border-bottom pb-2" style={{ color: "#FF1D50" }}>
  Ekstra Kategoriler
</h5>                {extraCategories.map((c, index) => (
  <Link
  key={c._id || index}
  href={`/news/category/${c.slug}`}
  className="d-block border-bottom pb-2 mb-2 text-dark"
  onClick={() => setShowAll(false)}
>
  {c.category}
</Link>
                ))}
              </div>

              {/* Özel Linkler (Nöbetçi Eczane, Hava Durumu vs.) */}
              <div className="col-md-4">
                <h5 className="fw-bold  border-bottom pb-2" style={{ color: "#FF1D50" }}>Faydalı Bağlantılar</h5>
                <Link
  href="https://www.aksutvhaber.net/kahramanmaras-nobetci-eczaneler"
  className="d-block border-bottom pb-2 mb-2 text-dark"
  onClick={() => setShowAll(false)}
>
  Nöbetçi Eczaneler
</Link>
                <Link href="https://www.aksutvhaber.net/kahramanmaras-hava-durumu" onClick={() => setShowAll(false)} className="d-block border-bottom pb-2 mb-2 text-dark">
                  Hava Durumu
                </Link>
                <Link href="https://www.aksutvhaber.net/kahramanmaras-namaz-vakitleri" onClick={() => setShowAll(false)} className="d-block border-bottom pb-2 mb-2 text-dark">
                  Namaz Vakitleri
                </Link>
              </div>

              {/* Sosyal Medya İkonları */}
              <div className="col-md-4 text-center">
                <h5 className="fw-bold  border-bottom pb-2" style={{ color: "#FF1D50" }}>Bizi Takip Edin</h5>
                <div className="d-flex justify-content-center">
                  <a href="https://www.facebook.com/aksutvhaber" target="_blank" rel="noopener noreferrer" className="text-dark mx-2">
                    <FaFacebookF size={24} />
                  </a>
                  <a href="https://x.com/aksutv" target="_blank" rel="noopener noreferrer" className="text-dark mx-2">
                    <FaTwitter size={24} />
                  </a>
                  <a href="https://www.instagram.com/aksutv/" target="_blank" rel="noopener noreferrer" className="text-dark mx-2">
                    <FaInstagram size={24} />
                  </a>
                  <a href="https://www.youtube.com/aksutvhaber" target="_blank" rel="noopener noreferrer" className="text-dark mx-2">
                    <FaYoutube size={24} />
                  </a>
                  <a href="https://api.whatsapp.com/send?phone=05051417272" target="_blank" rel="noopener noreferrer" className="text-dark mx-2">
                    <FaWhatsapp size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ CSS Stilleri */}
      <style jsx>{`
        .floating-menu {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          z-index: 999;
          background: white;
          border-radius: 10px;
          padding: 15px;
          transition: all 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Header_Category;
