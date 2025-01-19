import React, { useContext } from "react";
import storeContext from "../../context/storeContext";
import profile from "../../assets/profile.png";

const Header = () => {
  const { store } = useContext(storeContext);

  const getRoleName = (role) => {
    switch (role) {
      case "admin":
        return "Yönetici";
      case "yazar":
        return "Yazar";
      default:
        return role;
    }
  };

  const getProfileImage = () => {
    if (store.userInfo?.image) {
      return `${store.userInfo.image}`;
    }
    return profile;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <input
        type="text"
        placeholder="Search..."
        className="w-full sm:w-auto px-4 py-2 rounded-md outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all duration-300"
      />
      <div className="flex items-center gap-4">
        <div className="flex flex-col text-right">
          <span className="font-bold text-gray-800 text-sm">
            {store.userInfo?.name}
          </span>
          <span className="font-medium text-gray-600 text-xs">
            {getRoleName(store.userInfo?.role)}
          </span>
        </div>
        <img
          className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover hover:scale-105 transition-transform duration-300"
          src={getProfileImage()}
          alt={store.userInfo?.name || "Profile"}
        />
      </div>
    </div>
  );
};

export default Header;
