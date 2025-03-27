import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { base_url } from '../../config/config';
import axios from 'axios';
import storeContext from '../../context/storeContext';

const Writerindex = () => {
    const { store } = useContext(storeContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [news, setNews] = useState([]);
    const [stats, setStats] = useState({
        totalNews: 0,
        pendingNews: 0,
        activeNews: 0,
        deactiveNews: 0
    });

    const fetchWriterStats = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${base_url}/api/writer/news-statistics`, {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            });
            setStats(data);
            setError('');
        } catch (error) {
            console.error('İstatistik yükleme hatası:', error);
            setError('İstatistikler yüklenirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    const fetchWriterNews = async () => {
        try {
            const { data } = await axios.get(`${base_url}/api/writer/news`, {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            });
            setNews(data.news);
        } catch (error) {
            console.error('Haber yükleme hatası:', error);
            setError('Haberler yüklenirken bir hata oluştu');
        }
    };

    useEffect(() => {
        fetchWriterStats();
        fetchWriterNews();
    }, [store.token]);

    if (loading) {
        return <div className="flex justify-center items-center h-[calc(100vh-100px)] text-lg font-semibold text-gray-600">Yükleniyor...</div>;
    }

    return (
        <div className='mt-6'>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center font-medium">
                    {error}
                </div>
            )}
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {[
                    { title: 'Toplam Haberlerim', value: stats.totalNews, color: 'bg-red-100 text-red-700' },
                    { title: 'Bekleyen Haberlerim', value: stats.pendingNews, color: 'bg-purple-100 text-purple-700' },
                    { title: 'Aktif Haberlerim', value: stats.activeNews, color: 'bg-cyan-100 text-cyan-700' },
                    { title: 'Deaktif Haberlerim', value: stats.deactiveNews, color: 'bg-blue-100 text-blue-700' },
                ].map((stat, i) => (
                    <div key={i} className='p-6 rounded-lg shadow-md flex flex-col items-center gap-2 transition hover:shadow-lg'>
                        <span className={`text-4xl font-bold ${stat.color}`}>
                            {stat.value}
                        </span>
                        <span className='text-md font-semibold text-gray-700'>{stat.title}</span>
                    </div>
                ))}
            </div>

            <div className='bg-white p-6 mt-8 rounded-lg shadow-md'>
                <div className='flex justify-between items-center pb-4 border-b border-gray-300'>
                    <h2 className='text-xl font-bold text-gray-700'>Son Haberlerim</h2>
                    <Link to='/dashboard/news' className='text-blue-600 hover:text-blue-800 font-semibold transition'>
                        Tümünü Gör
                    </Link>
                </div>

                <div className='overflow-x-auto mt-6'>
                    <table className='w-full table-auto bg-white shadow-md rounded-md'>
                        <thead className='bg-gray-200 text-gray-700 uppercase text-sm'>
                            <tr>
                                <th className='py-4 px-6 text-left'>No</th>
                                <th className='py-4 px-6 text-left'>Başlık</th>
                                <th className='py-4 px-6 text-left'>Resim</th>
                                <th className='py-4 px-6 text-left'>Kategori</th>
                                <th className='py-4 px-6 text-left'>Tarih</th>
                                <th className='py-4 px-6 text-left'>Durum</th>
                                <th className='py-4 px-6 text-left'>İşlem</th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-600'>
                            {news.slice(0, 5).map((n, index) => (
                                <tr key={index} className='border-t hover:bg-gray-50 transition'>
                                    <td className='py-4 px-6'>{index + 1}</td>
                                    <td className='py-4 px-6'>{n.title.slice(0, 15)}...</td>
                                    <td className='py-4 px-6'>
                                        <img className='w-10 h-10 rounded-full object-cover shadow-md' src={n.image} alt="haber" />
                                    </td>
                                    <td className='py-4 px-6'>{n.category}</td>
                                    <td className='py-4 px-6'>{n.date}</td>
                                    <td className='py-4 px-6'>
                                        <span className={`px-2 py-1 rounded-md text-xs font-semibold
                                            ${n.status === 'onayBekliyor' ? 'bg-blue-200 text-blue-800' : 
                                              n.status === 'aktif' ? 'bg-green-200 text-green-800' : 
                                              'bg-red-200 text-red-800'}`}>
                                            {n.status === 'onayBekliyor' ? 'Onay Bekliyor' :
                                             n.status === 'aktif' ? 'Aktif' : 'Deaktif'}
                                        </span>
                                    </td>
                                    <td className='py-4 px-6'>
                                        <Link
                                            to={`/dashboard/news/${n._id}`}
                                            className='p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition inline-flex items-center'
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

export default Writerindex;
