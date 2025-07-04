import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductsProvider } from './context/ProductsContext';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import './App.css';

function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;