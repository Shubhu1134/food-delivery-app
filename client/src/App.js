import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import Restaurants from './components/Restaurants';
import Menu from './components/Menu';
import orders from './components/orders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:id" element={<Menu />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/" element={<Restaurants />} />
      </Routes>
    </Router>
  );
}

export default App;