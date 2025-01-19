import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaImages } from "react-icons/fa6";
import JoditEditor from 'jodit-react';
import Gallery from '../components/Gallery';
import { base_url } from '../../config/config';
import axios from 'axios';
import toast from 'react-hot-toast';
import storeContext from '../../context/storeContext';
import { useNavigate } from 'react-router-dom';

const CreateNews = () => {
    const { store } = useContext(storeContext);
    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);
    const [show, setShow] = useState(false);

    const editor = useRef(null);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [img, setImg] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [bigCategory, setBigCategory] = useState('');
    const [status, setStatus] = useState('');

    const imageHandle = (e) => {
        const { files } = e.target;
        if (files.length > 0) {
            setImg(URL.createObjectURL(files[0]));
            setImage(files[0]);
        }
    };

    const statusHandle = (e) => {
        setStatus(e.target.value);
    };
    const categoryHandle = (e) => {
        setCategory(e.target.value);
    };
    const bigCategoryHandle = (e) => {
        setBigCategory(e.target.value);
    };
    const added = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!title || !description || !image || !category || !bigCategory || !status) {
            toast.error('Lütfen tüm alanları doldurunuz');
            return;
        }
        const formData = new FormData();
        formData.append('title', title.trim());
        formData.append('description', description.trim());
        formData.append('image', image);
        formData.append('category', category.trim());
        formData.append('bigCategory', bigCategory.trim());
        formData.append('status', status.trim());

        try {
            setLoader(true);
            const { data } = await axios.post(
                `${base_url}/api/news/add`, 
                formData, 
                {
                    headers: {
                        'Authorization': `Bearer ${store.token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
    
            toast.success(data.message);
            
            // Reset form
            setTitle('');
            setDescription('');
            setCategory('');
            setBigCategory('');
            setImage('');
            setImg('');
            navigate('/dashboard/news');
        } catch (error) {
            console.error('Add News Error:', error);
            toast.error(error?.response?.data?.message || 'Haber eklenirken bir hata oluştu');
        } finally {
            setLoader(false);
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

    const [imagesLoader, setImagesLoader] = useState(false);

    const imageHandler = async (e) => {
        const files = e.target.files;
        try {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i]);
            }
            setImagesLoader(true);
            const { data } = await axios.post(`${base_url}/api/images/add`, formData, {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            });
            setImagesLoader(false);
            setImages([...images, ...data.images]);
            toast.success(data.message);
        } catch (error) {
            //console.log(error);
            setImagesLoader(false);
        }
    };

    return (
        <div className='bg-white shadow-md rounded-md p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-700'>Haber Ekle</h2>
                <Link className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-800 transition duration-300' to='/dashboard/news'>
                    Tüm Haberler
                </Link>
            </div>

            <form onSubmit={added}>
                <div>
                    <label htmlFor="title" className='block text-md font-medium text-gray-600 mb-2'>Başlık</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Haber Başlığını Girin' name='title' id='title' className='w-full px-4 py-2 border rounded-md border-gray-300 focus:border-blue-500 outline-none transition h-10' required />
                </div>
                <div className='flex flex-col gap-y-2 mb-4'>
                    <label htmlFor="category" className='text-md font-medium text-gray-600'>Kategori</label>
                    <select 
                        onChange={categoryHandle}
                        value={category}
                        required 
                        name="category" 
                        id='category' 
                        className='px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 outline-none transition h-10'
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
                <div className='flex flex-col gap-y-2 mb-4'>
                    <label htmlFor="bigCategory" className='text-md font-medium text-gray-600'>Üst Kategori</label>
                    <select 
                        onChange={bigCategoryHandle}
                        value={bigCategory}
                        required 
                        name="bigCategory" 
                        id='bigCategory' 
                        className='px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 outline-none transition h-10'
                    >
                        <option value="">--- Üst Kategori Seçin ---</option>
                        <option value="Türkiye">Türkiye</option>
                        <option value="Dünya">Dünya</option>
                        <option value="Kahramanmaraş">Kahramanmaraş</option>
                    </select>
                </div>
                <div className='flex flex-col gap-y-2 mb-4'>
                <label htmlFor="status" className='text-md font-medium text-gray-600'>Durum</label>
                <select 
                    onChange={statusHandle}
                    value={status}
                    required 
                    name="status" 
                    id='status' 
                    className='px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 outline-none transition h-10'
                >
                    <option value="">--- Durum Seçin ---</option>
                    <option value="onayBekliyor">Onay Bekliyor</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Deaktif">Deaktif</option>
                </select>
            </div>
                <div>
                    <label htmlFor="img" className='w-full h-[240px] flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-500 rounded-lg text-gray-500 hover:border-blue-500 transition mt-4'>
                        {img ? <img src={img} className='w-full h-full' alt='image' /> : <div className='flex justify-center items-center flex-col gap-y-2'>
                            <FaImages className='text-4xl mb-2' />
                            <span className='font-medium'>Resim Seç</span>
                        </div>}
                    </label>
                    <input onChange={imageHandle} type="file" className='hidden' id='img' required />
                </div>

                <div>
                    <div className='flex justify-between items-center mb-2 mt-4'>
                        <label htmlFor="description" className='block text-md font-medium text-gray-600'>Açıklama</label>

                    </div>
                    <JoditEditor
                        ref={editor}
                        value={description}
                        tabIndex={1}
                        onBlur={value => setDescription(value)}
                        onChange={() => { }}
                        className='w-full border border-gray-400 rounded-md' />
                </div>

                <div className='mt-4'>
                    <button type='submit' disabled={loader} className='px-3 py-[6px] bg-blue-500 rounded-md text-white hover:bg-blue-800'>
                        {loader ? 'Yükleniyor...' : 'Haber Ekle'}
                    </button>
                </div>
            </form>

        </div>
    );
};

export default CreateNews;