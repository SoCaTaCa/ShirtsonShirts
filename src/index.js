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
    const [user, setUser] = useState({});
    const [userToken, setUserToken] = useState(window.localStorage.getItem('token'));
    const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem('token'));
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);

    const getUserData = async () => {
        if (userToken) {
            try {
                const response = await axios.get(`/api/users/me`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`
                    }
                });
                setUser(response.data.user);
            } catch (error) {
                console.error(error);
            };
        } else {
            setUser({});
        };
    };

    const getItems = async () => {
        try {
            const response = await axios.get('/api/items');
            setItems(await groupItems(response.data.items));
        } catch (err) {
            console.error(err)
        }
    }

    const groupItems = async (items) => {
        const names = [];
        const groupedItems = [];
        items.map((item) => {
            if (!names.includes(item.name)) {
                names.push(item.name);
            };
        });
        for (let i = 0; i < names.length; i++) {
            const response = await axios.get(`/api/items/name/${names[i]}`);
            if (response.data.success) {
                groupedItems.push(response.data.items);
            };
        };
        return groupedItems;
    };

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
    }, []);

    useEffect(() => {
        getUserData();
    }, [userToken])

    return (
      <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserToken={setUserToken}/>
        <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserToken={setUserToken}/>}></Route>
                <Route path='/register' element={<Register setUserToken={setUserToken} setIsLoggedIn={setIsLoggedIn} />}></Route>
                <Route path='/products' element={<Products items={items} setItems={setItems} getItems={getItems} groupItems={groupItems} categories={categories} user={user} userToken={userToken}/>}></Route>
                <Route path='/cart' element={<Cart userToken={userToken} user={user}/>}></Route>
                <Route path="/products/:itemname" element={<ItemDetails userToken={userToken} user={user} />}></Route>
                <Route path='/products/new' element={<NewItemForm userToken={userToken} categories={categories} getCategories={getCategories} user={user} />}></Route>
                <Route path='/products/edit/:itemId' element={<EditItemForm userToken={userToken} categories={categories} getCategories={getCategories} user={user} />}></Route>
                <Route path='/previousorders' element={<Orders userToken={userToken} user={user}/>}></Route>
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