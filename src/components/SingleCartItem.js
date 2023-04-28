import React, { useState } from "react";
import axios from "axios";

const SingleCartItem = ({ item, userToken }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    const updateQuantity = async (event) => {
        event.preventDefault();
        if (item.quantity !== quantity) {
            try {
                const updatedItem = await axios.patch(`/api/cartItems/${item.cartItemId}`, { quantity }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`
                    }
                });
            } catch (error) {
                console.error(error);
            };
        };
    };

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
                        <form onSubmit={updateQuantity}>
                            <div className='mb-3'>
                                <label htmlFor='cart-item-quantity' className='form-label card-text'>Quantity</label>
                                <input
                                    type="number"
                                    className='form-control'
                                    id='cart-item-quantity'
                                    value={quantity}
                                    onChange={(event) => setQuantity(event.target.value)}>
                                </input>
                            </div>
                            <button
                                className="btn btn-primary"
                                disabled={
                                    quantity === item.quantity ?
                                        true :
                                        false
                                }>Update Quantity</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCartItem;