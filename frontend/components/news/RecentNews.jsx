"use client";
import Title from "../Title";
import NewsCard from "./item/NewsCard";
import { base_api_url } from "@/config/config";
import { useDate } from "/app/DateContext";
import React, { useEffect, useState } from "react";

const RecentNews = () => {
  const [news, setNews] = useState([]); // Haberleri tutacak state
  const formatDate = useDate(); // Tarihi formatlayan fonksiyon

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/recent/news`);
        const data = await res.json();

        setNews(data.news);

      } catch (error) {
        console.error("Hata oluştu:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="widget">
      <h3 className="widget_title">Son Haberler</h3>
      <div className="recent-post-wrap">
        {news.length > 0 ? (
          news.map((item, i) => (
            <div className="recent-post" key={i}>
              <div className="media-img">
                <a href={`/news/${item?.slug}`}>
                  <img src={`http://localhost:5173${item?.image || "/default.jpg"}`} alt="Blog Image" />
                </a>
              </div>

              <div className="media-body">
                <h4 className="post-title">
                  <a className="hover-line" href={`/news/${item?.slug}`}>
                    {item?.title}
                  </a>
                </h4>
                <div className="recent-post-meta">
                  <a href={`/news/${item?.slug}`}>
                    <i className="fal fa-calendar-days"></i> {formatDate(item?.date)}
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Son haberler yükleniyor...</p>
        )}
      </div>
    </div>
  );
};

export default RecentNews;
