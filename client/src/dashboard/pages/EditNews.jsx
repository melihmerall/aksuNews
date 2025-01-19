import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaImages } from "react-icons/fa6";
import JoditEditor from 'jodit-react';
import Gallery from '../components/Gallery';
import { base_url } from '../../config/config';
import axios from 'axios'
import toast from 'react-hot-toast'
import storeContext from '../../context/storeContext';
import { set } from 'mongoose';

const EditNews = () => {

    const { store } = useContext(storeContext)
    const {news_id} = useParams()

    const [loader, setLoader] = useState(false);
    const [show, setShow] = useState(false);

    const editor = useRef(null)
    const [title,setTitle] = useState('')
    const [image, setImage] = useState('')
    const [img, setImg] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [bigCategory, setBigCategory] = useState('')
    const [old_image, set_old_image] = useState('')
 // Add status state
 const [status, setStatus] = useState('');
    
 // Add status handler
 const statusHandle = (e) => {
     setStatus(e.target.value);
 };

    const imageHandle = (e) => {
        const { files } = e.target;
        if (files.length > 0) {
            setImg(URL.createObjectURL(files[0])); // Önizleme için
            setImage(files[0]); // Backend'e göndermek için dosyayı state'e alıyoruz
        }
    };

    const update = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('bigCategory', bigCategory);
        formData.append('status', status); // Add this line

        if (image) {
            formData.append('image', image); // Backend'de key 'image' olarak kullanılacak
        }
    
        formData.append('old_image', old_image); // Eski görüntü yolu
    
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
                    'Authorization' : `Bearer ${store.token}`
                }
            })   
            //console.log(data.images)
            setImages(data.images)
        } catch (error) {
            //console.log(error)
        }
    }

    useEffect(() => {
        get_images()
    },[images])

    const [imagesLoader, setImagesLoader] = useState(false);
    
    const categoryHandle = (e) => {
        setCategory(e.target.value)
    }
    const bigCategoryHandle = (e) => {
        setBigCategory(e.target.value)
    }
    const imageHandler = async (e) => {
        const files = e.target.files
        try {
            const formData = new FormData()
            for (let i = 0; i < files.length; i++) {
                 formData.append('images',files[i]) 
            }
            setImagesLoader(true)
            const { data } = await axios.post(`${base_url}/api/images/add`,formData, {
                headers: {
                    'Authorization' : `Bearer ${store.token}`
                }
            } )              
            setImagesLoader(false) 
            setImages([...images,data.images])
            toast.success(data.message)  
        } catch (error) {
            //console.log(error)
            setImagesLoader(false) 
        }
    }


    
    const get_edit_news = async () => {
        try {
            const { data } = await axios.get(`${base_url}/api/edit/news/${news_id}`, {
                headers: {
                    'Authorization' : `Bearer ${store.token}`
                }
            })   
            setTitle(data?.news?.title)
            setDescription(data?.news?.description)
            setImg(data?.news?.image)
            setCategory(data?.news?.category)
            setBigCategory(data?.news?.bigCategory)
            setStatus(data?.news?.status); // Add this line

        } catch (error) {
            //console.log(error)
        }
    }

    useEffect(() => {
        get_edit_news()
    },[news_id])


    return (
        <div className='bg-white shadow-md rounded-md p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-700'>Haber Düzenle</h2>
                <Link className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-800 transition duration-300' to='/dashboard/news'>
                    Tüm Haberler
                </Link>
            </div>

            <form onSubmit={update}>
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
                    <label htmlFor="category" className='text-md font-medium text-gray-600'>Üst Kategori</label>
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
                    <option value="aktif">Aktif</option>
                    <option value="deaktif">Deaktif</option>
                </select>
            </div>
                <div>
                    <label htmlFor="img" className='w-full h-[240px] flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-500 rounded-lg text-gray-500 hover:border-blue-500 transition mt-4'>
                        {img ? <img src={img} className='w-full h-full' alt='resim' /> : <div className='flex justify-center items-center flex-col gap-y-2'>
                            <FaImages className='text-4xl mb-2' />
                            <span className='font-medium'>Resim Seç</span>
                        </div>}
                    </label>
                    <input onChange={imageHandle} type="file" className='hidden' id='img' />
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
                        onChange={() => {}}
                        className='w-full border border-gray-400 rounded-md' />
                </div>

                <div className='mt-4'>
                    <button type='submit' disabled={loader} className='px-3 py-[6px] bg-blue-500 rounded-md text-white hover:bg-blue-800'>
                        {loader ? 'Güncelleniyor...' : 'Güncelle'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditNews;