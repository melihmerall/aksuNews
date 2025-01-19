import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const Unable = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800">
            <div className="text-center p-8 bg-white shadow-lg rounded-md">
                <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
                <h1 className="text-3xl font-bold mb-4">Yetkisiz Erişim</h1>
                <p className="text-lg mb-6">
                    Bu işlemi gerçekleştirmek için gerekli yetkilere sahip değilsiniz.
                    Lütfen bir hata olduğunu düşünüyorsanız sistem yöneticinizle iletişime geçin.
                </p>
                <Link 
                    to="/dashboard" 
                    className="px-6 py-3 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-300"
                >
                    Anasayfaya Dön
                </Link>
            </div>
        </div>
    );
};

export default Unable;
