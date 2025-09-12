import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import HomePage from './Components/HomePage.jsx';
import Login from './Components/Login.jsx';
import Registration from './Components/Registration.jsx';
import ServicePage from './Components/ServicePage.jsx';
import Shop from './Components/Shop.jsx';
import Profile from './Components/Profile.jsx';
import Products from './Components/Products.jsx';
import Cart from './Components/Cart.jsx'; 

import reportWebVitals from './reportWebVitals.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<Products />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();