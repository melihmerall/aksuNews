// Header Component
import React, { useContext, useState } from 'react';
import storeContext from '../../context/storeContext';
import { base_url } from '../../config/config';
import profile from '../../assets/profile.png';
import { HiMenu } from 'react-icons/hi';

const Header = ({ toggleSidebar }) => {
    const { store } = useContext(storeContext);

    const getRoleName = (role) => {
        switch (role) {
            case 'admin': return 'Yönetici';
            case 'yazar': return 'Yazar';
            default: return role;
        }
    };

    const getProfileImage = () => {
        if (store.userInfo?.image) {
            return `${store.userInfo.image}`;
        }
        return profile;
    };

    return (
        <div className='fixed w-full top-0 z-50 bg-white shadow-md p-4 flex items-center justify-between lg:justify-around'>
            <button 
                className='lg:hidden text-gray-700 focus:outline-none' 
                onClick={toggleSidebar}
            >
                <HiMenu className='text-2xl' />
            </button>
            <input 
                type="text" 
                placeholder='Ara...' 
                className='px-4 py-2 rounded-md w-full max-w-sm outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all duration-300'
            />

            <div className='flex items-center gap-4 ml-4 lg:ml-0'>
                <div className='hidden lg:flex flex-col text-right'>
                    <span className='font-bold text-gray-800 text-sm'>{store.userInfo?.name}</span>
                    <span className='font-medium text-gray-600 text-xs'>{getRoleName(store.userInfo?.role)}</span>
                </div>
                <img 
                    className='w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-blue-500 object-cover hover:scale-105 transition-transform duration-300'
                    src={getProfileImage()} 
                    alt={store.userInfo?.name || 'Profile'}
                />
            </div>
        </div>
    );
};

export default Header;