import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import profile from '../../assets/profile.png'
import { base_url } from '../../config/config';
import axios from 'axios'
import storeContext from '../../context/storeContext';
import toast from 'react-hot-toast';

const Writers = () => {

    const { store } = useContext(storeContext)
    const [writers, setWriters] = useState([])
    const [loading, setLoading] = useState(false);

    const get_writers = async () => {
        try {

            const { data } = await axios.get(`${base_url}/api/news/writers`,{
                headers: {
                    'Authorization' : `Bearer ${store.token}`
                }
            } ) 
            setWriters(data.writers)
            // console.log(data)
        } catch (error) {
            //console.log(error)
        }
    }

    useEffect(() => {
        get_writers()
    },[])

    const handleDeleteWriter = async (id) => {
        if (!window.confirm('Are your sure to delete writer?'))
            return;
        setLoading(true);
        try {

            await axios.delete(`${base_url}/api/delete/writer/${id}`,{
                headers: {
                    'Authorization' : `Bearer ${store.token}`
                }
            } ) 
            toast.success('Yazar başarıyla silindi.');
            get_writers();
        } catch (error) {
            //console.log(error)
        }
    }



    return (
<div className='bg-white rounded-lg shadow-lg'>
    <div className='flex justify-between items-center px-6 py-4 border-b border-gray-300'>
        <h2 className='text-2xl font-semibold text-gray-800'>Yazarlar</h2>
        <Link to='/dashboard/writer/add' className='px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md'>
            Yazar Ekle
        </Link>
    </div>

    <div className='overflow-x-auto'>
        <table className='w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden'>
            <thead className='bg-gray-50 text-gray-700 uppercase text-sm'>
                <tr>
                    <th className='py-4 px-6 text-left'>No</th>
                    <th className='py-4 px-6 text-left'>Ad Soyad</th>
                    <th className='py-4 px-6 text-left'>Rol</th>
                    <th className='py-4 px-6 text-left'>Resim</th>
                    <th className='py-4 px-6 text-left'>Email</th>
                    <th className='py-4 px-6 text-left'>Aksiyon</th>
                </tr>
            </thead>
            <tbody className='text-gray-600'>
                {
                writers.map((item, index) => (
                    <tr key={index} className='border-t hover:bg-gray-100 transition'>
                        <td className='py-4 px-6'>{index + 1}</td>
                        <td className='py-4 px-6 font-medium text-gray-800'>{item.name}</td>
                        <td className='py-4 px-6 capitalize'>{item.role}</td>
                        <td className='py-4 px-6'>
                            <img className='w-10 h-10 rounded-full object-cover shadow-md' src={item.image} alt='news' />
                        </td>
                        <td className='py-4 px-6'>{item.email}</td>
                        <td className='py-4 px-6'>
                            <div className='flex gap-3 text-gray-500'>
                                <Link to={`/dashboard/writer/edit/${item._id}`} className='p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition shadow-md'>
                                    <FaEdit />
                                </Link>
                                <button onClick={() => handleDeleteWriter(item._id)} className='p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-md'>
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
                }
            </tbody>
        </table>
    </div>
</div>
    );
};

export default Writers;