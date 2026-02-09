import React, { useState, useEffect } from "react";
import axios from "axios";

function HomeHoneymoon() {
  const [nationalData, setNationalData] = useState([]);
  const [chosenData, setChosenData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNationalData();
    fetchChosenInternationalData();
  }, []);

  // Fetch all national data
  const fetchNationalData = async () => {
    try {
      const response = await axios.get(
        "https://elitetrips-backend.onrender.com/api/home/homepage-honeymoon"
      );
      setNationalData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching national data:", error);
      setNationalData([]);
      setError("Failed to fetch national data");
    }
  };

  // Fetch all chosen packages
  const fetchChosenInternationalData = async () => {
    try {
      const response = await axios.get(
        "https://elitetrips-backend.onrender.com/api/home/homepage-choosen-honeymoon"
      );
      setChosenData(response.data.chosenPackages || []); // Correctly accessing the "chosenPackages" field
    } catch (error) {
      console.error("Error fetching chosen packages:", error);
      setChosenData([]);
      setError("Failed to fetch chosen packages");
    }
  };

  // Handle package selection for a specific trip
  const handleChoosePackage = async (trip, stateId) => {
    try {
      await axios.post(
        "https://elitetrips-backend.onrender.com/api/home/homepage-honeymoon",
        {
          entryId: trip._id,
          stateId: stateId,
          tripName: trip.tripName,
        }
      );
      alert("Package chosen successfully for " + trip.tripName);
      fetchChosenInternationalData(); // Refresh chosen data
    } catch (error) {
      console.error("Error choosing package:", error);
      setError("Failed to choose package");
    }
  };

  // Handle delete chosen package
  const handleDeletePackage = async (packageId) => {
    try {
      await axios.delete(
        `https://elitetrips-backend.onrender.com/api/home/homepage-honeymoon/${packageId}`
      );
      alert("Package deleted successfully");
      fetchChosenInternationalData(); // Refresh chosen data
    } catch (error) {
      console.error("Error deleting package:", error);
      setError("Failed to delete package");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center">
        Home National Packages
      </h2>
      {/* Display list of chosen packages */}
      <h2 className="text-xl font-bold mt-8 mb-4">
        Chosen Home National Packages
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.isArray(chosenData) && chosenData.length > 0 ? (
          chosenData.map((chosen) => (
            <div
              key={chosen._id}
              className="border border-gray-300 p-4 rounded"
            >
              <h3 className="font-bold text-lg">{chosen.tripName}</h3>
              <div className="flex space-x-2 mt-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeletePackage(chosen._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No chosen packages available</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
        {Array.isArray(nationalData) &&
          nationalData.map((entry) => (
            <div key={entry._id} className="border border-gray-300 p-4 rounded">
              <h3 className="font-bold text-lg">{entry.stateName}</h3>
              <div className="mb-4">
                {Array.isArray(entry.trips) && entry.trips.length > 0 ? (
                  entry.trips.map((trip) => (
                    <div key={trip._id} className="mb-2">
                      <h4 className="font-bold">
                        {trip.tripName || "Unnamed Trip"}
                      </h4>
                      <button
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => handleChoosePackage(trip, entry._id)}
                      >
                        Choose Package
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No trips available</p>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HomeHoneymoon;
