import React, { useState, useRef } from 'react';

const SearchBox = ({ onSearch }) => {
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef(null);

  const handleSearchClick = () => {
    setIsActive(!isActive);
    if (!isActive) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  const handleCancelClick = () => {
    setIsActive(false);
    onSearch('');
    inputRef.current.value = '';
  };

  return (
    <div className={`search-box ${isActive ? 'active' : ''}`}>
      <input
        ref={inputRef}
        type="text"
        placeholder="הקלד לחיפוש..."
        className={isActive ? 'active' : ''}
        onChange={handleInputChange}
      />
      <div className={`search-icon ${isActive ? 'active' : ''}`} onClick={handleSearchClick}>
        <i className="fas fa-search"></i>
      </div>
      <div className={`cancel-icon ${isActive ? 'active' : ''}`} onClick={handleCancelClick}>
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
};

export default SearchBox;