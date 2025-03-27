import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import storeContext from "../../context/storeContext";
import { base_url } from "../../config/config";

const EditAds = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { store } = useContext(storeContext);
  const [loader, setLoader] = useState(false);
  const [state, setState] = useState({
    headerAds: null,
    bannerAds: null,
  });
  const [preview, setPreview] = useState({});

  const fileHandle = (e) => {
    const { name, files } = e.target;
    setState({ ...state, [name]: files[0] });
    setPreview({ ...preview, [name]: URL.createObjectURL(files[0]) });
  };

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const { data } = await axios.get(`${base_url}/api/ads/${id}`, {
          headers: {
            Authorization: `Bearer ${store.token}`
          }
        });
        setPreview({
          headerAds: data.ads.headerAdsImageUrl,
          bannerAds: data.ads.bannerAdsImageUrl,
        });
      } catch (err) {
        toast.error("Veri yüklenemedi" + err);
      }
    };
    fetchAds();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (state.headerAds) formData.append("headerAds", state.headerAds);
    if (state.bannerAds) formData.append("bannerAds", state.bannerAds);

    try {
      setLoader(true);
      const { data } = await axios.put(`${base_url}/api/ads/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${store.token}`,
        },
      });
      toast.success(data.message);
      navigate("/dashboard/ads");
    } catch (err) {
      toast.error(err.response?.data?.message || "Hata oluştu");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-screen-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Reklam Düzenle</h2>
      <form onSubmit={submit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1">Header Reklam</label>
          {preview.headerAds && <img src={`http://localhost:5173${preview.headerAds}`} alt="Header" className="w-40 mb-2" />}
          <input
            type="file"
            name="headerAds"
            accept="image/*"
            onChange={fileHandle}
            className="block w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Banner Reklam</label>
          {preview.bannerAds && <img src={`http://localhost:5173${preview.bannerAds}`} alt="Banner" className="w-40 mb-2" />}
          <input
            type="file"
            name="bannerAds"
            accept="image/*"
            onChange={fileHandle}
            className="block w-full"
          />
        </div>

        <button
          disabled={loader}
          className={`px-4 py-2 rounded-md text-white w-full sm:w-auto ${
            loader ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loader ? "Yükleniyor..." : "Güncelle"}
        </button>
      </form>
    </div>
  );
};

export default EditAds;
