import React, { useState, useEffect } from "react";
import axios from "axios";

function AssistForm() {
  const [assistForms, setAssistForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch assist form data from the backend
  useEffect(() => {
    const fetchAssistForms = async () => {
      try {
        const response = await axios.get(
          "https://elitetrips-backend.onrender.com/api/popup/assist-form"
        );
        setAssistForms(response.data);
      } catch (error) {
        setError("Error fetching assist forms.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssistForms();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Assist Forms</h2>

      {/* Show loading spinner while data is being fetched */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
        </div>
      )}

      {/* Show error message if there's an error */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          <p>{error}</p>
        </div>
      )}

      {/* Display Assist Form Data */}
      {!loading && !error && assistForms.length > 0 && (
        <div className="space-y-6">
          {assistForms.slice().reverse().map((form, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {form.name}
              </h3>
              <p className="text-gray-600 mt-2">{form.number}</p>
              <p className="text-gray-600 mt-2">{form.places}</p>
            </div>
          ))}
        </div>
      )}

      {/* Display message if no assist forms are available */}
      {!loading && !error && assistForms.length === 0 && (
        <div className="text-gray-700">
          <p>No assist forms available at the moment.</p>
        </div>
      )}
    </div>
  );
}

export default AssistForm;
