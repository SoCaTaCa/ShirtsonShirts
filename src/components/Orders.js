import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PreviousOrderCard from './PreviousOrderCard';

const Orders = (props) => {
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        try {
            const response = await axios.get(`/api/carts/${props.userID}/previous`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.userToken}`
                }
            });
            setOrders(response.data.carts);
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getOrders();
    }, [])

    return (
        <>
            {
                orders.map(order => {
                    return <PreviousOrderCard order={order} key={order.id} />
                })
            }
        </>
    )
}

export default Orders;