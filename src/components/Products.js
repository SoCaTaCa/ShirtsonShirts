import React, { useEffect, useState } from 'react';
import AllItems from './AllItems';
import Search from './Search';
import SelectCategory from './SelectCategory';
import { Link } from 'react-router-dom';
import NewCategoryForm from './NewCategoryForm'

const Products = ({ items, setItems, getItems, groupItems, categories, user, userToken }) => {
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setFilteredItems(items);
    }, [items]);

    return (
        <div>
            <h1 className='text-center'>Shirts!</h1>
            <div className='d-flex justify-content-evenly'>
                <div className='d-flex product-page-tool'>
                    <SelectCategory setItems={setItems} getItems={getItems} groupItems={groupItems} categories={categories} setSearchTerm={setSearchTerm} />
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} items={items} setFilteredItems={setFilteredItems} />
                </div>
                {
                    (user.isAdmin) ?
                        <>
                            <div className='product-page-tool'>
                                <NewCategoryForm userToken={userToken} />
                            </div>
                            <div className='product-page-tool'>
                                <Link to="/products/new"><button className='btn btn-primary'>Add new Product</button></Link>
                            </div>
                        </> :
                        null
                }
            </div>
            <AllItems filteredItems={filteredItems} />
        </div>
    )
}

export default Products;

