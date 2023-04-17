import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home.js';
import Header from './components/Header.js';

const App = () => {
    return (
        <>
        <Header/>
            <Routes>
                <Route path='/' element={<Home />}></Route>
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