// Sidebar Component
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { MdDashboard } from "react-icons/md";
import { BiNews } from "react-icons/bi";
import { PiUsersFill } from "react-icons/pi";
import { FaHouseUser } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import storeContext from '../../context/storeContext';
import { IoShareOutline } from "react-icons/io5";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { pathname } = useLocation();
    const { store, dispatch } = useContext(storeContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('newsToken');
        dispatch({ type: 'logout', payload: '' });
        navigate('/login');
    };

    return (
        <div className={`fixed lg:relative transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white w-64 min-h-screen p-4 flex flex-col z-40`}>
            <div className='flex items-center justify-between mb-6'>
                <Link>
                    <img 
                        className='w-[160px] h-[70px] transition-transform duration-300 hover:scale-105' 
                        src='/src/assets/mainlogo.png' 
                        alt='Main Logo' 
                    />
                </Link>
                <button 
                    className='lg:hidden text-white focus:outline-none' 
                    onClick={toggleSidebar}
                >
                    ✕
                </button>
            </div>

            <ul className='flex flex-col gap-4 font-medium'>
                {store.userInfo.role === 'admin' ? (
                    <>
                        <li>
                            <Link 
                                to='/dashboard/admin' 
                                className={`px-4 py-3 ${pathname === '/dashboard/admin' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-lg flex items-center gap-x-3 transition-all duration-300 hover:bg-indigo-500 hover:text-white`}
                            >
                                <MdDashboard className='text-[20px]' />
                                <span>Panel</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to='/dashboard/writer/add' 
                                className={`px-4 py-3 ${pathname === '/dashboard/writer/add' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-lg flex items-center gap-x-3 transition-all duration-300 hover:bg-indigo-500 hover:text-white`}
                            >
                                <IoMdAdd className='text-[20px]' />
                                <span>Yazar Ekle</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to='/dashboard/writers' 
                                className={`px-4 py-3 ${pathname === '/dashboard/writers' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-lg flex items-center gap-x-3 transition-all duration-300 hover:bg-indigo-500 hover:text-white`}
                            >
                                <PiUsersFill className='text-[20px]' />
                                <span>Yazarlar</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to='/dashboard/category/create' 
                                className={`px-4 py-3 ${pathname === '/dashboard/category/create' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-lg flex items-center gap-x-3 transition-all duration-300 hover:bg-indigo-500 hover:text-white`}
                            >
                                <PiUsersFill className='text-[20px]' />
                                <span>Kategori Ekle</span>
                            </Link>
                        </li>

                        <li>
                            <Link 
                                to='/dashboard/ads/create' 
                                className={`px-4 py-3 ${pathname === '/dashboard/ads/create' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-lg flex items-center gap-x-3 transition-all duration-300 hover:bg-indigo-500 hover:text-white`}
                            >
                                <PiUsersFill className='text-[20px]' />
                                <span>Ads Ekle</span>
                            </Link>
                        </li>

                        <li>
                            <Link 
                                to='/dashboard/ads' 
                                className={`px-4 py-3 ${pathname === '/dashboard/ads' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-lg flex items-center gap-x-3 transition-all duration-300 hover:bg-indigo-500 hover:text-white`}
                            >
                                <PiUsersFill className='text-[20px]' />
                                <span>Ads Listesi</span>
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link 
                                to='/dashboard/writer' 
                                className={`px-4 py-3 ${pathname === '/dashboard/writer' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-lg flex items-center gap-x-3 transition-all duration-300 hover:bg-indigo-500 hover:text-white`}
                            >
                                <MdDashboard className='text-[20px]' />
                                <span>Panel</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to='/dashboard/news/create' 
                                className={`px-4 py-3 ${pathname === '/dashboard/news/create' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-lg flex items-center gap-x-3 transition-all duration-300 hover:bg-indigo-500 hover:text-white`}
                            >
                                <IoMdAdd className='text-[20px]' />
                                <span>Haber Ekle</span>
                            </Link>
                        </li>
                    </>
                )}
                <li>
                    <Link 
                        to='/dashboard/news' 
                        className={`px-4 py-3 ${pathname === '/dashboard/news' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-lg flex items-center gap-x-3 transition-all duration-300 hover:bg-indigo-500 hover:text-white`}
                    >
                        <BiNews className='text-[20px]' />
                        <span>Haberler</span>
                    </Link>
                </li>
                <li>
                    <Link 
                        to='/dashboard/profile' 
                        className={`px-4 py-3 ${pathname === '/dashboard/profile' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-lg flex items-center gap-x-3 transition-all duration-300 hover:bg-indigo-500 hover:text-white`}
                    >
                        <FaHouseUser className='text-[20px]' />
                        <span>Profil</span>
                    </Link>
                </li>
                <li>
                    <div 
                        onClick={logout} 
                        className='px-4 py-3 bg-white text-gray-800 shadow-lg rounded-lg flex items-center gap-x-3 transition-all duration-300 hover:bg-indigo-500 hover:text-white cursor-pointer'
                    >
                        <IoShareOutline className='text-[20px]' />
                        <span>Çıkış Yap</span>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
