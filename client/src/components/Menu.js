import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, ListGroup, Alert } from 'react-bootstrap';

const Menu = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/restaurants/${id}`)
      .then(res => setRestaurant(res.data))
      .catch(err => setError('Failed to load menu'));
  }, [id]);

  const addToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      const order = {
        restaurantId: id,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      };

      await axios.post('http://localhost:5000/api/orders', order, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate('/orders');
    } catch (err) {
      setError('Order failed');
    }
  };

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>{restaurant.name}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <Col md={8}>
          <h4>Menu</h4>
          {restaurant.menu.map((item, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>${item.price}</Card.Text>
                <Button onClick={() => addToCart(item)}>Add to Cart</Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col md={4}>
          <h4>Cart</h4>
          <ListGroup>
            {cart.map((item, index) => (
              <ListGroup.Item key={index}>
                {item.name} x{item.quantity} - ${item.price * item.quantity}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button className="mt-3" onClick={placeOrder} disabled={cart.length === 0}>
            Place Order (Total: ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)})
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Menu;