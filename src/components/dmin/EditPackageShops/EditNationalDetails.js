import React, { useState } from "react";
import EditNationalShop from "./EditNationalShop";
import EditNationalActivity from "./EditNationalActivity";
import EditNationalFlavour from "./EditNationalFlavour";
import EditNationalPlaces from "./EditNationalPlaces";
import EditInternationalActivity from "./EditInternationalDetails/EditInternationalActivity";
import EditInternationalShop from "./EditInternationalDetails/EditInternationalShop";
import EditInternationalFlavour from "./EditInternationalDetails/EditInternationalFlavour";
import EditInternationalPlaces from "./EditInternationalDetails/EditInternationalPlaces";

function EditNationalDetails() {
  const [selectedTab, setSelectedTab] = useState("National");
  const [nationalTab, setNationalTab] = useState("Shop");
  const [interNationalTab, setinterNationalTab] = useState("Shop");

  const renderNationalContent = () => {
    switch (nationalTab) {
      case "Shop":
        return <EditNationalShop />;
      case "Activity":
        return <EditNationalActivity />;
      case "Flavour":
        return <EditNationalFlavour />;
      case "Places":
        return <EditNationalPlaces />;
      default:
        return null;
    }
  };

  const renderInterNationalContent = () => {
    switch (interNationalTab) {
      case "Shop":
        return <EditInternationalShop />;
      case "Activity":
        return <EditInternationalActivity />;
      case "Flavour":
        return <EditInternationalFlavour />;
      case "Places":
        return <EditInternationalPlaces />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "National":
        return (
          <div>
            <div className="flex justify-center space-x-4 mb-8">
              {["Shop", "Activity", "Flavour", "Places"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-md rounded-lg shadow-md ${
                    nationalTab === tab
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                  onClick={() => setNationalTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div>{renderNationalContent()}</div>
          </div>
        );
      case "International":
        return (
          <div>
            <div className="flex justify-center space-x-4 mb-8">
              {["Shop", "Activity", "Flavour", "Places"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-md rounded-lg shadow-md ${
                    interNationalTab === tab
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                  onClick={() => setinterNationalTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div>{renderInterNationalContent()}</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Edit Details
      </h1>
      <div className="flex justify-center space-x-4 mb-8">
        {["National", "International"].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 text-lg rounded-lg shadow-md ${
              selectedTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">{renderContent()}</div>
    </div>
  );
}

export default EditNationalDetails;
