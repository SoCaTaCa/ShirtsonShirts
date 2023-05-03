import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ item }) => {
    const name = item.name.split(' ').join('%20');
    const navigate = useNavigate();
    
    return (
        <div className='card align-items-center product-card'>
            <a className='nav-link' href={`/#/products/${item.name.split(' ').join('%20')}`}>
                <h5 className="card-title mt-3">{item.name}</h5>
            </a>
            <div className='product-image-container d-flex align-items-center justify-content-center'>
                <img className="product-display-image" src={item.imageURL} alt={item.name} />
            </div>
            <div className='card-body'>
                <p className='card-text text-center'>${item.price.toFixed(2)}</p>
                <button className='btn btn-primary' onClick={() => navigate(`/products/${name}`)}>Details</button>
            </div>
        </div>
    )
}

export default ProductCard;