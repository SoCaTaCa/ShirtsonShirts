import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PreviousOrderCard = ({ order, userToken }) => {
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();

    const calcTotal = () => {
        if (order.items) {
            setTotal(order.items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0));
        };
    };

    const orderAgain = async () => {
        try {
            if (order.items) {
                for (let i = 0; i < order.items.length; i++) {
                    const item = order.items[i];
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
            };
            navigate("/cart");
        } catch (error) {
            console.error(error);
        };

    };

    useEffect(() => {
        calcTotal();
    }, []);

    return (
        <div className="card">
            <h5 className="card-title">Purchased on: {new Date(Date.parse(order.purchaseTime)).toString()}</h5>
            <p className="card-text">Total: ${total}</p>
            <p className="card-text">Shirts:</p>
            <ul>
                {
                    order.items.map((item) => {
                        return <li key={item.cartItemId}>{item.quantity} {item.name} - {item.size}</li>
                    })
                }
            </ul>
            <button className="btn btn-success" onClick={orderAgain}>Add Order to Cart</button>
        </div >
    )

};

export default PreviousOrderCard;