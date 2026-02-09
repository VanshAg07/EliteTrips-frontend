// SearchModal.js
import React from "react";
import SearchBar from "./Search/SearchBar";
import "./SearchModal.css";

const SearchModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay ">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button">
          &times;
        </button>
        <h2 className="text-lg font-semibold">Search</h2>
        <div className="-ml-3">
        <SearchBar /> {/* Render SearchBar within the modal */}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
