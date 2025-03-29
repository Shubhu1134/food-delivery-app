import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/restaurants')
      .then(res => setRestaurants(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Row>
      {restaurants.map(restaurant => (
        <Col md={4} key={restaurant._id}>
          <Card className="mb-4">
            <Card.Img variant="top" src={restaurant.image} />
            <Card.Body>
              <Card.Title>{restaurant.name}</Card.Title>
              <Link to={`/restaurants/${restaurant._id}`}>
                <Button variant="primary">View Menu</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Restaurants;