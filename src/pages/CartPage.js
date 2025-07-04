import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    clearCart 
  } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <Link to="/" className="continue-shopping">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p>${item.price.toFixed(2)}</p>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button 
                onClick={() => removeFromCart(item.id)} 
                className="remove-item"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="cart-actions">
          <button onClick={clearCart} className="clear-cart">Clear Cart</button>
          <Link to="/checkout" className="checkout-button">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;