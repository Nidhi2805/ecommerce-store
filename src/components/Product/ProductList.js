import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = ({ products }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-list-item">
          <Link to={`/product/${product.id}`} className="product-list-image">
            <img src={product.image} alt={product.title} />
          </Link>
          <div className="product-list-details">
            <Link to={`/product/${product.id}`}>
              <h3>{product.title}</h3>
            </Link>
            <p className="category">{product.category}</p>
            <p className="description">{product.description.substring(0, 100)}...</p>
            <div className="product-list-footer">
              <span className="price">${product.price.toFixed(2)}</span>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;