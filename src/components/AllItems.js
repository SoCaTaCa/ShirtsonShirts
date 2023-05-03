import React from 'react';
import ProductCard from './ProductCard';

const AllItems = ({ filteredItems }) => {
    return (
        <ul>
            {
                filteredItems.map((item, index) => {
                    return <ProductCard item={item[0]} key={index} />
                })
            }
        </ul>
    )
}

export default AllItems;