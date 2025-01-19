import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { base_url } from "../../config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import storeContext from "../../context/storeContext";

const AddWriter = () => {
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const { store } = useContext(storeContext);

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const { data } = await axios.post(`${base_url}/api/writer/add`, state, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setLoader(false);
      toast.success(data.message);
      navigate("/dashboard/writers");
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-screen-md mx-auto">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Yazar Ekle</h2>
        <Link
          className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600 transition duration-300"
          to="/dashboard/writers"
        >
          Yazarlar
        </Link>
      </div>

      <form onSubmit={submit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="name"
              className="text-lg font-medium text-gray-600"
            >
              Ad Soyad
            </label>
            <input
              onChange={inputHandle}
              value={state.name}
              required
              type="text"
              placeholder="Ad Soyad"
              name="name"
              className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-300"
              id="name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="email"
              className="text-lg font-medium text-gray-600"
            >
              Email
            </label>
            <input
              onChange={inputHandle}
              value={state.email}
              required
              type="email"
              placeholder="Email"
              name="email"
              className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-300"
              id="email"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="password"
              className="text-lg font-medium text-gray-600"
            >
              Şifre
            </label>
            <input
              onChange={inputHandle}
              value={state.password}
              required
              type="password"
              placeholder="Şifre"
              name="password"
              className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-300"
              id="password"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            disabled={loader}
            className={`px-4 py-2 rounded-md text-white w-full sm:w-auto ${loader ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 transition duration-300"}`}
          >
            {loader ? "Loading..." : "Yazar Ekle"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWriter;