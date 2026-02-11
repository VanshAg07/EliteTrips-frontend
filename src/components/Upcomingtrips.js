import React, { useState, useEffect } from "react";
import { FaClock, FaCalendarAlt, FaMapMarkerAlt, FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const TripCard = ({ trip }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short" }; // Short month format
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options); // Format the date
  };

  const displayTripName =
    trip.tripName.length > 20
      ? `${trip.tripName.slice(0, 18)}...`
      : trip.tripName;

  const firstDate = trip.allTripDates[0];

  // Handle trip click for navigation
  const handleTripClick = () => {
    const sanitizedTripName = trip.tripName.replace(/\//g, "-"); // Replace slashes with hyphens
    navigate(`/trip/${encodeURIComponent(sanitizedTripName)}/${encodeURIComponent(trip.stateName)}`);
  };

  return (
    <div className="bg-white h-[60vh] shadow-md shadow-black rounded-lg overflow-hidden mb-4" onClick={handleTripClick}>
      <img
        src={
          trip.tripImages.length > 0 ? trip.tripImages[0] : "defaultImage.jpg"
        }
        alt="Trip"
        className="w-[100vw] h-[300px] object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl uppercase font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
            {displayTripName}
          </h3>
        </div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-1" />
            <p className="text-sm text-black">{trip.stateName}</p>
          </div>
          <div className="flex items-center">
            <FaClock className="mr-1" />
            <p className="text-sm text-black">{trip.tripDuration}</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaCalendarAlt className="mr-1" />
          <p className="text-sm text-black mr-2">{formatDate(firstDate)}</p>
          <p className="text-sm text-red-500 text-end">
            +{trip.allTripDatesCount} batches
          </p>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [upcomingTrips, setUpcomingTrips] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(""); // State to track selected month
  const [startIndex, setStartIndex] = useState(0);

  // Fetch upcoming trips from the server
  const fetchUpcomingTrips = async () => {
    try {
      const response = await fetch(
        "https://elitetrips-backend.onrender.com/api/home/upcoming"
      );
      const data = await response.json();
      setUpcomingTrips(data.upcomingTrips);
      if (Object.keys(data.upcomingTrips).length > 0) {
        setSelectedMonth(Object.keys(data.upcomingTrips)[0]); // Set default selected month
      }
    } catch (error) {
      console.error("Error fetching upcoming trips:", error);
    }
  };

  useEffect(() => {
    fetchUpcomingTrips();
  }, []);

  // Get trips for the selected month
  const tripsForSelectedMonth = upcomingTrips[selectedMonth] || [];
  const allTrips = tripsForSelectedMonth;

  const [isVisible, setIsVisible] = useState(true);
  const tripsToShow = window.innerWidth < 1024 ? 3 : 4; // Show 3 on small screens, 4 on larger

  // Check the window size
  const checkWindowSize = () => {
    if (window.innerWidth < 768) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  // Event listener for window resize
  useEffect(() => {
    window.addEventListener("resize", checkWindowSize);
    checkWindowSize(); // Check on mount

    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  // Handle next trips
  const nextTrips = () => {
    if (startIndex + tripsToShow < allTrips.length) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Handle previous trips
  const prevTrips = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Handle month selection
  const handleMonthClick = (month) => {
    setSelectedMonth(month);
    setStartIndex(0); // Reset start index when month changes
  };

  const shouldShowArrows = allTrips.length > tripsToShow; // Show arrows if there are more trips than can be shown
  const shouldShowDots = allTrips.length > tripsToShow; // Show dots if there are more trips than can be shown

  // Calculate the number of dots dynamically
  const totalDots = Math.ceil(allTrips.length / tripsToShow); // Total groups of trips

  return (
    <div className="min-h-screen p-2 flex justify-center">
      <div className="w-[90vw]">
        <h1 className="text-3xl pl-12 font-bold mb-6">Upcoming Trips</h1>
        <div className="flex pl-10 mb-6 w-full justify-between">
          <div className="flex flex-row w-[70%] justify-between">
            {/* Month buttons */}
            {Object.keys(upcomingTrips).map((month) => (
              <button
                key={month}
                className="p-1 w-24 h-10 flex justify-center items-center text-center bg-white border border-black rounded-xl"
                onClick={() => handleMonthClick(month)} // Update month on click
              >
                {month}
              </button>
            ))}
          </div>
        </div>

        {/* Slider container */}
        <div className="flex items-center justify-between mb-6">
          {shouldShowArrows && ( // Render arrows conditionally
            <button
              onClick={prevTrips}
              className={`p-2 ${startIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={startIndex === 0}
            >
              <FaChevronCircleLeft size={30} />
            </button>
          )}

          {/* Displaying the trips */}
          <div className="flex-grow flex justify-center">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6">
              {allTrips
                .slice(startIndex, startIndex + tripsToShow)
                .map((trip, index) => (
                  <TripCard key={index} trip={trip} />
                ))}
            </div>
          </div>

          {shouldShowArrows && ( // Render arrows conditionally
            <button
              onClick={nextTrips}
              className={`p-2 ${startIndex + tripsToShow >= allTrips.length
                  ? "opacity-50 cursor-not-allowed"
                  : ""
                }`}
              disabled={startIndex + tripsToShow >= allTrips.length}
            >
              <FaChevronCircleRight size={30} />
            </button>
          )}
        </div>
        {shouldShowDots && (
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {Array.from({ length: totalDots }).map((_, dotIndex) => (
                <div
                  key={dotIndex}
                  onClick={() => setStartIndex(dotIndex)} // Navigate directly to the selected trip
                  className={`w-2 h-2 cursor-pointer rounded-full ${startIndex === dotIndex ? "bg-black" : "bg-gray-300"
                    }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;