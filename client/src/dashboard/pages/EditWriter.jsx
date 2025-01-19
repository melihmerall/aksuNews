import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { base_url } from '../../config/config';
import axios from 'axios';
import storeContext from '../../context/storeContext';
import toast from 'react-hot-toast';

const EditWriter = () => {
    const { id } = useParams();
    const { store } = useContext(storeContext);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const [state, setState] = useState({
        name: "",
        email: "",
    });

    const getWriterData = async () => {
        try {
            const { data } = await axios.get(`${base_url}/api/news/writer/${id}`, {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            });
            setState({
                name: data.writer.name,
                email: data.writer.email,
            });
        } catch (error) {
            toast.error('Yazar bilgileri yüklenemedi');
        }
    };

    useEffect(() => {
        getWriterData();
    }, [id]);

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdateWriter = async (e) => {
        e.preventDefault();
        try {
            setLoader(true);
            await axios.put(`${base_url}/api/update/writer/${id}`, state, {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            });
            setLoader(false);
            toast.success('Yazar başarıyla güncellendi');
            navigate('/dashboard/writers');
        } catch (error) {
            setLoader(false);
            toast.error(error.response?.data?.message || 'Güncelleme işlemi başarısız');
        }
    };

    return (
        <div className='bg-white shadow-md rounded-md p-6'>
            <div className='flex flex-wrap justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-700'>Yazar Düzenle</h2>
                <Link className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-800 transition duration-300' to='/dashboard/writers'>
                    Yazarlar
                </Link>
            </div>

            <div className='p-4'>
                <form onSubmit={handleUpdateWriter} className='space-y-6'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor="name" className='text-md font-medium text-gray-600'>Ad Soyad</label>
                            <input
                                onChange={inputHandle}
                                value={state.name}
                                required
                                type="text"
                                placeholder='Ad Soyad'
                                name='name'
                                className='px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition'
                                id='name'
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor="email" className='text-md font-medium text-gray-600'>E-posta</label>
                            <input
                                onChange={inputHandle}
                                value={state.email}
                                required
                                type="email"
                                placeholder='E-posta'
                                name='email'
                                className='px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition'
                                id='email'
                            />
                        </div>
                    </div>

                    <div className='mt-6 flex justify-end'>
                        <button disabled={loader} className='px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-800 transition'>
                            {loader ? 'Güncelleniyor...' : 'Güncelle'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditWriter;
