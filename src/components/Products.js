import React, { useEffect, useState } from 'react';
import AllItems from './AllItems';
import Search from './Search';
import SelectCategory from './SelectCategory';
import { Link } from 'react-router-dom';
import NewCategoryForm from './NewCategoryForm'

const Products = ({ items, setItems, getItems, categories, user, userToken }) => {
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setFilteredItems(items);
    }, [items]);

    return (
        <div>
            {
                (user.isAdmin) ?
                    <>
                    <div className='card mb-3'>
                        <div className='card-body'>
                            <h5 className='card-title'>Admin Tools</h5>
                            <NewCategoryForm userToken={userToken}/>
                            <Link to="/products/new"><button className='btn btn-primary'>Add new Product</button></Link>
                        </div>
                    </div>
                    </> :
                    null
            }
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} items={items} setFilteredItems={setFilteredItems} />
            <SelectCategory setItems={setItems} getItems={getItems} categories={categories} setSearchTerm={setSearchTerm} />
            <AllItems filteredItems={filteredItems} />
        </div>
    )
}

export default Products;

