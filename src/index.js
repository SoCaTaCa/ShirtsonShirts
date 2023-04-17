import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home.js';

const App = () => {
    return (
        <>
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