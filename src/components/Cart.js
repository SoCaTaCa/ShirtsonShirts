import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = (props) => {
    const [cart, setCart] = useState([]);

    async function getCart() {
        const userID = props.userID;

        try {
            const response = await axios.get(`/api/carts/${userID}/current`);
            setCart(response.data);
            console.log(response);

        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getCart();
    }, [])

    return (
        <>
            <h1>User Cart</h1>
        </>
    )
}

export default Cart;