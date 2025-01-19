import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { base_url } from '../../config/config';
import axios from 'axios';
import storeContext from '../../context/storeContext';

const Adminindex = () => {
    const { store } = useContext(storeContext);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [stats, setStats] = useState({
        totalNews: 0,
        pendingNews: 0,
        activeNews: 0,
        deactiveNews: 0,
        totalWriters: 0
    });

    const getNews = async () => {
        try {
            const { data } = await axios.get(`${base_url}/api/news`, {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            });
            setNews(data.news);
        } catch (error) {
            console.error('Haber yükleme hatası:', error);
            setError('Haberler yüklenirken hata oluştu');
        }
    };

    useEffect(() => {
        getNews();
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axios.get(`${base_url}/api/news-statistics`, {
                    headers: {
                        'Authorization': `Bearer ${store.token}`
                    }
                });
                setStats(data);
            } catch (error) {
                console.error('İstatistik yükleme hatası:', error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className='mt-6 px-4'>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            
            <div className='flex flex-wrap gap-4 justify-center sm:justify-between'>
                {[
                    { title: 'Toplam Haber', value: stats.totalNews, color: 'text-red-500' },
                    { title: 'Bekleyen Haber', value: stats.pendingNews, color: 'text-purple-500' },
                    { title: 'Aktif Haber', value: stats.activeNews, color: 'text-cyan-500' },
                    { title: 'Deaktif Haber', value: stats.deactiveNews, color: 'text-blue-500' },
                    { title: 'Yazarlar', value: stats.totalWriters, color: 'text-green-500' },
                ].map((stat, i) => (
                    <div key={i} className='w-full sm:w-[45%] lg:w-[18%] p-4 bg-white rounded-lg shadow-md flex flex-col items-center gap-2'>
                        <span className={`text-2xl font-bold ${stat.color}`}>
                            {stat.value}
                        </span>
                        <span className='text-sm font-semibold text-gray-600 text-center'>{stat.title}</span>
                    </div>
                ))}
            </div>

            <div className='bg-white p-4 sm:p-6 mt-8 rounded-lg shadow-md'>
                <div className='flex justify-between items-center pb-4 border-b border-gray-300'>
                    <h2 className='text-lg sm:text-xl font-bold text-gray-600'>Son Haberler</h2>
                    <Link to='/dashboard/news' className='text-blue-500 hover:text-blue-800 font-semibold transition duration-300'>
                        Tümünü Gör
                    </Link>
                </div>

                <div className='overflow-x-auto mt-4'>
                    <table className='w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden'>
                        <thead className='bg-gray-100 text-gray-700 uppercase text-sm'>
                            <tr>
                                <th className='py-2 px-4 text-left'>No</th>
                                <th className='py-2 px-4 text-left'>Başlık</th>
                                <th className='py-2 px-4 text-left'>Resim</th>
                                <th className='py-2 px-4 text-left'>Kategori</th>
                                <th className='py-2 px-4 text-left'>Tarih</th>
                                <th className='py-2 px-4 text-left'>Durum</th>
                                <th className='py-2 px-4 text-left'>İşlem</th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-600'>
                            {news.slice(0, 5).map((n, index) => (
                                <tr key={index} className='border-t hover:bg-gray-50'>
                                    <td className='py-3 px-4'>{index + 1}</td>
                                    <td className='py-3 px-4'>{n.title.slice(0, 15)}...</td>
                                    <td className='py-3 px-4'>
                                        <img className='w-10 h-10 rounded-full object-cover' src={n.image} alt="haber" />
                                    </td>
                                    <td className='py-3 px-4'>{n.category}</td>
                                    <td className='py-3 px-4'>{n.date}</td>
                                    <td className='py-3 px-4'>
                                        {n.status === 'onayBekliyor' && (
                                            <span className='px-2 py-1 bg-blue-200 text-blue-800 rounded-md text-xs'>
                                                Onay Bekliyor
                                            </span>
                                        )}
                                        {n.status === 'aktif' && (
                                            <span className='px-2 py-1 bg-green-200 text-green-800 rounded-md text-xs'>
                                                Aktif
                                            </span>
                                        )}
                                        {n.status === 'deaktif' && (
                                            <span className='px-2 py-1 bg-red-200 text-red-800 rounded-md text-xs'>
                                                Deaktif
                                            </span>
                                        )}
                                    </td>
                                    <td className='py-3 px-4'>
                                        <Link
                                            to={`/dashboard/news/${n._id}`}
                                            className='p-2 bg-blue-500 text-white rounded hover:bg-blue-800 inline-flex items-center text-sm'
                                        >
                                            <FaEye className="mr-1" />
                                            Görüntüle
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Adminindex;
