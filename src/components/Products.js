import React, { useEffect, useState } from 'react';
import AllItems from './AllItems';
import Search from './Search';
import SelectCategory from './SelectCategory';

const Products = ({ items, setItems, getItems, categories}) => {
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setFilteredItems(items);
    }, [items]);

    return (
        <div>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} items={items} setFilteredItems={setFilteredItems} />
            <SelectCategory setItems={setItems} getItems={getItems} categories={categories} setSearchTerm={setSearchTerm} />
            <AllItems filteredItems={filteredItems} />
        </div>
    )
}

export default Products;

