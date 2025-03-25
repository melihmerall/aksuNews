import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaImages } from "react-icons/fa6";
import JoditEditor from 'jodit-react';
import Gallery from '../components/Gallery';
import axios from 'axios';
import toast from 'react-hot-toast';
import storeContext from '../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import { set } from 'mongoose';
import { base_url } from '../../config/config';
const CreateNews = () => {
    const { store } = useContext(storeContext);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const [loader, setLoader] = useState(false);
    const [show, setShow] = useState(false);
    const [video, setVideo] = useState('');
    const [videoPreview, setVideoPreview] = useState('');
    const editor = useRef(null);
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [image, setImage] = useState('');
    const [img, setImg] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');

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
    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const res = await fetch(`${base_url}/api/category/all`);
            const data = await res.json();
            setCategories(data.categories); // API'den dönen kategorileri state'e kaydet
          } catch (error) {
            console.error("Kategoriler yüklenirken hata oluştu:", error);
          }
        };
    
        fetchCategories();
      }, []);
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

        if (!title || !description || !image || !category || !status) {
            toast.error('Lütfen tüm alanları doldurunuz');
            return;
        }
        const formData = new FormData();
        formData.append('title', title.trim());
        formData.append('slug', slug.trim());

        formData.append('description', description.trim());
        formData.append('image', image);
        formData.append('category', category.trim());
        formData.append('status', status.trim());
        if (video) {
            formData.append('video', video);
        }
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

            setTitle('');
            setSlug('');
            setDescription('');
            setCategory('');
            setImage('');
            setImg('');
            setVideo('');
            setVideoPreview('');
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
            setImagesLoader(false);
        }
    };

    return (
        <div className='bg-white shadow-md rounded-md p-6'>
            <div className='flex flex-wrap justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-700'>Haber Ekle</h2>
                <Link className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-800 transition duration-300' to='/dashboard/news'>
                    Tüm Haberler
                </Link>
            </div>

            <form onSubmit={added} className='space-y-6'>
                <div>
                    <label htmlFor="title" className='block text-md font-medium text-gray-600 mb-2'>Başlık</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Haber Başlığını Girin' name='title' id='title' className='w-full px-4 py-2 border rounded-md border-gray-300 focus:border-blue-500 outline-none transition h-10' required />
                </div>
                <div>
                    <label htmlFor="slug" className='block text-md font-medium text-gray-600 mb-2'>Seo Url</label>
                    <input value={slug} onChange={(e) => setSlug(e.target.value)} type="text" placeholder='Seo Url Başlığını Girin' name='title' id='title' className='w-full px-4 py-2 border rounded-md border-gray-300 focus:border-blue-500 outline-none transition h-10' required />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    <div>
                        <label htmlFor="category" className='block text-md font-medium text-gray-600 mb-2'>Kategori</label>
                        <select 
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            required 
            name="category" 
            id='category' 
            className='w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 outline-none transition h-10'
        >
            <option value="">--- Kategori Seçin ---</option>
            {categories.length > 0 ? (
                categories.map((c, index) => (
                    <option key={`${c._id}-${index}`} value={c.slug}>
                        {c.category}
                    </option>
                ))
            ) : (
                <option disabled>Yükleniyor...</option>
            )}
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
                        className='w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 outline-none transition h-10'
                    >
                        <option value="">--- Durum Seçin ---</option>
                        <option value="onayBekliyor">Onay Bekliyor</option>
                        <option value="Aktif">Aktif</option>
                        <option value="Deaktif">Deaktif</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="img" className='block text-md font-medium text-gray-600 mb-2'>Resim</label>
                    <div className='flex items-center gap-4'>
                        <label htmlFor="img" className='flex items-center justify-center w-full sm:w-1/2 h-[150px] border border-dashed border-gray-400 rounded-md cursor-pointer'>
                            {img ? <img src={img} alt='preview' className='object-cover h-full w-full' /> : <FaImages className='text-gray-500 text-4xl' />}
                        </label>
                        <input type="file" id="img" className='hidden' onChange={imageHandle} required />
                    </div>
                </div>
                <div>
    <label htmlFor="video" className='block text-md font-medium text-gray-600 mb-2'>Video</label>
    <div className='flex items-center gap-4'>
        <label htmlFor="video" className='flex items-center justify-center w-full sm:w-1/2 h-[150px] border border-dashed border-gray-400 rounded-md cursor-pointer'>
            {videoPreview ? (
                <video
                width="100%"
                height="auto"
                controls
                style={{
                  maxWidth: "300px", // Maksimum genişlik (Değiştirilebilir)
                  maxHeight: "200px", // Maksimum yükseklik (Değiştirilebilir)
                  borderRadius: "8px",
                  objectFit: "cover"
                }}
              >
                <source src={videoPreview} type="video/mp4" />
                Tarayıcınız video etiketini desteklemiyor.
              </video>
            ) : (
                <FaImages className='text-gray-500 text-4xl' />
            )}
        </label>
        <input type="file" id="video" className='hidden' onChange={videoHandle} accept="video/mp4,video/x-m4v,video/*" />
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
                        className='w-full border border-gray-400 rounded-md' />
                </div>

                <div className='mt-4'>
                    <button type='submit' disabled={loader} className='px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-800 transition'>
                        {loader ? 'Yükleniyor...' : 'Haber Ekle'}
                    </button>
                </div>
            </form>

        </div>
    );
};

export default CreateNews;
