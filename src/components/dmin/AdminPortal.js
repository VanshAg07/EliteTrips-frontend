import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import UserDetails from "./UserDetails";
import National from "./National";
import Bookings from "./Bookings/Bookings";
import HomeIntern from "./AddInternational/HomeIntern";
import AddHoneymoon from "./Honeymoon/AddHoneymoon";
import NationalEdit from "./EditPackage/NationalEdit";
import Dashboard from "./Dashboard";
import BlogForm from "./Blogs/BlogForm";
import InternationalEdit from "./EditPackage/InternationalEdit";
import HoneymoonEdit from "./EditPackage/HoneymoonEdit";
import BlogsEdit from "./EditPackage/BlogsEdit";
import OffersHome from "./OffersHome";
import EditOffer from "./EditPackage/EditOffer";
import EditNationalDetails from "./EditPackageShops/EditNationalDetails";

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [openSubmenu, setOpenSubmenu] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("http://localhost:5001/api/admin/logout")
      .then(() => {
        localStorage.clear();
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  const handleMainTabClick = (tabName) => {
    setActiveTab(tabName);
    setOpenSubmenu("");
  };

  const handleSubmenuToggle = (submenuName) => {
    setOpenSubmenu((prev) => (prev === submenuName ? "" : submenuName));
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <nav className="w-1/6 h-full bg-gray-900 text-white fixed top-0 left-0 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <ul className="space-y-2 p-4">
            <li>
              <button
                onClick={() => handleMainTabClick("home")}
                className={`block w-full text-left py-3 px-4 rounded-lg ${
                  activeTab === "home" ? "bg-red-600" : "hover:bg-gray-700"
                }`}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleMainTabClick("user-details")}
                className={`block w-full text-left py-3 px-4 rounded-lg ${
                  activeTab === "user-details" ? "bg-red-600" : "hover:bg-gray-700"
                }`}
              >
                My Users
              </button>
            </li>
            <li>
              <button
                onClick={() => handleMainTabClick("bookings")}
                className={`block w-full text-left py-3 px-4 rounded-lg ${
                  activeTab === "bookings" ? "bg-red-600" : "hover:bg-gray-700"
                }`}
              >
                My Bookings
              </button>
            </li>
            <li>
              <div>
                <button
                  onClick={() => handleSubmenuToggle("add-packages")}
                  className={`block w-full text-left py-3 px-4 rounded-lg ${
                    activeTab.startsWith("add")
                      ? "bg-red-600"
                      : "hover:bg-gray-700"
                  }`}
                >
                  Add Packages
                </button>
                {openSubmenu === "add-packages" && (
                  <ul className="pl-6 mt-2 space-y-2">
                    <li
                      onClick={() => setActiveTab("add-national")}
                      className={`py-2 px-4 rounded-lg cursor-pointer ${
                        activeTab === "add-national"
                          ? "bg-gray-700"
                          : "hover:bg-gray-600"
                      }`}
                    >
                      National
                    </li>
                    <li
                      onClick={() => setActiveTab("add-international")}
                      className={`py-2 px-4 rounded-lg cursor-pointer ${
                        activeTab === "add-international"
                          ? "bg-gray-700"
                          : "hover:bg-gray-600"
                      }`}
                    >
                      International
                    </li>
                    <li
                      onClick={() => setActiveTab("add-honeymoon")}
                      className={`py-2 px-4 rounded-lg cursor-pointer ${
                        activeTab === "add-honeymoon"
                          ? "bg-gray-700"
                          : "hover:bg-gray-600"
                      }`}
                    >
                      Honeymoon
                    </li>
                    <li
                      onClick={() => setActiveTab("add-offers")}
                      className={`py-2 px-4 rounded-lg cursor-pointer ${
                        activeTab === "add-offers"
                          ? "bg-gray-700"
                          : "hover:bg-gray-600"
                      }`}
                    >
                      Offers
                    </li>
                    <li
                      onClick={() => setActiveTab("add-blogs")}
                      className={`py-2 px-4 rounded-lg cursor-pointer ${
                        activeTab === "add-blogs"
                          ? "bg-gray-700"
                          : "hover:bg-gray-600"
                      }`}
                    >
                      Blogs
                    </li>
                  </ul>
                )}
              </div>
            </li>
            <li>
              <div>
                <button
                  onClick={() => handleSubmenuToggle("edit-packages")}
                  className={`block w-full text-left py-3 px-4 rounded-lg ${
                    activeTab.startsWith("edit")
                      ? "bg-red-600"
                      : "hover:bg-gray-700"
                  }`}
                >
                  Edit Packages
                </button>
                {openSubmenu === "edit-packages" && (
                  <ul className="pl-6 mt-2 space-y-2">
                    <li
                      onClick={() => setActiveTab("edit-national")}
                      className={`py-2 px-4 rounded-lg cursor-pointer ${
                        activeTab === "edit-national"
                          ? "bg-gray-700"
                          : "hover:bg-gray-600"
                      }`}
                    >
                      National
                    </li>
                    <li
                      onClick={() => setActiveTab("edit-international")}
                      className={`py-2 px-4 rounded-lg cursor-pointer ${
                        activeTab === "edit-international"
                          ? "bg-gray-700"
                          : "hover:bg-gray-600"
                      }`}
                    >
                      International
                    </li>
                    <li
                      onClick={() => setActiveTab("edit-national-details")}
                      className={`py-2 px-4 rounded-lg cursor-pointer ${
                        activeTab === "edit-national-details"
                          ? "bg-gray-700"
                          : "hover:bg-gray-600"
                      }`}
                    >
                      Shop,Places
                    </li>
                    <li
                      onClick={() => setActiveTab("edit-honeymoon")}
                      className={`py-2 px-4 rounded-lg cursor-pointer ${
                        activeTab === "edit-honeymoon"
                          ? "bg-gray-700"
                          : "hover:bg-gray-600"
                      }`}
                    >
                      Honeymoon
                    </li>
                    <li
                      onClick={() => setActiveTab("edit-blogs")}
                      className={`py-2 px-4 rounded-lg cursor-pointer ${
                        activeTab === "edit-blogs"
                          ? "bg-gray-700"
                          : "hover:bg-gray-600"
                      }`}
                    >
                      Blogs
                    </li>
                    <li
                      onClick={() => setActiveTab("edit-offer")}
                      className={`py-2 px-4 rounded-lg cursor-pointer ${
                        activeTab === "edit-offer"
                          ? "bg-gray-700"
                          : "hover:bg-gray-600"
                      }`}
                    >
                      Offer
                    </li>
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            onClick={handleLogout}
            className="block w-[85%] text-center py-4 px-4 bg-red-600 hover:bg-red-700 mt-auto mb-4 rounded-lg"
          >
            Logout
          </button>
        </div>
      </nav>
      {/* Main Content Area */}
      <div className="ml-[17%] w-[80%] p-8">
        {activeTab === "user-details" && <UserDetails />}
        {activeTab === "home" && <Dashboard />}
        {activeTab === "add-national" && <National />}
        {activeTab === "add-international" && <HomeIntern />}
        {activeTab === "bookings" && <Bookings />}
        {activeTab === "add-honeymoon" && <AddHoneymoon />}
        {activeTab === "add-offers" && <OffersHome />}
        {activeTab === "edit-national" && <NationalEdit />}
        {activeTab === "edit-international" && <InternationalEdit />}
        {activeTab === "edit-honeymoon" && <HoneymoonEdit />}
        {activeTab === "edit-offer" && <EditOffer />}
        {activeTab === "edit-blogs" && <BlogsEdit />}
        {activeTab === "add-blogs" && <BlogForm />}
        {activeTab === "edit-national-details" && <EditNationalDetails />}
      </div>
    </div>
  );
};

export default AdminPortal;
