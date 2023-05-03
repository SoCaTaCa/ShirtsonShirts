import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleCartItem from "./SingleCartItem";

const Cart = (props) => {
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);

  const calcTotal = () => {
    if (cart.items) {
      setTotal(
        cart.items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
      );
    }
  };

  const getCart = async () => {
    try {
      if (props.user.id) {
        const response = await axios.get(
          `/api/carts/${props.user.id}/current`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${props.userToken}`,
            },
          }
        );
        if (response.data.success) {
          setCart(response.data.cart);
        } else {
          setCart({});
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const checkout = async () => {
    try {
      const _cart = await axios.patch(
        `/api/carts/${cart.id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.userToken}`,
          },
        }
      );
      if (_cart.data.success) {
        getCart();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    calcTotal();
  }, [cart]);

  useEffect(() => {
    getCart();
  }, [props.user]);

  return (
    <>
      {Object.keys(cart).length && cart.items.length ? (
        <>
          <h5>Total: ${total}</h5>
          <button className="btn btn-primary" onClick={checkout}>
            Checkout
          </button>
          {Object.keys(cart).length
            ? cart.items.map((item) => {
                return (
                  <SingleCartItem
                    item={item}
                    userToken={props.userToken}
                    getCart={getCart}
                    calcTotal={calcTotal}
                    key={item.cartItemId}
                  />
                );
              })
            : null}
        </>
      ) : (
        <>
          <h5>Your cart is empty. Go buy some shirts!</h5>
        </>
      )}
    </>
  );
};

export default Cart;
