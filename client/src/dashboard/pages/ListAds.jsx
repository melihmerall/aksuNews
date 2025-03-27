// components/ads/ListAds.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { base_url } from "../../config/config";
import storeContext from "../../context/storeContext";
import { Link } from "react-router-dom";

const ListAds = () => {
  const { store } = useContext(storeContext);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const { data } = await axios.get(`${base_url}/api/ads`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });
        setAds([data.ads]);
      } catch (err) {
        console.error("Reklamlar yüklenemedi", err);
      }
    };
    fetchAds();
  }, [store.token]);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Reklamlar</h2>
      <table className="min-w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Header Reklam</th>
            <th className="px-4 py-2 border">Banner Reklam</th>
            <th className="px-4 py-2 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {ads?.map((ad) => (
            <tr key={ad._id} className="text-center">
              <td className="border px-4 py-2">
                {ad.headerAdsImageUrl && (
                  <img src={`http://localhost:5173${ad.headerAdsImageUrl}`} className="h-20 mx-auto" alt="Header Ad" />
                )}
              </td>
              <td className="border px-4 py-2">
                {ad.bannerAdsImageUrl && (
                  <img src={`http://localhost:5173${ad.bannerAdsImageUrl}`} className="h-20 mx-auto" alt="Banner Ad" />
                )}
              </td>
              <td className="border px-4 py-2">
                <Link
                  to={`/dashboard/ads/edit/${ad._id}`}
                  className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                >
                  Düzenle
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListAds;
