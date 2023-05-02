import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const PreviousOrderCard = ({ item, userToken, purchaseTime }) => {
    const navigate = useNavigate();

    const orderAgain = async () => {
        try {
            if (item) {
                await axios.post("/api/cartItems", {
                    itemId: item.itemId,
                    quantity: item.quantity
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`
                    }
                })
            };
            navigate("/cart");
        } catch (error) {
            console.error(error);
        };

    };

    return (
        <div className="card mb-3 previous-order-card">
            <div className="previous-order-details row g-0 d-flex align-items-center">
                <div className="col-md-2 d-flex justify-content-center">
                    <button className="btn btn-outline-secondary" onClick={() => navigate(`/products/${item.itemId}`)}>
                        <img
                            className="product-thumbnail"
                            src={item.imageURL}
                            alt={item.name}
                        />
                    </button>
                </div>
                <div className="col-md-7">
                    <div className="card-body">
                        <a className='nav-link' href={`/#/products/${item.itemId}`}>
                            <h5 className="card-title">{item.name}</h5>
                        </a>
                        <p className="card-text">Size: {item.size}</p>
                        <p className="card-text">Quantity: {item.quantity}</p>
                        <p className="card-text">Total: ${item.price * item.quantity}</p>
                    </div>
                </div>
                <div className="col-md-3 d-flex flex-column align-items-center">
                    <p className="card-text">Purchased on: {new Date(Date.parse(purchaseTime)).toString().split(' ').slice(0, 5).join(' ')}</p>
                    <button className="btn btn-success" onClick={orderAgain}>Order Again</button>
                </div>
            </div>
        </div>
    )

};

export default PreviousOrderCard;