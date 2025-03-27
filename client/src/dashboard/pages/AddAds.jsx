import React, { useContext, useState } from "react";
import { base_url } from "../../config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import storeContext from "../../context/storeContext";

const AddAds = () => {
  const navigate = useNavigate();
  const { store } = useContext(storeContext);
  const [loader, setLoader] = useState(false);
  const [state, setState] = useState({
    headerAds: null,
    bannerAds: null,
  });

  const fileHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.files[0] });
  };

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("headerAds", state.headerAds);
    formData.append("bannerAds", state.bannerAds);

    try {
      setLoader(true);
      const { data } = await axios.post(`${base_url}/api/ads/add`, formData, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setLoader(false);
      toast.success(data.message);
      navigate("/dashboard/ads");
    } catch (error) {
      setLoader(false);
      toast.error(error.response?.data?.message || "Hata oluştu");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-screen-md mx-auto">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Reklam Ekle</h2>
      </div>
      <form onSubmit={submit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="headerAds" className="text-lg font-medium text-gray-600">
              Header Reklam Görseli
            </label>
            <input
              onChange={fileHandle}
              required
              type="file"
              name="headerAds"
              accept="image/*"
              className="px-4 py-2 rounded-md border border-gray-300"
              id="headerAds"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="bannerAds" className="text-lg font-medium text-gray-600">
              Banner Reklam Görseli
            </label>
            <input
              onChange={fileHandle}
              required
              type="file"
              name="bannerAds"
              accept="image/*"
              className="px-4 py-2 rounded-md border border-gray-300"
              id="bannerAds"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            disabled={loader}
            className={`px-4 py-2 rounded-md text-white w-full sm:w-auto ${
              loader ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loader ? "Yükleniyor..." : "Reklam Ekle"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAds;
