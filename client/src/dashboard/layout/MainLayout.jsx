// MainLayout Component
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='flex w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200'>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className='flex-1'>
                <Header toggleSidebar={toggleSidebar} />
                <main className='mt-20 p-4'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
