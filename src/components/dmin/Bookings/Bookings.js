import React, { useEffect, useState } from "react";

function Bookings() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/payments/getAllTickets"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTickets(data); // Set the tickets in state
      } catch (error) {
        setError(error.message); // Handle any errors
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return <div className="text-center text-lg mt-10">Loading...</div>; // Display loading state
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg mt-10">
        Error: {error}
      </div>
    ); // Display error if any
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Your Bookings</h2>
      {tickets.length === 0 ? (
        <p className="text-center">No bookings available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-4 border-b">State Name</th>
                <th className="py-2 px-4 border-b">Package Title</th>
                <th className="py-2 px-4 border-b">Booking Date</th>
                <th className="py-2 px-4 border-b">Phone Number</th>
                <th className="py-2 px-4 border-b">Total Price</th>
                <th className="py-2 px-4 border-b">Sharing Type</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Razorpay Order ID</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-center">{ticket.stateName}</td>
                  <td className="py-2 px-4 border-b text-center">{ticket.packageTitle}</td>
                  <td className="py-2 px-4 border-b text-center">
                    {new Date(ticket.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b text-center">{ticket.customerPhone}</td>
                  <td className="py-2 px-4 border-b text-center">${ticket.totalPrice}</td>
                  <td className="py-2 px-4 border-b text-center">{ticket.sharingType}</td>
                  <td className="py-2 px-4 border-b text-center">{ticket.status}</td>
                  <td className="py-2 px-4 border-b text-center">
                    {ticket.razorpayOrderId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Bookings;
