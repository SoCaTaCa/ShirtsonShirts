import React, { useState } from 'react';

const Search = ({ searchTerm, setSearchTerm, items, setFilteredItems }) => {
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const filteredItems = items.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
        setFilteredItems(filteredItems);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearch}
            />
        </div>
    )
}

export default Search;
