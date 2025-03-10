"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { use, useState, useEffect } from "react";
import { IoMdList, IoMdCloseCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { base_api_url } from "../config/config";
import { get } from "jquery";
const Header_Category = () => {
  const [categories, set_categories] = useState([]);
  
  const get_categories = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/category/all`);
      const data = await res.json();
      set_categories(data.categories);
      console.log(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    get_categories();
  }, []);
  const path = usePathname();
  const data = [
    { id: 1, name: "TÜRKİYE", slug: "turkiye" },
    { id: 2, name: "KAHRAMANMARAŞ", slug: "kahramanmaras" },
    { id: 4, name: "GÜNDEM", slug: "gundem" },
    { id: 5, name: "POLİTİKA", slug: "politika" },
    { id: 6, name: "SPOR", slug: "spor" },
    { id: 7, name: "YAŞAM", slug: "yasam" },
    { id: 8, name: "DÜNYA", slug: "dunya" },
  ];

  const [cate_show, setCateShow] = useState(false);

  return (
    <div className="sticky-wrapper">
      <div className="menu-area">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            {/* Logo (Sadece Mobil) */}
            <div className="col-auto d-lg-none d-block">
              <div className="header-logo">
                <a href="home-newspaper.html">
                  <img src="assets/logo.png" alt="Aksu" />
                </a>
              </div>
            </div>

            {/* Mobil Menü Aç/Kapa Butonu */}
            <div className="col-auto d-lg-none d-block">
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
              <nav className="main-menu">
                <ul>
                  <li>
                    <Link
                      className="px-3 py-2 fw-medium text-decoration-none text-light"
                      href="https://www.aksutvhaber.net/aksutv-canli-yayin"
                    >
                      CANLI YAYIN
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="px-3 py-2 fw-medium text-decoration-none text-light"
                      href="/"
                    >
                      ANA SAYFA
                    </Link>
                  </li>
                  {data.length > 0 && data.map((c,index) => (
                    <li key={`${c._id}-${index}`}>
                      <Link
                        className="px-3 py-2 fw-medium text-decoration-none text-light"
                        href={`/news/category/${c.slug.toLowerCase()}`}                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Mobil Menü (Açık olduğunda göster) */}
      {cate_show && (
        <div className="container d-flex flex-wrap d-lg-none py-2">
          {data.length > 0 && data.map((c) => (
            <Link
              key={c._id}
              className="px-3 py-2 fw-medium text-decoration-none"
              href={`/news/category/${c.slug.toLowerCase()}`}
            >
              {c.name}
            </Link>
          ))}s
        </div>
      )}
    </div>
  );
};

export default Header_Category;
