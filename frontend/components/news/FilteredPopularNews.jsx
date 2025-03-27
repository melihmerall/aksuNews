"use client";
import { useEffect, useState } from "react";
import { base_api_url } from "@/config/config";

const FilteredPopularNews = () => {
  const [activeCategory, setActiveCategory] = useState("Hepsi");
  const [newsList, setNewsList] = useState([]);

  const categories = [
    { label: "Hepsi", value: "Hepsi", class: "*" },
    { label: "Gündem", value: "gundem", class: "cat1" },
    { label: "Dünya", value: "dunya", class: "cat2" },
    { label: "Bilim", value: "bilim", class: "cat3" },
    { label: "Teknoloji", value: "teknoloji", class: "cat4" },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let url =
          activeCategory === "Hepsi"
            ? `${base_api_url}/api/popular/news`
            : `${base_api_url}/api/popular/news/category/${encodeURIComponent(activeCategory)}`;

        console.log("📡 API URL:", url);
        const res = await fetch(url);
        const data = await res.json();
        console.log("📥 Gelen Veri:", data);

        setNewsList(data.popularNews  || data.news );
      } catch (error) {
        console.error("❌ Haberler alınamadı:", error);
        setNewsList([]);
      }
    };

    fetchNews();
  }, [activeCategory]);

  return (
    <div className="col-xl-9">
      <div className="row align-items-center">
        <div className="col">
          <h2 className="sec-title has-line">Popüler Haberler</h2>
        </div>
        <div className="col-auto">
          <div className="sec-btn">
            <div className="filter-menu filter-menu-active">
              {categories.map((cat, index) => (
                <button
                  key={index}
                  className={`tab-btn ${activeCategory === cat.value ? "active" : ""}`}
                  type="button"
                  onClick={() => setActiveCategory(cat.value)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="filter-active mt-4">
        {newsList.length > 0 ? (
          newsList.map((news, index) => (
            <div key={index} className={`border-blog2 filter-item cat${(index % 4) + 1}`}>
              <div className="blog-style4">
                <div className="blog-img">
                  <img
                    src={`http://localhost:5173${news?.image || "/default.jpg"}`}
                    alt={news?.title || "blog image"}
                    onError={(e) => (e.currentTarget.src = "/default.jpg")}
                  />
                </div>
                <div className="blog-content">
                  <a
                    data-theme-color="#007BFF"
                    href={`/news/category/${news.category}`}
                    className="category"
                  >
                    {news.category}
                  </a>
                  <h3 className="box-title-24">
                    <a className="hover-line" href={`/news/${news.slug}`}>
                      {news.title}
                    </a>
                  </h3>
                  <p className="blog-text">
                    {news.description?.replace(/<[^>]+>/g, "").slice(0, 120) || "Açıklama yok."}
                  </p>
                  <div className="blog-meta">
                    <a href={`/author/${news.writerName}`}>
                      <i className="far fa-user"></i> {news.writerName}
                    </a>
                    <a href="#">
                      <i className="fal fa-calendar-days"></i>{" "}
                      {news.createdAt
                        ? new Date(news.createdAt).toLocaleDateString()
                        : ""}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-4 text-muted animate-pulse">Haber bulunamadı.</p>
        )}
      </div>
      <br></br>

    </div>

  );
};

export default FilteredPopularNews;
