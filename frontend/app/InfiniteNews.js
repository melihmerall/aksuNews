"use client";
import { useEffect, useState, useRef } from "react";
import { base_api_url } from "@/config/config";
import FullNewsCard from "@/app/FullNewsCard";

const InfiniteNews = () => {
  const [page, setPage] = useState(1);
  const [newsList, setNewsList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchMoreNews = async () => {
      if (!hasMore) return;

      try {
        const res = await fetch(`${base_api_url}/api/recent/news?page=${page}&limit=5`);
        const data = await res.json();
        setNewsList(prev => [...prev, ...data.news]);
        setHasMore(data.hasMore);
      } catch (error) {
        console.error("Son haberler alınamadı:", error);
      }
    };

    fetchMoreNews();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loaderRef, hasMore]);

  return (
    <>
      <div className="space-y-4 mt-10">
        {newsList.map((item, i) => (
          <div key={`${item._id}-${i}`}>
            <FullNewsCard news={item} />
            {i !== newsList.length - 1 && (
              <hr className="my-10 border-t border-dashed border-gray-300" />
            )}
          </div>
        ))}
      </div>
      <div
        ref={loaderRef}
        className="h-10 mt-4 text-center text-sm text-gray-400"
      >
        {hasMore ? "Yükleniyor..." : "Tüm haberler yüklendi."}
      </div>
    </>
  );
};

export default InfiniteNews;
