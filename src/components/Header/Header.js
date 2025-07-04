import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductsContext';
import { CartContext } from '../../context/CartContext';
import { FaShoppingCart, FaSearch, FaTh, FaList } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const { searchTerm, setSearchTerm, viewMode, setViewMode } = useContext(ProductsContext);
  const { cartCount } = useContext(CartContext);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">ShopEasy</Link>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>
        
        <div className="header-actions">
          <div className="view-toggle">
            <button 
              onClick={() => setViewMode('grid')} 
              className={viewMode === 'grid' ? 'active' : ''}
            >
              <FaTh />
            </button>
            <button 
              onClick={() => setViewMode('list')} 
              className={viewMode === 'list' ? 'active' : ''}
            >
              <FaList />
            </button>
          </div>
          
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;