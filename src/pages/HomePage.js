import { useContext } from 'react';
import ProductGrid from '../components/Product/ProductGrid';
import ProductList from '../components/Product/ProductList';
import { ProductsContext } from '../context/ProductsContext';
import './HomePage.css';

const HomePage = () => {
  const { products, loading, viewMode } = useContext(ProductsContext);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="home-page">
      {viewMode === 'grid' ? (
        <ProductGrid products={products} />
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default HomePage;