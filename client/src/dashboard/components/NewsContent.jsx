import React, { useContext, useEffect, useState } from 'react';
import profile from '../../assets/profile.png';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import storeContext from '../../context/storeContext';
import { base_url } from '../../config/config';
import axios from 'axios';
import { convert } from 'html-to-text';
import { toast } from 'react-hot-toast';

const NewsContent = () => {

    const { store } = useContext(storeContext);
    const [news, setNews] = useState([]);
    const [allNews, setAllNews] = useState([]);

    const [parPage, setParPage] = useState(5);
    const [pages, setPages] = useState(0);
    const [page, setPage] = useState(1);

    const getNews = async () => {
        try {
            const { data } = await axios.get(`${base_url}/api/news`, {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            });
            setAllNews(data.news);
            setNews(data.news);
        } catch (error) {
        }
    };

    useEffect(() => {
        getNews();
    }, []);

    useEffect(() => {
        if (news.length > 0) {
            const calculatePages = Math.ceil(news.length / parPage);
            setPages(calculatePages);
        }
    }, [news, parPage]);

    const deleteNews = async (newsId) => {
        if (window.confirm('Silmek istediğinize emin misiniz?')) {
            try {
                const { data } = await axios.delete(`${base_url}/api/news/delete/${newsId}`, {
                    headers: {
                        'Authorization': `Bearer ${store.token}`
                    }
                });
                toast.success(data.message);
                getNews();
            } catch (error) {
            }
        }
    };

    const searchNews = (e) => {
        const filteredNews = allNews.filter(n => n.title.toLowerCase().includes(e.target.value.toLowerCase()));
        setNews(filteredNews);
        setPage(1);
    };

    const typeFilter = (e) => {
        if (e.target.value === '') {
            setNews(allNews);
        } else {
            const filteredNews = allNews.filter(n => n.status === e.target.value);
            setNews(filteredNews);
        }
        setPage(1);
    };

    const [res, setRes] = useState({
        id: '',
        loader: false
    });

    const updateStatus = async (status, newsId) => {
        try {
            setRes({
                id: newsId,
                loader: true
            });
            const { data } = await axios.put(`${base_url}/api/news/status-update/${newsId}`, { status }, {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            });
            setRes({ id: '', loader: false });
            toast.success(data.message);
            getNews();
        } catch (error) {
            setRes({ id: '', loader: false });
        }
    };

    return (
<div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen p-4">
  <div className="flex items-center flex-wrap gap-4 mb-6">
    <select
      onChange={typeFilter}
      name="status"
      className="w-48 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
    >
      <option value="">--- Hepsi ---</option>
      <option value="onayBekliyor">Onay Bekliyor</option>
      <option value="aktif">Aktif</option>
      <option value="deaktif">Deaktif</option>
    </select>
    <input
      onChange={searchNews}
      type="text"
      placeholder="Haber Ara"
      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
    />
  </div>

  {/* Masaüstü Tablo Görünümü */}
  <div className="hidden lg:block overflow-x-auto">
    <table className="w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <thead className="bg-blue-100 text-gray-700 uppercase text-sm">
        <tr>
          <th className="py-4 px-6 text-left">No</th>
          <th className="py-4 px-6 text-left">Başlık</th>
          <th className="py-4 px-6 text-left">Resim</th>
          <th className="py-4 px-6 text-left">Kategori</th>
          <th className="py-4 px-6 text-left">Üst Kategori</th>
          <th className="py-4 px-6 text-left">Açıklama</th>
          <th className="py-4 px-6 text-left">Tarih</th>
          <th className="py-4 px-6 text-left">Durum</th>
          <th className="py-4 px-6 text-left">Aksiyon</th>
        </tr>
      </thead>
      <tbody className="text-gray-600">
        {news.length > 0 &&
          news.slice((page - 1) * parPage, page * parPage).map((n, i) => (
            <tr key={i} className="border-t hover:bg-gray-50 transition">
              <td className="py-4 px-6">{i + 1}</td>
              <td className="py-4 px-6 font-medium text-gray-800">{n.title.slice(0, 15)}...</td>
              <td className="py-4 px-6">
                <img className="w-10 h-10 rounded-full object-cover shadow-md" src={n.image} alt="news" />
              </td>
              <td className="py-4 px-6">{n.category}</td>
              <td className="py-4 px-6">{n.bigCategory}</td>
              <td className="py-4 px-6">{convert(n.description).slice(0, 15)}...</td>
              <td className="py-4 px-6">{n.date}</td>
              <td className="py-4 px-6">{n.status}</td>
              <td className="py-4 px-6 flex gap-2">
                <Link to="#" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition">
                  <FaEye />
                </Link>
                <Link to={`/dashboard/news/edit/${n._id}`} className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-700 transition">
                  <FaEdit />
                </Link>
                <button onClick={() => deleteNews(n._id)} className="p-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>

  {/* Mobil Kart Görünümü */}
  <div className="block lg:hidden space-y-4">
    {news.length > 0 &&
      news.slice((page - 1) * parPage, page * parPage).map((n, i) => (
        <div key={i} className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{n.title.slice(0, 15)}...</h3>
          <img className="w-full h-40 rounded-md object-cover mb-2" src={n.image} alt="news" />
          <p className="text-sm text-gray-600 mb-2">{convert(n.description).slice(0, 50)}...</p>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Kategori: {n.category}</span>
            <span>Tarih: {n.date}</span>
          </div>
          <div className="flex mt-3 gap-2">
            <Link to="#" className="flex-1 text-center py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition">
              Görüntüle
            </Link>
            <button
              onClick={() => deleteNews(n._id)}
              className="flex-1 text-center py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition"
            >
              Sil
            </button>
          </div>
        </div>
      ))}
  </div>
</div>
    );
};

export default NewsContent;
