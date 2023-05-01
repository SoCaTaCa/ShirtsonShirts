import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PreviousOrderCard from './PreviousOrderCard';

const Orders = (props) => {
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        try {
            if (props.user.id) {
                const response = await axios.get(`/api/carts/${props.user.id}/previous`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${props.userToken}`
                    }
                });
                setOrders(response.data.carts);
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getOrders();
    }, [props.user])

    return (
        <>
            {
                orders.length ?
                    orders.map(order => {
                        return <PreviousOrderCard order={order} key={order.id} />
                    }) :
                    <h5>You do not have any previous orders! Get to shopping!</h5>
            }
        </>
    )
}

export default Orders;