import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import "./Popup2.css";

const Popup2 = ({ onClose }) => {
  const [popupData, setPopupData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    number: "",
    interestedPlaces: "",
  });

  const fetchPopup = async () => {
    try {
      const res = await fetch(
        "http://localhost:5001/api/popup/assist-user"
      );
      const data = await res.json();
      setPopupData(data[0]);
    } catch (error) {
      console.error("Error fetching popup data:", error);
    }
  };

  useEffect(() => {
    fetchPopup();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" }); // Clear errors for the field as the user types
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.name.trim()) errors.name = "Name is required";
    if (!formValues.email.trim()) errors.email = "Email is required";
    if (!formValues.number.trim()) errors.number = "Phone number is required";
    if (!formValues.interestedPlaces.trim())
      errors.interestedPlaces = "Interested places are required";

    return errors;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true); // Set loading state to true

    try {
      const res = await axios.post(
        "http://localhost:5001/api/popup/assist-form",
        formValues
      );
      console.log("Form submitted successfully:", res);

      // Clear the form values after submission
      setFormValues({
        name: "",
        email: "",
        number: "",
        interestedPlaces: "",
      });

      setLoading(false); // Set loading state to false
      onClose(); // Close the popup
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false); // Ensure loading state is reset even on error
    }
  };

  if (!popupData || !popupData.status) {
    return null;
  }

  return (
    <div className="fixed popup-wr inset-0 flex md:mt-0 -mt-11 items-center justify-center bg-[#ffffff7f] bg-opacity-70 z-50 p-4">
      <div className="bg-white mt-10 rounded-lg md:h-[420px] h-[460px] shadow-lg relative flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-colors duration-200 z-10"
        >
          <AiOutlineClose className="h-6 w-6 text-gray-600" />
        </button>

        {/* Left side - Image */}
        <div className="md:w-1/2 md:h-[420px] h-[220px]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${popupData?.image[0] || ""})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        {/* Right side - Content */}
        <div className="md:w-1/2 md:h-[420px] h-[300px] md:p-6 p-4 flex flex-col">
          <h2 className="md:text-2xl text-xl font-bold md:mb-6 mb-2 text-cyan-600">
            {popupData?.title || "Loading..."}
          </h2>

          <form
            onSubmit={submitForm}
            className="flex flex-col md:space-y-4 space-y-2 md:pt-10 pt-2"
          >
            {["name", "email", "number", "interestedPlaces"].map((field) => (
              <div key={field}>
                <input
                  type={field === "number" ? "number" : "text"}
                  name={field}
                  placeholder={
                    field === "interestedPlaces"
                      ? "Interested Places"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  value={formValues[field]}
                  onChange={handleChange}
                  className={`px-4 py-2 text-sm border w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    formErrors[field]
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-600"
                  }`}
                  required
                />
                {formErrors[field] && (
                  <p className="text-sm text-red-500">{formErrors[field]}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              className={`mt-4 px-6 py-3 text-white rounded-lg transition duration-300 shadow-md ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-cyan-500 hover:bg-cyan-600"
              }`}
              disabled={loading} // Disable button when loading
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Popup2;
