import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ item }) => {
    const name = item.name.split(' ').join('%20')
    return (
        <div className="item-card">
            <img src={item.imageURL} alt={item.name} />
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)}</p>
            <Link to={`/products/${name}`}>See Details</Link>
        </div>
    )
}

export default ProductCard;