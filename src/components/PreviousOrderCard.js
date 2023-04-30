import React, { useState, useEffect } from "react";

const PreviousOrderCard = ({ order }) => {
    const [total, setTotal] = useState(0);

    const calcTotal = () => {
        if (order.items) {
            setTotal(order.items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0));
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
        </div >
    )

};

export default PreviousOrderCard;