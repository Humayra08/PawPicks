import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from './Components/HomePage.jsx';
import Login from './Components/Login.jsx';
import Registration from './Components/Registration.jsx'; // ✅ new
import ServicePage from './Components/ServicePage.jsx';
import reportWebVitals from './reportWebVitals.js';
import Shop from './Components/Shop.jsx';
import Profile from './Components/Profile.jsx'; // New Import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} /> {/* ✅ */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/profile" element={<Profile />} /> {/* New Route */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
