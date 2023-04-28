import React from "react";
import axios from "axios";

const SingleCartItem = ({ item }) => {
    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={item.imageURL} className="img-fluid rounded-start" alt="Product Image" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{item.name} </h5>
                        <p className="card-text">Size: {item.size}</p>
                        <p className="card-text">Quantity: {item.quantity}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCartItem;