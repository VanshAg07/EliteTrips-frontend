import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";
const OffersHome = () => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [loading, setLoading] = useState(false);
  const [tripDetails, setTripDetails] = useState({
    tripName: "",
    tripPrice: "",
    tripOfferPrice: "",
    tripLocation: "",
    tripDate: [""],
    tripDates: [{ tripDate: "", tripSeats: "" }],
    tripDuration: "",
    tripInclusions: [""],
    tripExclusions: [""],
    tripItinerary: [{ title: "", points: [""] }],
    tripImages: [""],
    pdf: [],
    tripDescription: "",
    tripBackgroundImg: "",
    pickAndDrop: "",
    status: "active",
    overView: "",
    sharing: [{ title: "", price: "" }],
    tripBookingAmount: "",
    tripSeats: "",
    customised: false,
  });

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = () => {
    setLoading(true);
    axios
      .get("http://localhost:5001/api/offer/states")
      .then((response) => {
        const statesList = response.data.map((state) => ({
          name: state.stateName,
          id: state._id,
        }));
        console.log("States:", statesList);
        setStates(statesList);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };
  const handleCustomisedChange = (e) => {
    setTripDetails({ ...tripDetails, customised: e.target.checked });
  };
  // Generic handler to update dynamic arrays like inclusions, exclusions, and itinerary
  const handleArrayChange = (e, index, arrayName, subField = null) => {
    const updatedArray = [...tripDetails[arrayName]];
    if (subField) {
      updatedArray[index][subField] = e.target.value;
    } else {
      updatedArray[index] = e.target.value;
    }
    setTripDetails({ ...tripDetails, [arrayName]: updatedArray });
  };

  // Add a new empty item to the given array field (inclusions, exclusions, itinerary)
  const handleAddItem = (arrayName, emptyItem) => {
    setTripDetails({
      ...tripDetails,
      [arrayName]: [...tripDetails[arrayName], emptyItem],
    });
  };

  // Remove an item from a dynamic array like inclusions, exclusions, itinerary
  const handleRemoveItem = (index, arrayName) => {
    const updatedArray = [...tripDetails[arrayName]];
    updatedArray.splice(index, 1);
    setTripDetails({ ...tripDetails, [arrayName]: updatedArray });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    if (!selectedState) {
      alert("Please select a state before submitting the form.");
      return;
    }
    // console.log(selectedState);
    e.preventDefault();

    const formData = new FormData();
    Object.keys(tripDetails).forEach((key) => {
      if (key === "tripImages") {
        tripDetails.tripImages.forEach((image) => {
          formData.append("tripImages", image);
        });
      } else if (key === "pdf") {
        tripDetails.pdf.forEach((pdf, index) => {
          formData.append("pdf", pdf.file);
          formData.append(`pdfStatus[${index}]`, pdf.status); // Append the corresponding status
        });
      } else if (key === "tripBackgroundImg" && tripDetails.tripBackgroundImg) {
        formData.append("tripBackgroundImg", tripDetails.tripBackgroundImg);
      } else if (Array.isArray(tripDetails[key])) {
        if (key === "tripItinerary") {
          tripDetails.tripItinerary.forEach((item, index) => {
            formData.append(`${key}[${index}][title]`, item.title);
            item.points.forEach((point, pointIndex) => {
              formData.append(`${key}[${index}][points][${pointIndex}]`, point);
            });
          });
        } else if (key === "sharing") {
          tripDetails.sharing.forEach((item, index) => {
            formData.append(`${key}[${index}][title]`, item.title);
            formData.append(`${key}[${index}][price]`, item.price);
          });
        } else if (key === "tripDates") {
          tripDetails.tripDates.forEach((item, index) => {
            formData.append(`tripDates[${index}][tripDate]`, item.tripDate);
            formData.append(`tripDates[${index}][tripSeats]`, item.tripSeats);
          });
        } else {
          tripDetails[key].forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        }
      } else {
        formData.append(key, tripDetails[key]);
      }
    });
    fetch(
      `http://localhost:5001/api/offer/add-offer-package/${selectedState.id}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text || "Network response was not ok");
          });
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Trip submitted successfully", data);
        alert("Trip submitted successfully!");
        setTripDetails({
          tripName: "",
          tripPrice: "",
          tripOfferPrice: "",
          tripDate: [""],
          tripDates: [{ tripDate: "", tripSeats: "" }],
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
          tripBackgroundImg: "",
          overView: "",
          tripBookingAmount: "",
          tripSeats: "",
          customised: false,
        });
      })
      .catch((error) => {
        console.error("Error submitting trip", error);
      });
  };

  const handleImageChange = (e) => {
    const images = Array.from(e.target.files);
    setTripDetails({ ...tripDetails, tripImages: images });
  };
  const handlePackageChange = (e) => {
    const image = e.target.files[0];
    setTripDetails({ ...tripDetails, tripBackgroundImg: image });
  };

  // Handle PDF change function
  const handlePdfChange = (e) => {
    const pdfFiles = Array.from(e.target.files);
    const newPdfs = pdfFiles.map((file) => ({
      file: file,
      status: "active",
    }));
    setTripDetails({ ...tripDetails, pdf: [...tripDetails.pdf, ...newPdfs] });
  };

  const handleSharingChange = (e, index, fieldName) => {
    const updatedSharing = [...tripDetails.sharing];
    const sharingObject = updatedSharing[index];
    sharingObject[fieldName] = e.target.value;
    updatedSharing[index] = sharingObject;
    setTripDetails({ ...tripDetails, sharing: updatedSharing });
  };
  const addSharingField = () => {
    setTripDetails({
      ...tripDetails,
      sharing: [...tripDetails.sharing, { title: "", price: "" }],
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripDetails({ ...tripDetails, [name]: value });
  };
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6">Add Offers Package</h2>
      <form onSubmit={handleSubmit}>
        {/* State Name */}
        <div className="mb-4">
          <label className="block text-gray-700">State Name</label>
          <select
            value={selectedState ? selectedState.name : ""}
            onChange={(e) => {
              const selectedStateObject = states.find(
                (state) => state.name === e.target.value
              );
              setSelectedState(selectedStateObject || "");
            }}
            className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
          >
            <option value="">Select a State</option>
            {states.map((state) => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Trip Name</label>
          <input
            type="text"
            name="tripName"
            value={tripDetails.tripName}
            onChange={(e) => {
              const value = e.target.value;
              // Allow only letters, numbers, "/", and spaces
              if (/^[A-Za-z0-9\/\ ]*$/.test(value)) {
                setTripDetails({ ...tripDetails, tripName: value });
              }
            }}
            onPaste={(e) => {
              e.preventDefault(); // Prevent the default paste behavior
              const paste = e.clipboardData.getData("text");
              // Clean the pasted text to only allow letters, numbers, "/", and spaces
              const cleanedText = paste.replace(/[^A-Za-z0-9\/\ ]/g, "");
              setTripDetails({ ...tripDetails, tripName: cleanedText });
            }}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Trip Location</label>
          <select
            name="tripLocation"
            value={tripDetails.tripLocation}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
          >
            <option value="">Select a Location</option>
            {states.map((state) => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Trip Price</label>
          <input
            type="number"
            name="tripPrice"
            value={tripDetails.tripPrice}
            onChange={(e) =>
              setTripDetails({ ...tripDetails, tripPrice: e.target.value })
            }
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Trip Offer Price</label>
          <input
            type="number"
            name="tripOfferPrice"
            value={tripDetails.tripOfferPrice}
            onChange={(e) =>
              setTripDetails({ ...tripDetails, tripOfferPrice: e.target.value })
            }
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-row  gap-2">
          <input
            type="checkbox"
            name="customised"
            value={tripDetails.customised}
            onChange={handleCustomisedChange}
            className="block border-gray-300 rounded-md border-2 p-1 "
          />
          <label className="block text-l font-medium">Customised</label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Trip Booking Amount</label>
          <input
            type="number"
            name="tripBookingAmount"
            value={tripDetails.tripBookingAmount}
            onChange={(e) =>
              setTripDetails({
                ...tripDetails,
                tripBookingAmount: e.target.value,
              })
            }
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {/* <div>
          <label className="block text-l font-medium">Trip Dates</label>
          {tripDetails.tripDate.map((date, index) => (
            <div key={index} className="flex items-center">
              <input
                type="date"
                value={date}
                onChange={(e) => handleArrayChange(e, index, "tripDate")}
                required
                className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
              />
              <button
                type="button"
                onClick={() => handleAddItem("tripDate")}
                className="ml-2 p-1 text-white bg-green-600 rounded"
              >
                +
              </button>
            </div>
          ))}
        </div> */}
        <div>
          <label className="block text-l font-medium">Trip Dates</label>
          {tripDetails.tripDates.map((dateItem, index) => (
            <div key={index} className="flex items-center mb-2">
              {/* Date Input */}
              <input
                type="date"
                value={dateItem.tripDate}
                onChange={(e) => {
                  const updatedDates = [...tripDetails.tripDates];
                  updatedDates[index].tripDate = e.target.value;
                  setTripDetails({ ...tripDetails, tripDates: updatedDates });
                }}
                className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mr-2"
              />

              {/* Dropdown for Trip Seats */}
              <select
                value={dateItem.tripSeats}
                onChange={(e) => {
                  const updatedDates = [...tripDetails.tripDates];
                  updatedDates[index].tripSeats = e.target.value;
                  setTripDetails({ ...tripDetails, tripDates: updatedDates });
                }}
                className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mr-2"
                required
              >
                <option value="">Select Seat Status</option>
                <option value="Full">Full</option>
                <option value="Available">Available</option>
                <option value="Filling Fast">Filling Fast</option>
              </select>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => {
                  const updatedDates = [...tripDetails.tripDates];
                  updatedDates.splice(index, 1); // Remove this date entry
                  setTripDetails({ ...tripDetails, tripDates: updatedDates });
                }}
                className="ml-2 p-1 text-white bg-red-600 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Add Trip Date Button */}
          <button
            type="button"
            onClick={() => {
              setTripDetails({
                ...tripDetails,
                tripDates: [
                  ...tripDetails.tripDates,
                  { tripDate: "", tripSeats: "" },
                ],
              });
            }}
            className="mt-2 p-1 text-white bg-green-600 rounded"
          >
            Add Trip Date
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Pick and Drop (e.g., Guwahati - Guwahati)
          </label>
          <input
            type="text"
            name="pickAndDrop"
            value={tripDetails.pickAndDrop}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-z\s\-]*$/.test(value)) {
                setTripDetails({ ...tripDetails, pickAndDrop: value });
              }
            }}
            onPaste={(e) => {
              e.preventDefault(); // Prevent the default paste behavior
              const paste = e.clipboardData.getData("text");
              // Clean the pasted text to only allow letters, spaces, and hyphens
              const cleanedText = paste.replace(/[^A-Za-z\s\-]/g, "");
              setTripDetails({ ...tripDetails, pickAndDrop: cleanedText });
            }}
            required
            pattern="^[A-Za-z\s\-]+$"
            title="Only letters, spaces, and hyphens (-) are allowed."
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {/* Trip Overview */}
        <div className="mb-4">
          <label className="block text-gray-700">
            Trip Overview (e.g., Guwahati - Shillong - Cherrapunjee)
          </label>
          <input
            type="text"
            name="overView"
            value={tripDetails.overView}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-z\s\-]*$/.test(value)) {
                setTripDetails({ ...tripDetails, overView: value });
              }
            }}
            onPaste={(e) => {
              e.preventDefault(); // Prevent the default paste behavior
              const paste = e.clipboardData.getData("text");
              // Clean the pasted text to only allow letters, spaces, and hyphens
              const cleanedText = paste.replace(/[^A-Za-z\s\-]/g, "");
              setTripDetails({ ...tripDetails, overView: cleanedText });
            }}
            pattern="^[A-Za-z\s\-]+$"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-l">
            Trip Duration (in days e.g., 3D - 2N)
          </label>
          <input
            type="text"
            name="tripDuration"
            value={tripDetails.tripDuration}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[0-9A-Za-z\s\/\-]*$/.test(value)) {
                setTripDetails({ ...tripDetails, tripDuration: value });
              }
            }}
            onPaste={(e) => {
              const paste = e.clipboardData.getData("text");
              if (!/^[0-9A-Za-z\s\/\-]+$/.test(paste)) {
                e.preventDefault();
              }
            }}
            className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
            required
            pattern="^[0-9A-Za-z\s\-]+$"
          />
        </div>
        <div className="mb-4">
          <label className="block text-l">Trip Description</label>
          <textarea
            type="text"
            name="tripDescription"
            value={tripDetails.tripDescription}
            onChange={(e) => {
              const value = e.target.value;
              // Remove invalid characters after paste
              const sanitizedValue = value.replace(/[^A-Za-z0-9.\-\/\s]/g, "");
              setTripDetails({
                ...tripDetails,
                tripDescription: sanitizedValue,
              });
            }}
            className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
            required
          />
        </div>
        {/* Dynamic Inputs: Trip Inclusions */}
        <div className="mb-4">
          <label className="block text-gray-700">Trip Inclusions:</label>
          {tripDetails.tripInclusions.map((inclusion, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={inclusion}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow letters, numbers, ".", "/", "-", and spaces
                  handleArrayChange(
                    {
                      target: {
                        value: value.replace(/[^A-Za-z0-9.\-\/\s]/g, ""),
                      },
                    },
                    index,
                    "tripInclusions"
                  );
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  const pastedText = e.clipboardData.getData("text");
                  const sanitizedText = pastedText.replace(
                    /[^A-Za-z0-9.\-\/\s]/g,
                    ""
                  );
                  setTimeout(
                    () =>
                      handleArrayChange(
                        { target: { value: sanitizedText } },
                        index,
                        "tripInclusions"
                      ),
                    0
                  );
                }}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveItem(index, "tripInclusions")}
                className="ml-2 text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem("tripInclusions", "")}
            className="text-green-600 mt-2"
          >
            <FaPlus /> Add Inclusion
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Trip Exclusions:</label>
          {tripDetails.tripExclusions.map((exclusion, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={exclusion}
                onChange={(e) => {
                  const value = e.target.value;
                  handleArrayChange(
                    {
                      target: {
                        value: value.replace(/[^A-Za-z0-9.\-\/\s]/g, ""),
                      },
                    },
                    index,
                    "tripExclusions"
                  );
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  const pastedText = e.clipboardData.getData("text");
                  const sanitizedText = pastedText.replace(
                    /[^A-Za-z0-9.\-\/\s]/g,
                    ""
                  );
                  setTimeout(
                    () =>
                      handleArrayChange(
                        { target: { value: sanitizedText } },
                        index,
                        "tripExclusions"
                      ),
                    0
                  );
                }}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveItem(index, "tripExclusions")}
                className="ml-2 text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem("tripExclusions", "")}
            className="text-green-600 mt-2"
          >
            <FaPlus /> Add Exclusion
          </button>
        </div>

        <div>
          <label className="block text-l font-medium">Sharing Options</label>
          {tripDetails.sharing.map((share, index) => (
            <div key={index}>
              <select
                name="title"
                value={share.title}
                placeholder="Sharing Type"
                className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
                onChange={(e) => handleSharingChange(e, index, "title")}
                required
              >
                <option value="">Select Sharing Type</option>
                <option value="Double">Double</option>
                <option value="Triple">Triple</option>
                <option value="Quad">Quad</option>
              </select>
              <input
                type="number"
                name="price"
                value={share.price}
                placeholder="Price"
                className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
                onChange={(e) => handleSharingChange(e, index, "price")}
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addSharingField}
            className="mt-2 p-1 text-white bg-green-600 rounded"
          >
            Add Sharing Options
          </button>
        </div>
        {/* Trip Itinerary */}
        <div className="mb-4">
          <label className="block text-gray-700">Trip Itinerary:</label>
          {tripDetails.tripItinerary.map((itinerary, index) => (
            <div key={index} className="mb-2">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Itinerary Title"
                  value={itinerary.title}
                  onChange={(e) => {
                    const value = e.target.value.replace(
                      /[^A-Za-z0-9.\-\/\s]/g,
                      ""
                    ); // Allow spaces
                    handleArrayChange(
                      { target: { value } },
                      index,
                      "tripItinerary",
                      "title"
                    );
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pastedText = e.clipboardData.getData("text");
                    const sanitizedText = pastedText.replace(
                      /[^A-Za-z0-9.\-\/\s]/g,
                      ""
                    ); // Allow spaces
                    setTimeout(
                      () =>
                        handleArrayChange(
                          { target: { value: sanitizedText } },
                          index,
                          "tripItinerary",
                          "title"
                        ),
                      0
                    );
                  }}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index, "tripItinerary")}
                  className="ml-2 text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
              <div className="ml-4 mt-2">
                <label className="block text-gray-600">Points:</label>
                {itinerary.points.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => {
                        const value = e.target.value.replace(
                          /[^A-Za-z0-9.\-\/\s]/g,
                          ""
                        ); // Allow spaces
                        const updatedItinerary = [...tripDetails.tripItinerary];
                        updatedItinerary[index].points[pointIndex] = value;
                        setTripDetails({
                          ...tripDetails,
                          tripItinerary: updatedItinerary,
                        });
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        const pastedText = e.clipboardData.getData("text");
                        const sanitizedText = pastedText.replace(
                          /[^A-Za-z0-9.\-\/\s]/g,
                          ""
                        ); // Allow spaces
                        setTimeout(() => {
                          const updatedItinerary = [
                            ...tripDetails.tripItinerary,
                          ];
                          updatedItinerary[index].points[pointIndex] =
                            sanitizedText;
                          setTripDetails({
                            ...tripDetails,
                            tripItinerary: updatedItinerary,
                          });
                        }, 0);
                      }}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedItinerary = [...tripDetails.tripItinerary];
                        updatedItinerary[index].points.splice(pointIndex, 1);
                        setTripDetails({
                          ...tripDetails,
                          tripItinerary: updatedItinerary,
                        });
                      }}
                      className="ml-2 text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const updatedItinerary = [...tripDetails.tripItinerary];
                    updatedItinerary[index].points.push("");
                    setTripDetails({
                      ...tripDetails,
                      tripItinerary: updatedItinerary,
                    });
                  }}
                  className="text-green-600 mt-2"
                >
                  <FaPlus /> Add Point
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              handleAddItem("tripItinerary", { title: "", points: [""] })
            }
            className="text-green-600 mt-2"
          >
            <FaPlus /> Add Itinerary Item
          </button>
        </div>

        <div>
          <label className="block text-l font-medium">
            Trip Images (i.e. Card Image)
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
          />
        </div>
        <div>
          <label className="block text-l font-medium">
            Package Image ( i.e. Background Image )
          </label>
          <input
            type="file"
            required
            onChange={handlePackageChange}
            className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
          />
        </div>
        <div>
          <label className="block text-l font-medium">
            Upload PDF (i.e. Itinerary)
            <br /> <span className="text-red-500">Note: PDF size 60mb</span>
          </label>
          <input
            type="file"
            multiple
            onChange={handlePdfChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
          />
          {tripDetails.pdf.map((pdf, index) => (
            <div key={index} className="flex items-center mb-2">
              <span className="mr-2">{pdf.file.name}</span>
              <select
                value={pdf.status}
                onChange={(e) => {
                  const updatedPdfs = [...tripDetails.pdf];
                  updatedPdfs[index].status = e.target.value;
                  setTripDetails({ ...tripDetails, pdf: updatedPdfs });
                }}
                className="border-gray-300 rounded-md border-2 p-1"
              >
                <option value="active">Active</option>
                <option value="non-active">Non-active</option>
              </select>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit Package
        </button>
      </form>
    </div>
  );
};

export default OffersHome;
