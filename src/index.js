import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from './Components/HomePage.jsx';
import Login from './Components/Login.jsx';
import Registration from './Components/Registration.jsx'; // ✅ new
import reportWebVitals from './reportWebVitals.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} /> {/* ✅ */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
