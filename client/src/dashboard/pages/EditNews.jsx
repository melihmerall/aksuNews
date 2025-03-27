// Diğer importlar...
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaImages } from "react-icons/fa6";
import JoditEditor from 'jodit-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import storeContext from '../../context/storeContext';
import { base_url } from '../../config/config';

const EditNews = () => {
    const { store } = useContext(storeContext);
    const { news_id } = useParams();

    const [loader, setLoader] = useState(false);
    const editor = useRef(null);
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');

    const [image, setImage] = useState(null);
    const [img, setImg] = useState('');
    const [old_image, setOldImage] = useState('');

    const [video, setVideo] = useState(null);
    const [videoPreview, setVideoPreview] = useState('');
    const [old_video, setOldVideo] = useState('');

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${base_url}/api/category/all`);
                const data = await res.json();
                setCategories(data.categories);
            } catch (error) {
                console.error("Kategoriler yüklenirken hata oluştu:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const get_edit_news = async () => {
            try {
                const { data } = await axios.get(`${base_url}/api/edit/news/${news_id}`, {
                    headers: { 'Authorization': `Bearer ${store.token}` }
                });
                const news = data.news;
                setTitle(news.title);
                setSlug(news.slug);
                setDescription(news.description);
                setCategory(news.category);
                setStatus(news.status);
                setImg(news.image);
                setOldImage(news.image);
                if (news.video) {
                    setVideoPreview(news.video);
                    setOldVideo(news.video);
                }
            } catch (error) {
                console.error('Haber getirilemedi', error);
            }
        };
        get_edit_news();
    }, [news_id]);

    useEffect(() => {
        const autoSlugify = (str) => {
            return str
                .toLowerCase()
                .replace(/ü/g, 'u')
                .replace(/ı/g, 'i')
                .replace(/ğ/g, 'g')
                .replace(/ş/g, 's')
                .replace(/ç/g, 'c')
                .replace(/ö/g, 'o')
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/--+/g, '-')
                .replace(/^-+|-+$/g, '');
        };
        setSlug(autoSlugify(title));
    }, [title]);

    const imageHandle = (e) => {
        const { files } = e.target;
        if (files.length > 0) {
            setImg(URL.createObjectURL(files[0]));
            setImage(files[0]);
        }
    };

    const videoHandle = (e) => {
        const { files } = e.target;
        if (files.length > 0) {
            setVideo(files[0]);
            setVideoPreview(URL.createObjectURL(files[0]));
        }
    };

    const update = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('slug', slug);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('status', status);

        if (image) {
            formData.append('image', image);
        } else {
            formData.append('old_image', old_image);
        }

        if (video) {
            formData.append('video', video);
        } else {
            formData.append('old_video', old_video);
        }

        try {
            setLoader(true);
            const { data } = await axios.put(`${base_url}/api/news/update/${news_id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${store.token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            setLoader(false);
            toast.success(data.message);
        } catch (error) {
            setLoader(false);
            toast.error(error.response?.data?.message || 'Güncelleme sırasında bir hata oluştu.');
        }
    };

    return (
        <div className='bg-white shadow-md rounded-md p-6'>
            <div className='flex flex-wrap justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-700'>Haber Düzenle</h2>
                <Link className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-800 transition duration-300' to='/dashboard/news'>
                    Tüm Haberler
                </Link>
            </div>

            <form onSubmit={update} className='space-y-6'>
                <div>
                    <label htmlFor="title" className='block text-md font-medium text-gray-600 mb-2'>Başlık</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name='title' id='title' className='w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition' required />
                </div>

                <div>
                    <label htmlFor="slug" className='block text-md font-medium text-gray-600 mb-2'>Seo Url</label>
                    <input value={slug} onChange={(e) => setSlug(e.target.value)} type="text" name='slug' id='slug' className='w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition' required />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    <div>
                        <label htmlFor="category" className='block text-md font-medium text-gray-600 mb-2'>Kategori</label>
                        <select onChange={(e) => setCategory(e.target.value)} value={category} required name="category" id='category' className='w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition'>
                            <option value="">--- Kategori Seçin ---</option>
                            {categories.map((c, index) => (
                                <option key={`${c._id}-${index}`} value={c.slug}>{c.category}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="status" className='block text-md font-medium text-gray-600 mb-2'>Durum</label>
                    <select onChange={(e) => setStatus(e.target.value)} value={status} required name="status" id='status' className='w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition'>
                        <option value="">--- Durum Seçin ---</option>
                        <option value="onayBekliyor">Onay Bekliyor</option>

                    </select>
                </div>

                <div>
                    <label htmlFor="img" className='block text-md font-medium text-gray-600 mb-2'>Resim</label>
                    <div className='flex items-center gap-4'>
                        <label htmlFor="img" className='flex items-center justify-center w-full sm:w-1/2 h-[150px] border border-dashed border-gray-400 rounded-md cursor-pointer'>
                            {img ? <img src={img} alt='preview' className='object-cover h-full w-full' /> : <FaImages className='text-gray-500 text-4xl' />}
                        </label>
                        <input type="file" id="img" className='hidden' onChange={imageHandle} />
                    </div>
                </div>

                <div>
                    <label htmlFor="video" className='block text-md font-medium text-gray-600 mb-2'>Video</label>
                    <div className='flex items-center gap-4'>
                        <label htmlFor="video" className='flex items-center justify-center w-full sm:w-1/2 h-[150px] border border-dashed border-gray-400 rounded-md cursor-pointer'>
                            {videoPreview ? (
                                <video width="100%" height="auto" controls className="rounded">
                                    <source src={videoPreview} type="video/mp4" />
                                    Tarayıcınız video etiketini desteklemiyor.
                                </video>
                            ) : (
                                <FaImages className='text-gray-500 text-4xl' />
                            )}
                        </label>
                        <input type="file" id="video" className='hidden' onChange={videoHandle} accept="video/mp4,video/*" />
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className='block text-md font-medium text-gray-600 mb-2'>Açıklama</label>
                    <JoditEditor ref={editor} value={description} tabIndex={1} onBlur={value => setDescription(value)} onChange={() => { }} className='w-full border border-gray-400 rounded-md' />
                </div>

                <div className='mt-4'>
                    <button type='submit' disabled={loader} className='px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-800 transition'>
                        {loader ? 'Güncelleniyor...' : 'Güncelle'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditNews;
