import React, { useState } from 'react';

const Search = ({ searchTerm, setSearchTerm, items, setFilteredItems }) => {
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const filteredItems = items.filter(item => item[0].name.toLowerCase().includes(value.toLowerCase()));
        setFilteredItems(filteredItems);
    };

    return (
        <div>
            <input
                className="form-control"
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearch}
            />
        </div>
    )
}

export default Search;
