import React from 'react';
import ProductCard from './ProductCard';

const AllItems = ({ filteredItems }) => {
    return (
        <ul>
            {
                filteredItems.map((item) => {
                    return <ProductCard item={item} key={item.id} />
                })
            }
        </ul>
    )
}

export default AllItems;