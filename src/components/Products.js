import React from 'react';
import AllItems from './AllItems';

const Products = () => {
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

    const renderItems = () => {
        return items.map(item => (
            <div key={item.id} className="item-card">
                <img src={item.imageUrl} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>${item.price.toFixed(2)}</p>
                <button>Add to Cart</button>
            </div>
        ));
    };

    return (
        <div className="items-container">
            {renderItems()}
        </div>
    )
}

export default Products;
