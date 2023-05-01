import React, { useEffect, useState } from 'react';
import AllItems from './AllItems';
import Search from './Search';
import SelectCategory from './SelectCategory';
import { Link } from 'react-router-dom';

const Products = ({ items, setItems, getItems, categories, user}) => {
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setFilteredItems(items);
    }, [items]);

    return (
        <div>
            {
                (user.isAdmin) ?
                    <Link to="/products/new"><button className='btn btn-primary'>Add new Product</button></Link> :
                    null
            }
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} items={items} setFilteredItems={setFilteredItems} />
            <SelectCategory setItems={setItems} getItems={getItems} categories={categories} setSearchTerm={setSearchTerm} />
            <AllItems filteredItems={filteredItems} />
        </div>
    )
}

export default Products;

