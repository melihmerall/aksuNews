import Breadcrumb from '@/components/Breadcrumb';
import Category from '@/components/Category';
import SimpleDetailsNewCard from '@/components/news/item/SimpleDetailsNewCard';
import PopularNews from '@/components/news/PopularNews';
import RecentNews from '@/components/news/RecentNews';
import Search from '@/components/news/Search';
import React from 'react';

const Page = () => {
    return (
        <div>
            {/* Breadcrumb Section */}
            <div className="bg-white shadow-md py-4 border-b border-gray-300">
                <div className="container px-4 md:px-8">
                    <Breadcrumb one="Category" two="Sports" />
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-gray-100 py-10">
                <div className="container px-4 md:px-8">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        {/* Left Content - News Grid */}
                        <div className="xl:col-span-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[1,2,3,4,5,6].map((item, i) => (
                                    <SimpleDetailsNewCard key={i} news={item} type="details_news" height={200} />
                                ))}
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="xl:col-span-1">
                            <div className="space-y-6">
                                <Search />
                                <RecentNews />
                                <div className="p-4 bg-white shadow-md rounded-lg">
                                    <Category titleStyle="text-gray-700 font-bold" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Popular News Section */}
                    <div className="pt-10">
                        <PopularNews />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
