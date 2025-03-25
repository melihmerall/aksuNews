"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDate } from "/app/DateContext";
const SimpleDetailsNewCard = ({ news, type }) => {
  const formatDate = useDate();
  return (
    <div className="col-sm-6 col-xl-4">
      <div className="blog-style1">
        <div className="blog-img">
        <img style={{ height: "250px", width: "450px" }} src={`http://localhost:5173${news?.image || "/default.jpg"}`} alt="blog image" />

          <a data-theme-color="#00D084" href="/" className="category">
            {news?.category}
          </a>
        </div>
        <h3 className="box-title-22">
          <a className="hover-line" href={`/news/${news?.slug}`}  >
            {news?.title}
          </a>
        </h3>
        <div className="blog-meta">
          <a href="/">
            <i className="far fa-user"></i>
            {news?.writerName}
          </a>
          <a href="/">
            <i className="fal fa-calendar-days"></i> {formatDate(news?.date)}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SimpleDetailsNewCard;
