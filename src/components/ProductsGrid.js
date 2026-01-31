import React, { useState } from 'react';
import { FaShoppingCart, FaStar, FaCheck } from 'react-icons/fa';
import './ProductsGrid.css';

const ProductsGrid = ({ addToCart }) => {
  const [addedItems, setAddedItems] = useState({});

  const products = [
    {
      id: 1,
      name: "Fresh Cow Milk (1 lt)",
      price: 45.00,
      originalPrice: 55.00,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.8,
      category: "Dairy",
      description: "Pure and fresh cow milk, rich in nutrients"
    },
    {
      id: 101,
      name: "Fresh Cow Milk (500 ml)",
      price: 25.00,
      originalPrice: 30.00,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.7,
      category: "Dairy",
      description: "Pure and fresh cow milk, half litre pack"
    },
    {
      id: 2,
      name: "Buffalo Ghee (1 lt)",
      price: 1700.00,
      originalPrice: 1900.00,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.9,
      category: "Ghee",
      description: "Traditional buffalo ghee, pure and aromatic"
    },
    {
      id: 102,
      name: "Buffalo Ghee (500 ml)",
      price: 900.00,
      originalPrice: 1000.00,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.8,
      category: "Ghee",
      description: "Traditional buffalo ghee, half litre pack"
    },
    {
      id: 3,
      name: "Mustard Oil (1 lt)",
      price: 120.00,
      originalPrice: 150.00,
      image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.7,
      category: "Oil",
      description: "Pure mustard oil for authentic taste"
    },
    {
      id: 103,
      name: "Mustard Oil (500 ml)",
      price: 65.00,
      originalPrice: 80.00,
      image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.6,
      category: "Oil",
      description: "Pure mustard oil, half litre pack"
    },
    {
      id: 5,
      name: "Coconut Oil (1 lt)",
      price: 95.00,
      originalPrice: 120.00,
      image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.8,
      category: "Oil",
      description: "Virgin coconut oil for healthy cooking"
    },
    {
      id: 104,
      name: "Coconut Oil (500 ml)",
      price: 55.00,
      originalPrice: 70.00,
      image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.7,
      category: "Oil",
      description: "Virgin coconut oil, half litre pack"
    },
    {
      id: 6,
      name: "Paneer (1 kg)",
      price: 350.00,
      originalPrice: 400.00,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.7,
      category: "Dairy",
      description: "Fresh homemade paneer, soft and creamy"
    },
    {
      id: 105,
      name: "Paneer (500 gm)",
      price: 190.00,
      originalPrice: 220.00,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.6,
      category: "Dairy",
      description: "Fresh homemade paneer, half kg pack"
    }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    
    // Show success feedback
    setAddedItems(prev => ({
      ...prev,
      [product.id]: true
    }));

    // Reset feedback after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => ({
        ...prev,
        [product.id]: false
      }));
    }, 2000);
  };

  return (
    <section className="products-section">
      <div className="container">
        <h2 className="section-title">Our Products</h2>
        <p className="section-subtitle">Fresh and Pure Dairy Products, Ghee & Cooking Oils</p>
        
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-overlay">
                  <button 
                    className={`add-to-cart-btn ${addedItems[product.id] ? 'added' : ''}`}
                    onClick={() => handleAddToCart(product)}
                    disabled={addedItems[product.id]}
                  >
                    {addedItems[product.id] ? (
                      <>
                        <FaCheck /> Added to Cart
                      </>
                    ) : (
                      <>
                        <FaShoppingCart /> Add to Cart
                      </>
                    )}
                  </button>
                </div>
                <div className="product-badge">
                  {product.category}
                </div>
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-rating">
                  <FaStar className="star-icon" />
                  <span>{product.rating}</span>
                </div>
                
                <div className="product-price">
                  <span className="current-price">₹{product.price}</span>
                  <span className="original-price">₹{product.originalPrice}</span>
                  <span className="discount">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid; 