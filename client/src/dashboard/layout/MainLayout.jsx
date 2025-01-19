import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col lg:flex-row">
      <Sidebar className="hidden lg:block w-[250px] bg-gradient-to-b from-indigo-600 to-indigo-800 text-white shadow-lg" />
      <div className="flex-1 w-full lg:w-[calc(100vw-250px)] min-h-screen bg-white rounded-tl-lg shadow-lg">
        <Header />
        <div className="pt-[85px] px-4 lg:px-6">
          <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
