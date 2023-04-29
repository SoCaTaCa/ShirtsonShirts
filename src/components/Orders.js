import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = (props) => {
    const [orders, setOrders] = useState([]);

    const getOrders = async() => {
        try {
            const response = await axios.get(`/api/carts/${userID}/previous`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.userToken}`
                }
            });
            setOrders(response.data);
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
        </>
    )
}

export default Orders;