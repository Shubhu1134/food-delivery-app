import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your_stripe_public_key');

const CheckoutForm = ({ total, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      }
    );

    if (stripeError) {
      setError(stripeError.message);
    } else if (paymentIntent.status === 'succeeded') {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div className="text-danger mt-2">{error}</div>}
      <button className="btn btn-primary mt-3" disabled={!stripe}>
        Pay ${total}
      </button>
    </form>
  );
};

const Payment = ({ location }) => {
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const createPaymentIntent = async () => {
      const res = await axios.post('http://localhost:5000/api/payment/create-payment-intent', {
        total: location.state.total
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setClientSecret(res.data.clientSecret);
    };
    createPaymentIntent();
  }, []);

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2>Payment</h2>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            total={location.state.total}
            onSuccess={() => navigate('/orders')}
          />
        </Elements>
      )}
    </div>
  );
};

export default Payment;