import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaImages } from "react-icons/fa6";
import JoditEditor from 'jodit-react';
import Gallery from '../components/Gallery';
import { base_url } from '../../config/config';
import axios from 'axios';
import toast from 'react-hot-toast';
import storeContext from '../../context/storeContext';

const EditNews = () => {

    const { store } = useContext(storeContext);
    const { news_id } = useParams();

    const [loader, setLoader] = useState(false);
    const [show, setShow] = useState(false);

    const editor = useRef(null);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [img, setImg] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [bigCategory, setBigCategory] = useState('');
    const [old_image, set_old_image] = useState('');
    const [status, setStatus] = useState('');

    const statusHandle = (e) => {
        setStatus(e.target.value);
    };

    const imageHandle = (e) => {
        const { files } = e.target;
        if (files.length > 0) {
            setImg(URL.createObjectURL(files[0]));
            setImage(files[0]);
        }
    };

    const update = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('bigCategory', bigCategory);
        formData.append('status', status);

        if (image) {
            formData.append('image', image);
        }

        formData.append('old_image', old_image);

        try {
            setLoader(true);
            const { data } = await axios.put(`${base_url}/api/news/update/${news_id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${store.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoader(false);
            toast.success(data.message);
        } catch (error) {
            setLoader(false);
            toast.error(error.response?.data?.message || 'Güncelleme sırasında bir hata oluştu.');
        }
    };

    const [images, setImages] = useState([]);

    const get_images = async () => {
        try {
            const { data } = await axios.get(`${base_url}/api/images`, {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            });
            setImages(data.images);
        } catch (error) {
        }
    };

    useEffect(() => {
        get_images();
    }, []);

    const categoryHandle = (e) => {
        setCategory(e.target.value);
    };

    const bigCategoryHandle = (e) => {
        setBigCategory(e.target.value);
    };

    const get_edit_news = async () => {
        try {
            const { data } = await axios.get(`${base_url}/api/edit/news/${news_id}`, {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            });
            setTitle(data?.news?.title);
            setDescription(data?.news?.description);
            setImg(data?.news?.image);
            setCategory(data?.news?.category);
            setBigCategory(data?.news?.bigCategory);
            setStatus(data?.news?.status);
        } catch (error) {
        }
    };

    useEffect(() => {
        get_edit_news();
    }, [news_id]);

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
                    <input 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        type="text" 
                        placeholder='Haber Başlığını Girin' 
                        name='title' 
                        id='title' 
                        className='w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition' 
                        required 
                    />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    <div>
                        <label htmlFor="category" className='block text-md font-medium text-gray-600 mb-2'>Kategori</label>
                        <select 
                            onChange={categoryHandle} 
                            value={category} 
                            required 
                            name="category" 
                            id='category' 
                            className='w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition'
                        >
                            <option value="">--- Kategori Seçin ---</option>
                            <option value="Genel">Genel</option>
                            <option value="Eğitim">Eğitim</option>
                            <option value="Seyahat">Seyahat</option>
                            <option value="Sağlık">Sağlık</option>
                            <option value="Uluslararası">Uluslararası</option>
                            <option value="Spor">Spor</option>
                            <option value="Teknoloji">Teknoloji</option>
                            <option value="İş">İş</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="bigCategory" className='block text-md font-medium text-gray-600 mb-2'>Üst Kategori</label>
                        <select 
                            onChange={bigCategoryHandle} 
                            value={bigCategory} 
                            required 
                            name="bigCategory" 
                            id='bigCategory' 
                            className='w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition'
                        >
                            <option value="">--- Üst Kategori Seçin ---</option>
                            <option value="Türkiye">Türkiye</option>
                            <option value="Dünya">Dünya</option>
                            <option value="Kahramanmaraş">Kahramanmaraş</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="status" className='block text-md font-medium text-gray-600 mb-2'>Durum</label>
                    <select 
                        onChange={statusHandle} 
                        value={status} 
                        required 
                        name="status" 
                        id='status' 
                        className='w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition'
                    >
                        <option value="">--- Durum Seçin ---</option>
                        <option value="onayBekliyor">Onay Bekliyor</option>
                        <option value="aktif">Aktif</option>
                        <option value="deaktif">Deaktif</option>
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
                    <label htmlFor="description" className='block text-md font-medium text-gray-600 mb-2'>Açıklama</label>
                    <JoditEditor
                        ref={editor}
                        value={description}
                        tabIndex={1}
                        onBlur={value => setDescription(value)}
                        onChange={() => { }}
                        className='w-full border border-gray-400 rounded-md'
                    />
                </div>

                <div className='mt-4'>
                    <button 
                        type='submit' 
                        disabled={loader} 
                        className='px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-800 transition'
                    >
                        {loader ? 'Güncelleniyor...' : 'Güncelle'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditNews;
