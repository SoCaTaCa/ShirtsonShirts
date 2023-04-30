import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
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

    return (
      <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserToken={setUserToken}/>
        <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserID={setUserID} setUserToken={setUserToken}/>}></Route>
                <Route path='/register' element={<Register setUserToken={setUserToken} setIsLoggedIn={setIsLoggedIn} setUserID={setUserID}/>}></Route>
                <Route path='/products' element={<Products />}></Route>
                <Route path='/cart' element={<Cart userToken={userToken} userID={userID}/>}></Route>
                <Route path="/products/:itemId" element={<ItemDetails userToken={userToken} />}></Route>
                <Route path='/products/new' element={<NewItemForm userToken={userToken}/>}></Route>
                <Route path='/products/edit/:itemId' element={<EditItemForm userToken={userToken}/>}></Route>
                <Route path='/previousorders' elemtn={<Orders userToken={userToken} userID={userID}/>}></Route>
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