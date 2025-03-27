"use client";
import Link from "next/link";
import { useDate } from "@/app/DateContext";

const FullNewsCard = ({ news }) => {
  const formatDate = useDate();

  return (
    <div className="mb-20 pb-10">
      {/* Başlık (linkli) */}
      <h2 className="text-3xl font-bold mb-3">
        <Link href={`/news/${news.slug}`} className="hover:text-red-600">
          {news.title}
        </Link>
      </h2>

      {/* Meta bilgiler */}
      <div className="text-sm text-gray-500 mb-4">
        {formatDate(news.date)} |{" "}
        <span className="text-blue-600">{news.writerName}</span> | {news.count}{" "}
        <i className="fas fa-eye"></i>
      </div>

      {/* Görsel veya Video */}
      {news.video ? (
        <video controls width="100%" className="rounded mb-4">
          <source src={`http://localhost:5173${news.video}`} type="video/mp4" />
          Tarayıcınız video etiketini desteklemiyor.
        </video>
      ) : (
        <img
          src={`http://localhost:5173${news.image || "/default.jpg"}`}
          alt={news.title}
          className="w-full max-h-[450px] object-cover rounded mb-4"
        />
      )}

      {/* İçerik */}
    

      {/* Kategori (alt kısımda) */}
      <div className="mt-4">
        <Link
          href={`/news/category/${news.category?.toLowerCase() || ""}`}
          className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
        >
          {news.category}
        </Link>
      </div>
      <div className="blog-content-wrap">
                  <div className="share-links-wrap">
                    <div className="share-links">
                      <span className="share-links-title">Paylaş:</span>
                      <div className="multi-social">
                        <a href="https://facebook.com/" target="_blank">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com/" target="_blank">
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://linkedin.com/" target="_blank">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="https://pinterest.com/" target="_blank">
                          <i className="fab fa-pinterest-p"></i>
                        </a>
                        <a href="https://instagram.com/" target="_blank">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="blog-content">

                    <div className="content">
                      <div
                        dangerouslySetInnerHTML={{ __html: news?.description }}
                      />
                    </div>
                  </div>
                </div>
    </div>
  );
};

export default FullNewsCard;
