import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './ProductGrid.css';

const ProductGrid = ({ products }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price.toFixed(2)}</p>
          </Link>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;