import React, { useState } from "react";
import AdminPanel from "./AdminPanel";
import RichFlavour from "./RichFlavour";
import Shop from "./Shop";
import BeautifulPlaces from "./BeautifulPlaces";
import BestActivities from "./BestActivities";

const National = () => {
  const [activeTab, setActiveTab] = useState("adminPanel");

  // Function to render the active component based on the selected tab
  const renderActiveComponent = () => {
    switch (activeTab) {
      case "adminPanel":
        return <AdminPanel />;
      case "richFlavour":
        return <RichFlavour />;
      case "shop":
        return <Shop />;
      case "beautifulPlaces":
        return <BeautifulPlaces />;
      case "bestActivities":
        return <BestActivities />;
      default:
        return <AdminPanel />; // Default component
    }
  };

  return (
    <div className="p-4">
      {/* Tab Bar */}
      <div className="flex justify-around mb-4">
        <button
          className={`px-4 py-2 text-white rounded-lg transition-colors duration-200 ${
            activeTab === "adminPanel"
              ? "bg-blue-600"
              : "bg-blue-400 hover:bg-blue-500"
          }`}
          onClick={() => setActiveTab("adminPanel")}
        >
          Trip Package
        </button>
        <button
          className={`px-4 py-2 text-white rounded-lg transition-colors duration-200 ${
            activeTab === "richFlavour"
              ? "bg-blue-600"
              : "bg-blue-400 hover:bg-blue-500"
          }`}
          onClick={() => setActiveTab("richFlavour")}
        >
          Rich Flavour
        </button>
        <button
          className={`px-4 py-2 text-white rounded-lg transition-colors duration-200 ${
            activeTab === "shop"
              ? "bg-blue-600"
              : "bg-blue-400 hover:bg-blue-500"
          }`}
          onClick={() => setActiveTab("shop")}
        >
          Shop
        </button>
        <button
          className={`px-4 py-2 text-white rounded-lg transition-colors duration-200 ${
            activeTab === "beautifulPlaces"
              ? "bg-blue-600"
              : "bg-blue-400 hover:bg-blue-500"
          }`}
          onClick={() => setActiveTab("beautifulPlaces")}
        >
          Beautiful Places
        </button>
        <button
          className={`px-4 py-2 text-white rounded-lg transition-colors duration-200 ${
            activeTab === "bestActivities"
              ? "bg-blue-600"
              : "bg-blue-400 hover:bg-blue-500"
          }`}
          onClick={() => setActiveTab("bestActivities")}
        >
          Best Activities
        </button>
      </div>

      {/* Render Active Component */}
      <div className="border rounded-lg border-gray-300 p-4">
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default National;
