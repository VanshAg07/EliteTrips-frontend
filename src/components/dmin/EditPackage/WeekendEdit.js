import React, { useState, useEffect } from "react";
import axios from "axios";

function WeekendEdit() {
  const [packages, setPackages] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [newPdfFile, setNewPdfFile] = useState(null);
  const [newTripImage, setNewTripImage] = useState(null);
  const [newBackgroundImg, setNewBackgroundImg] = useState(null);
  const [tripDetails, setTripDetails] = useState({
    tripName: "",
    tripPrice: "",
    tripDate: [""],
    tripLocation: "",
    tripDuration: "",
    tripInclusions: [""],
    tripExclusions: [""],
    tripItinerary: [{ title: "", points: [""] }],
    tripImages: [],
    pdf: [],
    tripDescription: [""],
    pickAndDrop: "",
    sharing: [{ title: "", price: "" }],
    tripBackgroundImg: [],
    overView: "",
    status: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const statusOptions = ["active", "non-active"];
  useEffect(() => {
    axios
      .get("https://elitetrips-backend.onrender.com/api/edit-packages/get-weekends-packages")
      .then((response) => {
        if (response.data) {
          const packages = response.data.states || [];
          packages.forEach((pkg) => {
            pkg.trips.forEach((trip) => {
              if (!Array.isArray(trip.tripDate)) {
                trip.tripDate = [trip.tripDate];
              }
            });
          });
          setPackages(packages);
        }
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
      });
  }, []);

  const handleSelectTrip = (pkg, trip) => {
    setSelectedTrip({ ...pkg, ...trip });
    setTripDetails({
      tripName: trip.tripName || "",
      tripDuration: trip.tripDuration || "",
      tripPrice: trip.tripPrice || 0,
      tripDescription: trip.tripDescription || [""],
      tripInclusions: trip.tripInclusions || [""],
      tripExclusions: trip.tripExclusions || [""],
      tripItinerary: trip.tripItinerary || [{ title: "", points: [""] }],
      sharing: trip.sharing || [{ title: "", price: "" }],
      overView: trip.overView || "",
      tripDate: trip.tripDate || [],
      tripLocation: trip.tripLocation || "",
      pickAndDrop: trip.pickAndDrop || "",
      status: trip.status || "",
      pdf: trip.pdf || [],
      tripImages: trip.tripImages || [],
      tripBackgroundImg: trip.tripBackgroundImg || [],
    });
    setIsModalOpen(true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleArrayChange = (name, index, value) => {
    setTripDetails((prevDetails) => {
      const newArray = [...prevDetails[name]];
      newArray[index] = value;
      return { ...prevDetails, [name]: newArray };
    });
  };

  const handleItineraryChange = (index, field, value) => {
    setTripDetails((prevDetails) => {
      const newItinerary = [...prevDetails.tripItinerary];
      newItinerary[index][field] = value;
      return { ...prevDetails, tripItinerary: newItinerary };
    });
  };

  const handlePointsChange = (index, pointIndex, value) => {
    setTripDetails((prevDetails) => {
      const newItinerary = [...prevDetails.tripItinerary];
      newItinerary[index].points[pointIndex] = value;
      return { ...prevDetails, tripItinerary: newItinerary };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTrip) {
      const formData = new FormData();
      formData.append("tripDetails", JSON.stringify(tripDetails));
      if (newPdfFile) formData.append("pdf", newPdfFile);
      if (newTripImage) formData.append("tripImage", newTripImage);
      if (newBackgroundImg)
        formData.append("tripBackgroundImg", newBackgroundImg);

      axios
        .put(
          `https://elitetrips-backend.onrender.com/api/edit-packages/edit-weekends-package/${selectedTrip.stateName}/${selectedTrip._id}`,
          tripDetails
        )
        .then((response) => {
          alert("Trip details updated successfully!");
          // console.log("Updated Trip Details:", response.data);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("Error updating trip:", error);
        });
    }
  };

  const handleDeleteTrip = (pkg, tripId) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the trip: ${tripId}?`
    );
    if (confirmed) {
      axios
        .delete(
          `https://elitetrips-backend.onrender.com/api/edit-packages/delete-weekends-package/${pkg.stateName}/${tripId}`
        )
        .then((response) => {
          alert("Trip deleted successfully!");
          setPackages((prevPackages) =>
            prevPackages.map((p) =>
              p._id === pkg._id
                ? { ...p, trips: p.trips.filter((trip) => trip._id !== tripId) }
                : p
            )
          );
        })
        .catch((error) => {
          console.error("Error deleting trip:", error);
        });
    }
  };

  const handleStatusChange = (index, value) => {
    const updatedPdf = [...tripDetails.pdf];
    updatedPdf[index].status = value;
    setTripDetails((prevDetails) => ({ ...prevDetails, pdf: updatedPdf }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "pdf") setNewPdfFile(file);
    else if (type === "tripImage") setNewTripImage(file);
    else if (type === "tripBackgroundImg") setNewBackgroundImg(file);
  };

  const handleDateChange = (index, newDate) => {
    setTripDetails((prevDetails) => {
      const newDates = [...prevDetails.tripDate];
      newDates[index] = newDate;
      return { ...prevDetails, tripDate: newDates };
    });
  };

  const handleDeleteDate = (index) => {
    setTripDetails((prevDetails) => {
      const newDates = prevDetails.tripDate.filter((_, i) => i !== index);
      return { ...prevDetails, tripDate: newDates };
    });
  };

  const handleAddDate = () => {
    setTripDetails((prevDetails) => ({
      ...prevDetails,
      tripDate: [...prevDetails.tripDate, ""],
    }));
  };
  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Edit National Packages
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <div
              key={pkg._id}
              className={`cursor-pointer border p-3 rounded-lg text-lg ${
                selectedState === pkg._id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() =>
                setSelectedState(selectedState === pkg._id ? null : pkg._id)
              }
            >
              {pkg.stateName}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No national packages available.
          </p>
        )}
      </div>

      {selectedState && (
        <div className="border-t pt-6">
          {packages
            .filter((pkg) => pkg._id === selectedState)
            .map((pkg) => (
              <ul key={pkg._id} className="space-y-4">
                {pkg.trips.map((trip) => (
                  <li
                    key={trip._id}
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                  >
                    <div>
                      <span className="font-medium">
                        {trip.tripName || "Unnamed Trip"}
                      </span>{" "}
                      - {trip.tripDuration || "No Duration"}
                    </div>
                    <div>
                      <button
                        onClick={() => handleSelectTrip(pkg, trip)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTrip(pkg, trip._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ))}
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-[60vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6 text-center sticky top-0 bg-white">
              Editing Trip in {selectedTrip.stateName} - {tripDetails.tripName}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Status:
                </label>
                <select
                  name="status"
                  value={tripDetails.status}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded-lg"
                >
                  <option value="">Select a status</option>
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Trip Name:
                </label>
                <input
                  type="text"
                  name="tripName"
                  value={tripDetails.tripName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded-lg"
                />
              </div>
              <div>
                <h4>PDF Files</h4>
                {tripDetails.pdf.map((pdf, index) => (
                  <div key={pdf._id} className="flex items-center mb-2">
                    <span>{pdf.filename}</span>
                    <select
                      value={pdf.status}
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value)
                      }
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() =>
                        window.open(
                          `https://elitetrips-backend.onrender.com/upload/${pdf.filename}`,
                          "_blank"
                        )
                      }
                      className="bg-green-500 text-white px-2 py-1 rounded-lg ml-2"
                    >
                      Open PDF
                    </button>
                  </div>
                ))}
                {/* <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "pdf")}
                  accept=".pdf"
                /> */}
              </div>
              {/* <div>
                <h4>Trip Images</h4>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "tripImages")}
                  accept="image/*"
                />
              </div>
              <div>
                <h4>Background Image</h4>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "tripBackgroundImg")}
                  accept="image/*"
                />
              </div> */}
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Duration:
                </label>
                <input
                  type="text"
                  name="tripDuration"
                  value={tripDetails.tripDuration}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Price:
                </label>
                <input
                  type="number"
                  name="tripPrice"
                  value={tripDetails.tripPrice}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Description:
                </label>
                <textarea
                  name="tripDescription"
                  value={tripDetails.tripDescription}
                  onChange={handleInputChange}
                  rows="4"
                  required
                  className="mt-1 p-2 w-full border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  OverView:
                </label>
                <textarea
                  name="overView"
                  value={tripDetails.overView}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Trip Dates:
                </label>
                {tripDetails.tripDate.map((date, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => handleDateChange(index, e.target.value)}
                      className="mt-1 p-2 flex-grow border rounded-lg mr-2"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteDate(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddDate}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2"
                >
                  Add Date
                </button>
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Trip Location:
                </label>
                <textarea
                  name="tripLocation"
                  value={tripDetails.tripLocation}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Pick And Drop Points:
                </label>
                <textarea
                  name="pickAndDrop"
                  value={tripDetails.pickAndDrop}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Inclusions:
                </label>
                {tripDetails.tripInclusions.map((inclusion, index) => (
                  <input
                    key={index}
                    type="text"
                    value={inclusion}
                    onChange={(e) =>
                      handleArrayChange("tripInclusions", index, e.target.value)
                    }
                    className="mt-1 p-2 w-full border rounded-lg mb-2"
                  />
                ))}
                <button
                  type="button"
                  onClick={() =>
                    handleArrayChange(
                      "tripInclusions",
                      tripDetails.tripInclusions.length,
                      ""
                    )
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Add Inclusions
                </button>
              </div>

              {/* Exclusions */}
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Exclusions:
                </label>
                {tripDetails.tripExclusions.map((exclusion, index) => (
                  <input
                    key={index}
                    type="text"
                    value={exclusion}
                    onChange={(e) =>
                      handleArrayChange("tripExclusions", index, e.target.value)
                    }
                    className="mt-1 p-2 w-full border rounded-lg mb-2"
                  />
                ))}
                <button
                  type="button"
                  onClick={() =>
                    handleArrayChange(
                      "tripExclusions",
                      tripDetails.tripExclusions.length,
                      ""
                    )
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Add Exclusions
                </button>
              </div>

              {/* Itinerary */}
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Itinerary:
                </label>
                {tripDetails.tripItinerary.map((item, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        handleItineraryChange(index, "title", e.target.value)
                      }
                      placeholder="Day Title"
                      className="mt-1 p-2 w-full border rounded-lg mb-2"
                    />
                    {item.points.map((point, pointIndex) => (
                      <input
                        key={pointIndex}
                        type="text"
                        value={point}
                        onChange={(e) =>
                          handlePointsChange(index, pointIndex, e.target.value)
                        }
                        placeholder="Point of Interest"
                        className="mt-1 p-2 w-full border rounded-lg mb-2"
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        handlePointsChange(index, item.points.length, "")
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                      Add Point
                    </button>
                  </div>
                ))}
              </div>

              {/* Sharing Options */}
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Sharing Options:
                </label>
                {tripDetails.sharing.map((option, index) => (
                  <div key={index} className="mb-4 flex space-x-2">
                    <input
                      type="text"
                      value={option.title}
                      onChange={(e) =>
                        handleArrayChange("sharing", index, {
                          ...option,
                          title: e.target.value,
                        })
                      }
                      placeholder="Option Title"
                      className="mt-1 p-2 w-full border rounded-lg"
                    />
                    <input
                      type="number"
                      value={option.price}
                      onChange={(e) =>
                        handleArrayChange("sharing", index, {
                          ...option,
                          price: e.target.value,
                        })
                      }
                      placeholder="Option Price"
                      className="mt-1 p-2 w-full border rounded-lg"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setTripDetails((prevDetails) => ({
                      ...prevDetails,
                      sharing: [
                        ...prevDetails.sharing,
                        { title: "", price: "" },
                      ],
                    }))
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Add Sharing Option
                </button>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeekendEdit;
