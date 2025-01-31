import React, { useState } from 'react';

function Filter({ onFilter, onSearch }) {
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilter = () => {
    onFilter(category);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={handleFilter}>Filter</button>
      <input
        type="text"
        placeholder="Search by Title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Filter;