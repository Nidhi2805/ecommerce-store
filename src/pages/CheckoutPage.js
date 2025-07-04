import { useState, useContext, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import './CheckoutPage.css';

const stripePromise = loadStripe('your_publishable_key_here');

const CheckoutForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const stripe = useStripe();
  const elements = useElements();
  const { cart, cartTotal, clearCart } = useContext(CartContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: { clientSecret } } = await axios.post('http://localhost:5000/create-payment-intent', {
        amount: cartTotal * 100, 
        currency: 'usd',
        items: cart.map(item => ({
          id: item.id,
          quantity: item.quantity
        }))
      });

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name,
            email,
            address: {
              line1: address,
              city,
              postal_code: postalCode,
              country
            }
          }
        }
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        await axios.post('http://localhost:5000/orders', {
          customer: { name, email, address, city, postalCode, country },
          items: cart,
          total: cartTotal,
          paymentId: paymentIntent.id,
          status: 'completed'
        });

        setSuccess(true);
        clearCart();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="checkout-success">
        <h2>Payment Successful!</h2>
        <p>Thank you for your purchase. Your order has been placed successfully.</p>
        <a href="/" className="continue-shopping">Continue Shopping</a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Shipping Information</h2>
      <div className="form-group">
        <label>Full Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label>Address</label>
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          required 
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>City</label>
          <input 
            type="text" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Postal Code</label>
          <input 
            type="text" 
            value={postalCode} 
            onChange={(e) => setPostalCode(e.target.value)} 
            required 
          />
        </div>
      </div>
      <div className="form-group">
        <label>Country</label>
        <input 
          type="text" 
          value={country} 
          onChange={(e) => setCountry(e.target.value)} 
          required 
        />
      </div>

      <h2>Payment Information</h2>
      <div className="card-element">
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }} />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Total: ${cartTotal.toFixed(2)}</p>
      </div>

      <button 
        type="submit" 
        disabled={!stripe || loading}
        className="pay-button"
      >
        {loading ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
      </button>
    </form>
  );
};

const CheckoutPage = () => {
  const { cart } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <a href="/" className="continue-shopping">Continue Shopping</a>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default CheckoutPage;