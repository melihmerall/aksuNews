import Breadcrumb from "@/components/Breadcrumb";
import Category from "@/components/Category";
import SimpleDetailsNewCard from "@/components/news/item/SimpleDetailsNewCard";
import PopularNews from "@/components/news/PopularNews";
import RecentNews from "@/components/news/RecentNews";
import Search from "@/components/news/Search";
import { base_api_url } from "@/config/config";
import React from "react";

// ✅ Server Component içinde fetch işlemi yapılıyor
const CategoryNews = async ({ params }) => {
  const { category } = await params;

  let news = [];
  try {
    const res = await fetch(`${base_api_url}/api/category/news/${category}`, {
      next: { revalidate: 1 }, // Sayfanın 1 saniye içinde yeniden validasyon yapmasını sağlıyor
    });

    if (!res.ok) throw new Error("Failed to fetch news");
    const data = await res.json();
    news = data.news;
    console.log("news:", news + " " + category) ;
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  return (
    <div>
      {/* Breadcrumb Section */}
      <div className="breadcumb-wrapper">
        <div className="container">
          <ul className="breadcumb-menu">
            <li><a href="/">Anasayfa</a></li>
            <li><a href={`/news/category/${category}`}>{category}</a></li>
          </ul>
        </div>
      </div>

      {/* News Section */}
      <section className="space">
        <div className="container">
          <div className="row gy-30">
            {news.length > 0 ? (
              news.slice(0, 7).map((item) => (
                <div key={item.id} className="col-xl-3 col-lg-4 col-sm-6">
                  <div className="blog-style1">
                    <div className="blog-img">
                      <a href={`/news/${item.slug}`}><img src={`http://localhost:5173${item?.image}`} alt={item.title} /></a>
                      <a data-theme-color="#59C2D6" href={`/news/category/${item.category}`} className="category">
                        {category}
                      </a>
                    </div>
                    <h3 className="box-title-20">
                      <a className="hover-line" href={`/news/${item.slug}`}>{item.title}</a>
                    </h3>
                    <div className="blog-meta">
                      <a ><i className="far fa-user"></i>{item.writerName}</a>
                      <a href="#"><i className="fal fa-calendar-days"></i>  {new Date(item.createdAt).toLocaleDateString()}
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Bu kategoride henüz haber bulunmamaktadır.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryNews;
