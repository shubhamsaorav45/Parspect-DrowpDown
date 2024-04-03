import React, { useState } from "react";
import Select from "react-select";

const SearchableDropdown = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [keyboardUsed, setKeyboardUsed] = useState(false);

  const handleSearch = (inputValue) => {
    const filteredResults = user.filter((user) =>
      Object.values(user).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(inputValue.toLowerCase())
      )
    );

    setSearchTerm(inputValue);
    setSearchResults(filteredResults);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < searchResults.length - 1 ? prevIndex + 1 : prevIndex
      );
      setKeyboardUsed(true);
    } else if (event.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
      setKeyboardUsed(true);
    }
  };

  const handleMouseEnter = (index) => {
    if (!keyboardUsed) {
      setHighlightedIndex(index);
    }
  };

  const getHighlightedLabel = (option) => {
    const labelParts = option.label.split("\n");
    return (
      <div>
        <div>
          <span style={{ fontWeight: "bold", color: "black" }}>
            {labelParts[0]}
          </span>
        </div>
        <div>{labelParts[1]}</div>
        <div>
          <span style={{ fontStyle: "italic" }}>{labelParts[2]}</span>
        </div>
        <div>{labelParts[3]}</div>
        <div>{labelParts[4]}</div>
      </div>
    );
  };

  return (
    <div className="App">
      <Select
        options={searchResults.map((userData) => ({
          value: userData.id,
          label: `${userData.id}\n${userData.name}\n${userData.items}\n${userData.address},${userData.pincode}`,
        }))}
        isClearable
        onInputChange={handleSearch}
        onKeyDown={handleKeyDown}
        placeholder="Search name, UserId, PinCode..."
        formatOptionLabel={getHighlightedLabel}
      />

      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map((user, index) => (
            <div
              key={user.id}
              className={`search-item ${
                index === highlightedIndex ? "highlighted" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
            ></div>
          ))
        ) : (
          <div className="empty-card">No results found</div>
        )}
      </div>
    </div>
  );
};

export default SearchableDropdown;
