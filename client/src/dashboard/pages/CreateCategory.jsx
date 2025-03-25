import React, { useContext, useEffect, useRef, useState } from 'react';

import axios from "axios";
import toast from "react-hot-toast";
import { base_url } from "../../config/config";
import storeContext from '../../context/storeContext';

const CreateCategory = () => {
    const { store } = useContext(storeContext);

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [loading, setLoading] = useState(false);

    const generateSlug = (value) => {
        return value
            .toLowerCase()
            .replace(/ğ/g, "g")
            .replace(/ü/g, "u")
            .replace(/ş/g, "s")
            .replace(/ı/g, "i")
            .replace(/ö/g, "o")
            .replace(/ç/g, "c")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !slug) {
            toast.error("Lütfen kategori adı ve slug giriniz.");
            return;
        }

        try {
            setLoading(true);
            const { data } = await axios.post(
                `${base_url}/api/category/add`,
                { name, slug },
                {
                    headers: {
                        'Authorization': `Bearer ${store.token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            toast.success(data.message);
            setName("");
            setSlug("");

        } catch (error) {
            console.error("Kategori ekleme hatası:", error);
            toast.error(error?.response?.data?.message || "Kategori eklenirken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-white shadow-md rounded-md p-6'>
            <h2 className='text-2xl font-bold text-gray-700 mb-4'>Kategori Ekle</h2>
            
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block text-md font-medium text-gray-600 mb-2'>Kategori Adı</label>
                    <input 
                        type="text" 
                        placeholder="Kategori Adını Girin" 
                        className="w-full px-4 py-2 border rounded-md border-gray-300 focus:border-blue-500 outline-none"
                        value={name} 
                        onChange={(e) => {
                            setName(e.target.value);
                            setSlug(generateSlug(e.target.value)); // Kategori adını slug'a dönüştür
                        }}
                        required
                    />
                </div>

                <div>
                    <label className='block text-md font-medium text-gray-600 mb-2'>SEO URL (Slug)</label>
                    <input 
                        type="text" 
                        placeholder="SEO URL (Slug)" 
                        className="w-full px-4 py-2 border rounded-md border-gray-300 focus:border-blue-500 outline-none"
                        value={slug} 
                        onChange={(e) => setSlug(e.target.value)}
                        required
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading} 
                    className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-800 transition"
                >
                    {loading ? "Ekleniyor..." : "Kategori Ekle"}
                </button>
            </form>
        </div>
    );
};

export default CreateCategory;