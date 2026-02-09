import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi";
import Modal from "react-modal";

function NavOfferComponent() {
  const [navOffers, setNavOffers] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("inactive");
  const [editingOffer, setEditingOffer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchNavOffers();
  }, []);

  // Fetch all navigation offers
  const fetchNavOffers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5001/api/home/nav-offer"
      );
      setNavOffers(response.data.navOffer || []);
    } catch (error) {
      console.error("Error fetching navigation offers:", error);
      toast.error("Failed to fetch navigation offers");
    }
    setLoading(false);
  };

  // Add or update a navigation offer
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingOffer) {
        // Update offer
        await axios.put(
          `http://localhost:5001/api/home/nav-offer/${editingOffer._id}`,
          { title, status }
        );
        toast.success("Navigation offer updated successfully");
      } else {
        // Add new offer
        await axios.post("http://localhost:5001/api/home/nav-offer", {
          title,
          status,
        });
        toast.success("Navigation offer added successfully");
      }
      setTitle("");
      setStatus("inactive");
      setEditingOffer(null);
      fetchNavOffers(); // Refresh the list
    } catch (error) {
      console.error("Error saving navigation offer:", error);
      toast.error("Failed to save navigation offer");
    }
    setLoading(false);
  };

  // Edit a navigation offer
  const handleEdit = (offer) => {
    setEditingOffer(offer);
    setTitle(offer.title);
    setStatus(offer.status);
  };

  // Open delete confirmation modal
  const openModal = (id) => {
    setDeletingId(id);
    setModalIsOpen(true);
  };

  // Close delete confirmation modal
  const closeModal = () => {
    setModalIsOpen(false);
    setDeletingId(null);
  };

  // Delete a navigation offer
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5001/api/home/nav-offer/${deletingId}`
      );
      toast.success("Navigation offer deleted successfully");
      fetchNavOffers(); // Refresh the list
    } catch (error) {
      console.error("Error deleting navigation offer:", error);
      toast.error("Failed to delete navigation offer");
    }
    closeModal();
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingOffer(null);
    setTitle("");
    setStatus("inactive");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center mb-6">Navigation Offers</h2>
      <h3 className="text-red-500 text-center">Note: Please upload one offer only</h3>
      {/* Form for adding/editing navigation offer */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
      >
        <h3 className="text-xl font-semibold mb-4">
          {editingOffer ? "Edit Offer" : "Add New Offer"}
        </h3>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-150"
            disabled={loading}
          >
            {loading ? (
              <BiLoaderAlt className="animate-spin" />
            ) : editingOffer ? (
              "Update Offer"
            ) : (
              "Add Offer"
            )}
          </button>
          {editingOffer && (
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-150"
              onClick={cancelEdit}
            >
              <MdCancel className="inline-block mr-2" /> Cancel
            </button>
          )}
        </div>
      </form>

      {/* Loading Spinner */}
      {loading && <p className="text-center text-gray-600">Loading...</p>}

      {/* Display list of navigation offers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {navOffers.map((offer) => (
          <div
            key={offer._id}
            className="border border-gray-300 p-4 rounded-lg shadow-md bg-gray-50 transition duration-200 hover:bg-gray-100"
          >
            <h3 className="font-bold text-lg mb-2">{offer.title}</h3>
            <p className="mb-2">
              Status:{" "}
              <span
                className={`font-semibold ${
                  offer.status === "active" ? "text-green-600" : "text-red-600"
                }`}
              >
                {offer.status}
              </span>
            </p>
            <div className="flex space-x-2">
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-150"
                onClick={() => handleEdit(offer)}
              >
                <AiFillEdit className="inline-block mr-1" /> Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-150"
                onClick={() => openModal(offer._id)}
              >
                <AiFillDelete className="inline-block mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {navOffers.length === 0 && !loading && (
        <p className="text-center">No navigation offers available.</p>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Confirmation"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h3 className="text-lg font-semibold">Confirm Delete</h3>
        <p>Are you sure you want to delete this offer?</p>
        <div className="flex space-x-4 mt-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-150"
            onClick={handleDelete}
          >
            Confirm
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-150"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default NavOfferComponent;
