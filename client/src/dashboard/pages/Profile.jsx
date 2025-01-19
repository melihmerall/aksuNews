import React, { useContext, useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import storeContext from "./../../context/storeContext";
import { base_url } from "../../config/config";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const { store } = useContext(storeContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Current Image

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${base_url}/api/profile/${store.userInfo.id}`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );

      const { name, email, image } = response.data.writer;
      setName(name);
      setEmail(email);
      setImageUrl(image);
    } catch (error) {
      setMessage("Profil verilerini yüklerken hata oluştu");
      console.error("Fetch Error:", error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [
    store.userInfo.id,
    store.token,
    setName,
    setEmail,
    setImageUrl,
  ]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  /// Handle Profile Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create form data correctly
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("email", email.trim());

      if (image) {
        formData.append("image", image);
      }

      const response = await axios.put(
        `${base_url}/api/update-profile/${store.userInfo.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message);
      fetchProfile();
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(error.response?.data?.message || "Güncelleme başarısız");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('old_password', oldPassword);
        formData.append('new_password', newPassword);

        const response = await axios.post(
            `${base_url}/api/change-password/${store.userInfo.id}`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${store.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        if (response.data) {
            toast.success(response.data.message);
            setOldPassword('');
            setNewPassword('');
            setPasswordError('');
        }
    } catch (error) {
        console.error('Password Change Error:', error);
        toast.error(error?.response?.data?.message || 'Şifre değiştirme başarısız');
        setPasswordError(error?.response?.data?.message || 'Şifre değiştirme başarısız');
    }
};

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 mt-5">
      <div className="bg-white p-6 rounded-lg flex items-center shadow-md">
        <div className="flex-shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile"
              className="w-[150px] h-[150px] rounded-full object-cover"
            />
          ) : (
            <label
              htmlFor="img"
              className="w-[150px] h-[150px] flex flex-col justify-center items-center rounded-full bg-gray-200 border-2 border-dashed border-gray-300 text-gray-600 cursor-pointer hover:bg-gray-200 transition duration-300"
            >
              <FaImage className="text-4xl" />
              <span className="mt-2">Select Image</span>
            </label>
          )}
          <input
            type="file"
            id="img"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="ml-6 text-gray-700 flex flex-col space-y-2">
          <label htmlFor="name" className="text-md font-medium text-gray-600">
            Ad-Soyad:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-xl font-semibold"
            placeholder="Ad-Soyad girişi..."
          />

          <label htmlFor="email" className="text-md font-medium text-gray-600">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-xl font-semibold"
            placeholder="Email girişi..."
          />

         
          <form onSubmit={handleSubmit}>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-800 transition duration-300"
              >
                Profili Güncelle
              </button>
            </div>
          </form>
          {message && <p className="text-center mt-4">{message}</p>}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md text-gray-700">
        <h2 className="text-lg font-bold text-center mb-5">Şifre Değiş</h2>
        <form onSubmit={handlePasswordChange}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="old_password"
                className="block text-md font-semibold text-gray-600"
              >
                Eski Şifren{" "}
              </label>
              <input
                type="password"
                id="old_password"
                name="old_password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Eski şifreni gir"
                className="w-full px-3 py-2 mt-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition duration-300"
              />
            </div>

            <div>
              <label
                htmlFor="new_password"
                className="block text-md font-semibold text-gray-600"
              >
                Yeni Şifren{" "}
              </label>
              <input
                type="password"
                id="new_password"
                name="new_password"
                placeholder="Yeni şifreni gir"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 mt-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition duration-300"
              />
            </div>
          </div>
          {passwordError && <p className="text-center mt-4">{passwordError}</p>}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-800 transition duration-300"
            >
                Şifreyi Değiştir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
