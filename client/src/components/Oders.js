import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Alert } from 'react-bootstrap';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/login');

        const res = await axios.get('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setOrders(res.data);
      } catch (err) {
        setError('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2>Your Orders</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered>
        <thead>
          <tr>
            <th>Restaurant</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.restaurant.name}</td>
              <td>
                {order.items.map((item, index) => (
                  <div key={index}>{item.name} x{item.quantity}</div>
                ))}
              </td>
              <td>${order.total}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;