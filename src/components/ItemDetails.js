import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const ItemDetails = ({ userToken, user, isLoggedIn }) => {
  const { itemname } = useParams();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [quantity, setQuantity] = useState("");

  const getItems = async () => {
    try {
      const response = await axios.get(`/api/items/name/${itemname}`);
      setItems(response.data.items);
      setSelectedItem(response.data.items[0]);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getItems();
  }, []);

  const addToCart = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `/api/cartItems/`,
        {
          itemId: selectedItem.id,
          quantity: quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
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
      <ul classname="item-detail-list">

        <div className="item-detail-container">
          <h1>{selectedItem.name}</h1>
          <div className="item-detail-child">

            <div className="item-detail-image-container">
              <img className="item-detail-image" src={selectedItem.imageURL} alt={selectedItem.name} />
            </div>

            <div className="item-detail-description">
              <li>{selectedItem.price}$</li>
              <li>{selectedItem.description}</li>
            </div>

            <div className="item-detail-buttons">
              {
                isLoggedIn ?
                  <button
                    type="add-to-cart"
                    className="btn btn-primary"
                    id="add-to-cart-button"
                    onClick={addToCart}
                  >
                    Add To Cart
                  </button> :
                  null
              }
              {
                (user.isAdmin) ?
                  <Link to={`/products/edit/${selectedItem.id}`}><button className='btn btn-primary'>Edit Item</button></Link> :
                  null
              }
              <select
                className="form-select"
                aria-label="size-select"
                defaultValue={selectedItem.id}
                onChange={(event) => {
                  for (let i = 0; i < items.length; i++) {
                    if (items[i].id.toString() === event.target.value) {
                      setSelectedItem(items[i]);
                      break;
                    }
                  }
                }}>
                {
                  items.map((item) => {
                    return <option value={item.id} key={item.id}>{item.size}</option>
                  })
                }
              </select>
              {
                isLoggedIn ?
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
                  </div> :
                  null
              }
            </div>
          </div>
        </div>
      </ul>
    </>
  );
};

export default ItemDetails;
