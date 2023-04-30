import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ItemDetails = ({ userToken }) => {
  const { itemId } = useParams();
  const [item, setItem] = useState([]);
  const [quantity, setQuantity] = useState("");

  const getItem = async () => {
    try {
      const response = await axios.get(`/api/items/${itemId}`);
      setItem(response.data.item);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getItem();
  }, []);

  const addToCart = async (event) => {
    event.preventDefault();
    try {
      console.log(userToken);
      const response = await axios.post(
        `/api/cartItems/`,
        {
          itemId: itemId,
          quantity: quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onChange = (event) => {
    if (event.target.name === "quantity-name") {
      setQuantity(event.target.value);
    }
  };

  return (
    <>
      <ul>
        <div>
          <li>{item.imageUrl}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.size}</li>
          <li>{item.description}</li>
          <div className="form-floating mb-3" id="quantity-input">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              onChange={onChange}
              placeholder="1"
              name="quantity-name"
              value={quantity}
            />

            <label htmlFor="floatingInput">Quantity</label>
          </div>
          <button
            type="add to cart"
            className="btn btn-primary"
            id="add to cart button"
            onClick={addToCart}
          >
            Add To Cart
          </button>
        </div>
      </ul>
    </>
  );
};

export default ItemDetails;
