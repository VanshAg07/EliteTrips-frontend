import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

// helper function to convert Google Drive URL to displayable format
const convertGoogleDriveUrl = (url) => {
  if (!url) return url;

  // Already in lh3 format
  if (url.includes('lh3.googleusercontent.com')) {
    return url;
  }

  // Extract file ID from various Google Drive URL formats
  let fileId = null;

  // Format: https://drive.google.com/file/d/FILE_ID/view
  const fileMatch = url.match(/\/file\/d\/([^\/]+)/);
  if (fileMatch) {
    fileId = fileMatch[1];
  }

  // Format: https://drive.google.com/open?id=FILE_ID
  const openMatch = url.match(/[?&]id=([^&]+)/);
  if (openMatch) {
    fileId = openMatch[1];
  }

  // Format: https://drive.google.com/uc?id=FILE_ID
  const ucMatch = url.match(/uc\?.*id=([^&]+)/);
  if (ucMatch) {
    fileId = ucMatch[1];
  }

  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return url;
};

const AdminPanel = () => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [loading, setLoading] = useState(false);
  const [useGoogleDrive, setUseGoogleDrive] = useState(false);
  const [tripImagesUrls, setTripImagesUrls] = useState([""]);
  const [tripBackgroundImgUrl, setTripBackgroundImgUrl] = useState("");
  const [tripImagesPreview, setTripImagesPreview] = useState([]);
  const [backgroundImgPreview, setBackgroundImgPreview] = useState("");
  const [tripData, setTripData] = useState({
    tripName: "",
    tripPrice: "",
    tripOfferPrice: "",
    tripDates: [{ tripDate: "", tripSeats: "" }],
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
    tripBackgroundImg: "",
    overView: "",
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
      .get("https://elitetrips-backend.onrender.com/api/trip/states")
      .then((response) => {
        const statesList = response.data.map((state) => ({
          name: state.stateName,
          id: state._id,
        }));
        // console.log("States:", statesList);
        setStates(statesList);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripData({ ...tripData, [name]: value });
  };
  const handleCustomisedChange = (e) => {
    setTripData({ ...tripData, customised: e.target.checked });
  };
  const handleArrayChange = (e, index, fieldName) => {
    const updatedArray = [...tripData[fieldName]];
    updatedArray[index] = e.target.value;
    setTripData({ ...tripData, [fieldName]: updatedArray });
  };

  const addField = (fieldName) => {
    setTripData({ ...tripData, [fieldName]: [...tripData[fieldName], ""] });
  };

  const handleItineraryChange = (e, index, fieldName, itineraryIndex) => {
    const updatedItinerary = [...tripData.tripItinerary];
    if (fieldName === "title") {
      updatedItinerary[index].title = e.target.value;
    } else {
      updatedItinerary[index].points[itineraryIndex] = e.target.value;
    }
    setTripData({ ...tripData, tripItinerary: updatedItinerary });
  };
  const handleSharingChange = (e, index, fieldName) => {
    const updatedSharing = [...tripData.sharing];
    const sharingObject = updatedSharing[index];
    sharingObject[fieldName] = e.target.value;
    updatedSharing[index] = sharingObject;
    setTripData({ ...tripData, sharing: updatedSharing });
  };
  const addItineraryField = () => {
    setTripData({
      ...tripData,
      tripItinerary: [...tripData.tripItinerary, { title: "", points: [""] }],
    });
  };
  const addSharingField = () => {
    setTripData({
      ...tripData,
      sharing: [...tripData.sharing, { title: "", price: "" }],
    });
  };

  const addItineraryPoint = (index) => {
    const updatedItinerary = [...tripData.tripItinerary];
    updatedItinerary[index].points.push("");
    setTripData({ ...tripData, tripItinerary: updatedItinerary });
  };

  const handleImageChange = (e) => {
    const images = Array.from(e.target.files);
    setTripData({ ...tripData, tripImages: images });
  };
  const handlePackageChange = (e) => {
    const image = e.target.files[0];
    setTripData({ ...tripData, tripBackgroundImg: image });
  };
  // Handle PDF change function
  const handlePdfChange = (e) => {
    const pdfFiles = Array.from(e.target.files);
    const newPdfs = pdfFiles.map((file) => ({
      file: file,
      status: "active",
    }));
    setTripData({ ...tripData, pdf: [...tripData.pdf, ...newPdfs] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedState) {
      alert("Please select a state before submitting the form.");
      return;
    }
    setLoading(true);

    const formData = new FormData();

    // Add Google Drive URLs if using Google Drive
    if (useGoogleDrive) {
      // Filter out empty URLs
      const validUrls = tripImagesUrls.filter(url => url.trim() !== '');
      if (validUrls.length > 0) {
        formData.append("tripImagesUrls", JSON.stringify(validUrls));
      }
      if (tripBackgroundImgUrl.trim()) {
        formData.append("tripBackgroundImgUrl", tripBackgroundImgUrl);
      }
    }

    Object.keys(tripData).forEach((key) => {
      if (key === "tripImages") {
        // Only append file images if not using Google Drive
        if (!useGoogleDrive) {
          tripData.tripImages.forEach((image) => {
            formData.append("tripImages", image);
          });
        }
      } else if (key === "pdf") {
        // PDF is now optional - only append if there are PDFs
        if (tripData.pdf && tripData.pdf.length > 0) {
          tripData.pdf.forEach((pdf, index) => {
            formData.append("pdf", pdf.file);
            formData.append(`pdfStatus[${index}]`, pdf.status);
          });
        }
      } else if (key === "tripBackgroundImg") {
        // Only append file image if not using Google Drive
        if (!useGoogleDrive && tripData.tripBackgroundImg) {
          formData.append("tripBackgroundImg", tripData.tripBackgroundImg);
        }
      } else if (Array.isArray(tripData[key])) {
        if (key === "tripItinerary") {
          tripData.tripItinerary.forEach((item, index) => {
            formData.append(`${key}[${index}][title]`, item.title);
            item.points.forEach((point, pointIndex) => {
              formData.append(`${key}[${index}][points][${pointIndex}]`, point);
            });
          });
        } else if (key === "sharing") {
          tripData.sharing.forEach((item, index) => {
            formData.append(`${key}[${index}][title]`, item.title);
            formData.append(`${key}[${index}][price]`, item.price);
          });
        } else if (key === "tripDates") {
          tripData.tripDates.forEach((item, index) => {
            formData.append(`tripDates[${index}][tripDate]`, item.tripDate);
            formData.append(`tripDates[${index}][tripSeats]`, item.tripSeats);
          });
        } else {
          tripData[key].forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        }
      } else {
        formData.append(key, tripData[key]);
      }
    });

    fetch(`https://elitetrips-backend.onrender.com/api/trip/state/${selectedState.id}/trip`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text || "Network response was not ok");
          });
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Trip submitted successfully!");
        // Reset the form data to initial state
        setTripData({
          tripName: "",
          tripPrice: "",
          tripOfferPrice: "",
          tripDates: [{ tripDate: "", tripSeats: "" }], // Resetting to initial state
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
          tripBackgroundImg: "",
          overView: "",
          tripBookingAmount: "",
          tripSeats: "",
          customised: false,
        });
        setSelectedState("");
        setUseGoogleDrive(false);
        setTripImagesUrls([""]);
        setTripBackgroundImgUrl("");
        setTripImagesPreview([]);
        setBackgroundImgPreview("");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error submitting trip", error);
        toast.error("Error submitting trip");
        setLoading(false);
      });
  };

  return (
    <div className="max-w-full p-6 bg-white shadow-lg justify-center flex flex-col mb-10 ">
      <h2 className="text-xl font-bold">Add Trip Details</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-l font-medium">Trip Location</label>
            <select
              name="tripLocation"
              value={tripData.tripLocation}
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
          <div>
            <label className="block text-l font-medium">Select State</label>
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
          <div>
            <label className="block text-l font-medium">Trip Name</label>
            <input
              type="text"
              name="tripName"
              value={tripData.tripName}
              onChange={(e) => {
                const filteredValue = e.target.value.replace(
                  /[^a-zA-Z\s/]/g,
                  ""
                );
                handleInputChange({
                  target: { name: e.target.name, value: filteredValue },
                });
              }}
              onKeyPress={(event) => {
                const charCode = event.which || event.keyCode;
                if (!/^[a-zA-Z\s-/]+$/.test(event.key)) {
                  event.preventDefault(); // Prevent invalid characters
                }
              }}
              className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
              required
            />
          </div>

          <div>
            <label className="block text-l font-medium">Trip Price</label>
            <input
              type="text"
              name="tripPrice"
              value={tripData.tripPrice}
              onChange={(e) => {
                // Remove any non-numeric characters
                const filteredValue = e.target.value.replace(/[^0-9]/g, "");
                handleInputChange({
                  target: { name: e.target.name, value: filteredValue },
                });
              }}
              onKeyPress={(event) => {
                // Allow only numeric characters
                const charCode = event.which || event.keyCode;
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
              required
            />
          </div>

          <div>
            <label className="block text-l font-medium">Trip Offer Price</label>
            <input
              type="text"
              name="tripOfferPrice"
              value={tripData.tripOfferPrice}
              onChange={(e) => {
                // Remove any non-numeric characters
                const filteredValue = e.target.value.replace(/[^0-9]/g, "");
                handleInputChange({
                  target: { name: e.target.name, value: filteredValue },
                });
              }}
              onKeyPress={(event) => {
                // Allow only numeric characters
                const charCode = event.which || event.keyCode;
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
              required
            />
          </div>

          <div className="flex flex-row justify-center items-center gap-2">
            <input
              type="checkbox"
              name="customised"
              value={tripData.customised}
              onChange={handleCustomisedChange}
              className="block border-gray-300 rounded-md border-2 p-1 "
            />
            <label className="block text-l font-medium">Customised</label>
          </div>
          <div>
            <label className="block text-l font-medium">
              Trip Booking Amount
            </label>
            <input
              type="text"
              name="tripBookingAmount"
              value={tripData.tripBookingAmount}
              onChange={(e) => {
                // Remove any non-numeric characters
                const filteredValue = e.target.value.replace(/[^0-9]/g, "");
                handleInputChange({
                  target: { name: e.target.name, value: filteredValue },
                });
              }}
              onKeyPress={(event) => {
                // Allow only numeric characters
                const charCode = event.which || event.keyCode;
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
              required
            />
          </div>
          <div>
            <label className="block text-l font-medium">Trip Dates</label>
            {tripData.tripDates.map((dateItem, index) => (
              <div key={index} className="flex items-center mb-2">
                {/* Date Input */}
                <input
                  type="date"
                  value={dateItem.tripDate}
                  onChange={(e) => {
                    const updatedDates = [...tripData.tripDates];
                    updatedDates[index].tripDate = e.target.value;
                    setTripData({ ...tripData, tripDates: updatedDates });
                  }}
                  className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mr-2"
                  required
                />

                {/* Dropdown for Trip Seats */}
                <select
                  value={dateItem.tripSeats}
                  onChange={(e) => {
                    const updatedDates = [...tripData.tripDates];
                    updatedDates[index].tripSeats = e.target.value;
                    setTripData({ ...tripData, tripDates: updatedDates });
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
                    const updatedDates = [...tripData.tripDates];
                    updatedDates.splice(index, 1); // Remove this date entry
                    setTripData({ ...tripData, tripDates: updatedDates });
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
                setTripData({
                  ...tripData,
                  tripDates: [
                    ...tripData.tripDates,
                    { tripDate: "", tripSeats: "" },
                  ],
                });
              }}
              className="mt-2 p-1 text-white bg-green-600 rounded"
            >
              Add Trip Date
            </button>
          </div>
          <div>
            <label className="block text-l font-medium">
              Trip OverView (Guwahati - Shillong - Cherrapunjee - Shnongpdeng -
              Shillong - Guwahati)
            </label>
            <input
              type="text"
              name="overView"
              value={tripData.overView}
              onChange={(e) => {
                // Allow only letters, spaces, hyphens, and slashes
                const filteredValue = e.target.value.replace(
                  /[^a-zA-Z\s\-\/]/g,
                  ""
                );
                handleInputChange({
                  target: { name: e.target.name, value: filteredValue },
                });
              }}
              className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
              required
            />
          </div>

          {/* <div>
            <label className="block text-l font-medium">Trip Dates</label>
            {tripData.tripDate.map((date, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => handleArrayChange(e, index, "tripDate")}
                  className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
                  required
                />
                <button
                  type="button"
                  onClick={() => addField("tripDate")}
                  className="ml-2 p-1 text-white bg-green-600 rounded"
                >
                  +
                </button>
              </div>
            ))}
          </div> */}
          <div>
            <label className="block text-l font-medium">
              Trip Duration (in days eg. 3D - 2N)
            </label>
            <input
              type="text"
              name="tripDuration"
              value={tripData.tripDuration}
              onChange={(e) => {
                // Allow only alphanumeric characters, spaces, hyphens, and slashes
                const filteredValue = e.target.value.replace(
                  /[^a-zA-Z0-9\s\-\/]/g,
                  ""
                );
                handleInputChange({
                  target: { name: e.target.name, value: filteredValue },
                });
              }}
              className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
              required
            />
          </div>

          <div>
            <label className="block text-l font-medium">Trip Inclusions</label>
            {tripData.tripInclusions.map((inclusion, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="text"
                  value={inclusion}
                  onChange={(e) => {
                    // Allow only letters, numbers, spaces, commas, slashes, and parentheses
                    const filteredValue = e.target.value.replace(
                      /[^a-zA-Z0-9\s,\/()]/g,
                      ""
                    );
                    handleArrayChange(
                      e,
                      index,
                      "tripInclusions",
                      filteredValue
                    );
                  }}
                  className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
                  required
                />
                <button
                  type="button"
                  onClick={() => addField("tripInclusions")}
                  className="ml-2 p-1 text-white bg-green-600 rounded"
                >
                  +
                </button>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-l font-medium">Trip Exclusions</label>
            {tripData.tripExclusions.map((exclusion, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="text"
                  value={exclusion}
                  onChange={(e) =>
                    handleArrayChange(e, index, "tripExclusions")
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
                  required
                />
                <button
                  type="button"
                  onClick={() => addField("tripExclusions")}
                  className="ml-2 p-1 text-white bg-green-600 rounded"
                >
                  +
                </button>
              </div>
            ))}
          </div>
          <div>
            <label className="block text-l font-medium">Trip Itinerary</label>
            {tripData.tripItinerary.map((item, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleItineraryChange(e, index, "title")}
                  placeholder="Itinerary Title"
                  className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
                  required
                />
                {item.points.map((point, pointIndex) => (
                  <input
                    key={pointIndex}
                    type="text"
                    value={point}
                    onChange={(e) =>
                      handleItineraryChange(e, index, "point", pointIndex)
                    }
                    placeholder="Point"
                    className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
                    required
                  />
                ))}
                <button
                  type="button"
                  onClick={() => addItineraryPoint(index)}
                  className="ml-2 p-1 text-white bg-green-600 rounded"
                >
                  Add Point
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addItineraryField}
              className="mt-2 p-1 text-white bg-green-600 rounded"
            >
              Add Itinerary
            </button>
          </div>
          <div>
            <label className="block text-l font-medium">Trip Description</label>
            {tripData.tripDescription.map((inclusion, index) => (
              <div key={index} className="flex items-center">
                <textarea
                  name="tripDescription"
                  value={tripData.tripDescription}
                  onChange={(e) =>
                    handleArrayChange(e, index, "tripDescription")
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
                  required
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-l font-medium">Sharing Options</label>
            {tripData.sharing.map((share, index) => (
              <div key={index}>
                <select
                  name="title"
                  value={share.title}
                  placeholder="Sharing Type"
                  className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
                  onChange={(e) => handleSharingChange(e, index, "title")}
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
          <div>
            <label className="block text-l font-medium">
              Pick and Drop (eg. Guwahati - Guwahati)
            </label>
            <input
              type="text"
              name="pickAndDrop"
              className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
              value={tripData.pickAndDrop}
              onChange={(e) => {
                // Allow only letters, spaces, /, and -
                const filteredValue = e.target.value.replace(
                  /[^a-zA-Z\s/-]/g,
                  ""
                );
                handleInputChange({
                  target: { name: e.target.name, value: filteredValue },
                });
              }}
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer mb-2">
              <input
                type="checkbox"
                checked={useGoogleDrive}
                onChange={(e) => {
                  setUseGoogleDrive(e.target.checked);
                  if (!e.target.checked) {
                    setTripImagesUrls([""]);
                    setTripBackgroundImgUrl("");
                    setTripImagesPreview([]);
                    setBackgroundImgPreview("");
                  }
                }}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Use Google Drive URLs for Images</span>
            </label>
          </div>

          <div>
            <label className="block text-l font-medium">
              Trip Images (i.e. Card Image)
            </label>
            {useGoogleDrive ? (
              <div className="space-y-2">
                {tripImagesUrls.map((url, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      className="flex-grow border-gray-300 rounded-md border-2 p-1"
                      placeholder="Paste Google Drive share link"
                      value={url}
                      onChange={(e) => {
                        const newUrls = [...tripImagesUrls];
                        newUrls[index] = e.target.value;
                        setTripImagesUrls(newUrls);
                        // Update preview
                        const newPreviews = [...tripImagesPreview];
                        newPreviews[index] = convertGoogleDriveUrl(e.target.value);
                        setTripImagesPreview(newPreviews);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setTripImagesUrls([...tripImagesUrls, ""]);
                      }}
                      className="p-1 text-white bg-green-600 rounded"
                    >
                      +
                    </button>
                  </div>
                ))}
                <p className="text-xs text-gray-500">
                  Example: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
                </p>
                {tripImagesPreview.filter(p => p).length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tripImagesPreview.filter(p => p).map((preview, index) => (
                      <img
                        key={index}
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-24 h-24 object-cover rounded border"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
                required={!useGoogleDrive}
              />
            )}
          </div>
          <div>
            <label className="block text-l font-medium">
              Package Image ( i.e. Background Image )
            </label>
            {useGoogleDrive ? (
              <div className="space-y-2">
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md border-2 p-1"
                  placeholder="Paste Google Drive share link"
                  value={tripBackgroundImgUrl}
                  onChange={(e) => {
                    setTripBackgroundImgUrl(e.target.value);
                    setBackgroundImgPreview(convertGoogleDriveUrl(e.target.value));
                  }}
                />
                {backgroundImgPreview && (
                  <img
                    src={backgroundImgPreview}
                    alt="Background Preview"
                    className="w-32 h-24 object-cover rounded border mt-2"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
              </div>
            ) : (
              <input
                type="file"
                onChange={handlePackageChange}
                className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
                required={!useGoogleDrive}
              />
            )}
          </div>
          <div>
            <label className="block text-l font-medium">
              Upload PDF (i.e. Itinerary) - Optional<br />
              <span className="text-gray-500 text-sm">Note: PDF size max 60mb</span>
            </label>
            <input
              type="file"
              multiple
              onChange={handlePdfChange}
              className="mt-1 block w-full border-gray-300 rounded-md border-2 p-1 mb-2"
            />
            {tripData.pdf.map((pdf, index) => (
              <div key={index} className="flex items-center mb-2">
                <span className="mr-2">{pdf.file.name}</span>
                <select
                  value={pdf.status}
                  onChange={(e) => {
                    const updatedPdfs = [...tripData.pdf];
                    updatedPdfs[index].status = e.target.value;
                    setTripData({ ...tripData, pdf: updatedPdfs });
                  }}
                  className="border-gray-300 rounded-md border-2 p-1"
                >
                  <option value="active">Active</option>
                  <option value="non-active">Non-active</option>
                </select>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 bg-blue-600 text-white font-bold rounded ${loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
