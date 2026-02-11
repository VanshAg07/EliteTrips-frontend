import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [tripData, setTripData] = useState([]);
  const navigate = useNavigate();

  const fetchSearch = () => {
    fetch("https://elitetrips-backend.onrender.com/api/home/search", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTripData(data.tripData);
        // Collect all trip names and state names for suggestions
        const allSuggestions = data.tripData.flatMap((item) => [
          ...item.tripNames,
          item.stateName,
        ]);
        setSuggestions(allSuggestions);
      })
      .catch((error) => console.error("Error fetching search data:", error));
  };

  useEffect(() => {
    fetchSearch();
  }, []);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearch(query);
    if (query.length > 0) {
      const filteredSuggestions = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      fetchSearch(); // Re-fetch all suggestions if the input is empty
    }
  };

  const handleSuggestionClick = (selectedSuggestion) => {
    const selectedTrip = tripData.find(
      (item) =>
        item.tripNames.includes(selectedSuggestion) ||
        item.stateName.toLowerCase() === selectedSuggestion.toLowerCase()
    );

    if (selectedTrip) {
      const { stateName, source } = selectedTrip;
      let path = "";

      if (source === "National") {
        // If the suggestion matches the stateName, navigate to /place/:stateName
        path =
          selectedSuggestion.toLowerCase() === stateName.toLowerCase()
            ? `/place/${stateName}`
            : `/trip/${selectedSuggestion}/${stateName}`;
      } else if (source === "International") {
        path =
          selectedSuggestion.toLowerCase() === stateName.toLowerCase()
            ? `/places/${stateName}`
            : `/trips/${selectedSuggestion}/${stateName}`;
      } else if (source === "Honeymoon") {
        path =
          selectedSuggestion.toLowerCase() === stateName.toLowerCase()
            ? `/honeymoon-packages/${stateName}`
            : `/honeymoon/${selectedSuggestion}/${stateName}`;
      }
      navigate(path);
    }

    setSearch(selectedSuggestion);
    setSuggestions([]);
  };

  return (
    <div className="relative flex items-center w-[200px] md:w-[220px] lg:w-[250px] xl:w-[280px]">
      <input
        type="text"
        value={search}
        onChange={handleInputChange}
        placeholder="Search Places."
        className="pl-6 pr-2 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 w-full transition-all duration-200 text-black"
      />
      <FaSearch className="absolute right-5 text-gray-800 z-10" />
      {search && suggestions.length > 0 ? (
        <ul className="absolute top-full mt-2 w-full bg-white text-black border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
          {suggestions.slice(0, 5).map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-[#a6d5f9]"
              onClick={() => handleSuggestionClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        search && (
          <div className="absolute top-full mt-2 w-full bg-white text-black border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto px-4 py-2">
            No results match your search
          </div>
        )
      )}
    </div>
  );
}

export default SearchBar;
