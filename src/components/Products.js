import React, { useState } from 'react';
import AllItems from './AllItems';
import Search from './Search';

const Products = () => {
    const [filteredItems, setFilteredItems] = useState([]);
    const items = [
        {
            id: 1,
            name: 'Product 1',
            price: 10.00,
            description: 'This is the first product',
            imageUrl: 'https://via.placeholder.com/150'
        },
        {
            id: 2,
            name: 'Product 2',
            price: 15.00,
            description: 'This is the second product',
            imageUrl: 'https://via.placeholder.com/150'
        },
        {
            id: 3,
            name: 'Product 3',
            price: 20.00,
            description: 'This is the third product',
            imageUrl: 'https://via.placeholder.com/150'
        }
    ];

    return (
        <div>
            <Search items={items} setFilteredItems={setFilteredItems} />
            {filteredItems.length > 0 ? filteredItems.map(item => (
                <div key={item.id} className="item-card">
                    <img src={item.imageUrl} alt={item.name} />
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>${item.price.toFixed(2)}</p>
                    <button>Add to Cart</button>
                </div>
            )) : (
                <AllItems />
            )}
        </div>
    )
}

export default Products;

