import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ item }) => {
    return (
        <div key={item.id} className="item-card">
            <img src={item.imageURL} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Size: {item.size}</p>
            <p>${item.price.toFixed(2)}</p>
            <Link to={`/products/${item.id}`}>See Details</Link>
        </div>
    )
}

export default ProductCard;