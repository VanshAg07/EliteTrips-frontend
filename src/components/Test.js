import React, { useEffect, useState } from "react";
import axios from "axios";
// import Card from "./Card";

const Test = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get("https://elitetrips-backend.onrender.com/api/admin/getTrip");
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="cards-container-1">
      {trips.map((trip, index) => (
        <h>
          key={index}
          tripName={trip.tripName}
          tripDuration={trip.tripDuration}
          tripLocation={trip.tripLocation}
          tripImage={trip.tripImages[0]} // Assuming tripImages is an array of URLs
          </h>
      ))}
    </div>
  );
};

export default Test;
