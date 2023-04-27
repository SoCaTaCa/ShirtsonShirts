import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleCartItem from './SingleCartItem';

const Cart = (props) => {

    // Update route in index.js so that userToken is also being passed down

    const [cart, setCart] = useState({});

    const getCart =  async () =>{
        const userID = props.userID;
        try {
            const response = await axios.get(`/api/carts/${userID}/current`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.userToken}`
                }
            });
            setCart(response.data.cart);
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
            {
                (Object.keys(cart).length) ?
                    cart.items.map((item, idx) => {
                        return <SingleCartItem item={item} key={idx} />
                    }) :
                    null
            }
        </>
    )
}

export default Cart;