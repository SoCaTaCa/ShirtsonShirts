import React, { useState, useEffect } from "react";
import axios from "axios";
import PreviousOrderCard from "./PreviousOrderCard";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      if (props.user.id) {
        const response = await axios.get(
          `/api/carts/${props.user.id}/previous`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${props.userToken}`,
            },
          }
        );
        setOrders(response.data.carts);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, [props.user]);

  return (
    <>
      <h1 className="oh-title">Order History</h1>
      {orders.length ? (
        orders.reverse().map((order) => {
          return order.items.map((item) => {
            return (
              <PreviousOrderCard
                item={item}
                userToken={props.userToken}
                purchaseTime={order.purchaseTime}
                key={item.cartItemId}
              />
            );
          });
        })
      ) : (
        <h5 className="no-previous-orders">
          You do not have any previous orders! Get to shopping!
        </h5>
      )}
    </>
  );
};

export default Orders;
