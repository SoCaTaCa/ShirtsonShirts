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

const App = () => {
    const [userID, setUserID] = useState('');
    const [userToken, setUserToken] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem('token'));

    return (
      <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserToken={setUserToken}/>
        <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserID={setUserID} setUserToken={setUserToken}/>}></Route>
                <Route path='/register' element={<Register setUserToken={setUserToken} setIsLoggedIn={setIsLoggedIn} setUserID={setUserID}/>}></Route>
                <Route path='/products' element={<Products />}></Route>
                <Route path='/cart' element={<Cart userID={userID}/>}></Route>
                <Route path="/items/:itemId" element={<ItemDetails userToken={userToken} />}></Route>
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