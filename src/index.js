import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home.js';
import Header from './components/Header.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Products from './components/Products.js';
import Cart from './components/Cart.js';
import ItemDetails from './components/ItemDetails.js';
import NewItemForm from './components/NewItemForm.js';
import EditItemForm from './components/EditItemForm.js';
import Orders from './components/Orders.js';

const App = () => {
    const [userID, setUserID] = useState('');
    const [userToken, setUserToken] = useState(window.localStorage.getItem('token'));
    const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem('token'));
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);

    const getItems = async () => {
        try {
            const response = await axios.get('/api/items');
            setItems(response.data.items);
        } catch (err) {
            console.error(err)
        }
    }

    const getCategories = async () => {
        try {
            const categories = await axios.get('/api/categories');
            if (categories.data.success) {
                setCategories(categories.data.categories);
            };
        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => {
        getItems();
        getCategories();
    }, [])

    return (
      <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserToken={setUserToken}/>
        <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserID={setUserID} setUserToken={setUserToken}/>}></Route>
                <Route path='/register' element={<Register setUserToken={setUserToken} setIsLoggedIn={setIsLoggedIn} setUserID={setUserID}/>}></Route>
                <Route path='/products' element={<Products items={items} setItems={setItems} getItems={getItems} categories={categories}/>}></Route>
                <Route path='/cart' element={<Cart userToken={userToken} userID={userID}/>}></Route>
                <Route path="/products/:itemId" element={<ItemDetails userToken={userToken} />}></Route>
                <Route path='/products/new' element={<NewItemForm userToken={userToken} categories={categories} getCategories={getCategories}/>}></Route>
                <Route path='/products/edit/:itemId' element={<EditItemForm userToken={userToken} categories={categories} getCategories={getCategories}/>}></Route>
                <Route path='/previousorders' element={<Orders userToken={userToken} userID={userID}/>}></Route>
        </Routes>
      </>
    )
}

const root = createRoot(document.getElementById('root'));

root.render(
    <HashRouter>
        <App/>
    </HashRouter>
)