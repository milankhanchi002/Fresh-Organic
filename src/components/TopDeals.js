import React from 'react';
import { FaShoppingCart, FaStar, FaFire } from 'react-icons/fa';
import './TopDeals.css';

const TopDeals = ({ addToCart }) => {
  const deals = [
    {
      id: 7,
      name: "Organic Milk Bundle",
      price: 120.00,
      originalPrice: 180.00,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.9,
      category: "Bundle",
      description: "3L Organic Milk + 500g Curd",
      isHot: true
    },
    {
      id: 8,
      name: "Premium Ghee Combo",
      price: 350.00,
      originalPrice: 450.00,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.8,
      category: "Combo",
      description: "1L Buffalo Ghee + 500ml Cow Ghee",
      isHot: true
    },
    {
      id: 9,
      name: "Cooking Oil Pack",
      price: 280.00,
      originalPrice: 380.00,
      image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.7,
      category: "Pack",
      description: "Mustard Oil + Coconut Oil + Sesame Oil",
      isHot: false
    },
    {
      id: 10,
      name: "Dairy Fresh Pack",
      price: 200.00,
      originalPrice: 280.00,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.8,
      category: "Pack",
      description: "Milk + Curd + Paneer + Butter",
      isHot: true
    },
    {
      id: 11,
      name: "Organic Oil Trio",
      price: 320.00,
      originalPrice: 420.00,
      image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.9,
      category: "Trio",
      description: "Olive Oil + Coconut Oil + Mustard Oil",
      isHot: false
    },
    {
      id: 12,
      name: "Family Dairy Pack",
      price: 450.00,
      originalPrice: 600.00,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.9,
      category: "Family",
      description: "Complete dairy products for family",
      isHot: true
    }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <section className="top-deals-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Top Deals</h2>
          <p className="section-subtitle">Special Offers & Combo Packs</p>
        </div>
        
        <div className="deals-grid">
          {deals.map((deal) => (
            <div key={deal.id} className="deal-card">
              <div className="deal-image">
                <img src={deal.image} alt={deal.name} />
                <div className="deal-overlay">
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(deal)}
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                </div>
                <div className="deal-badge">
                  {deal.category}
                </div>
                {deal.isHot && (
                  <div className="hot-badge">
                    <FaFire /> HOT
                  </div>
                )}
              </div>
              
              <div className="deal-info">
                <h3 className="deal-name">{deal.name}</h3>
                <p className="deal-description">{deal.description}</p>
                
                <div className="deal-rating">
                  <FaStar className="star-icon" />
                  <span>{deal.rating}</span>
                </div>
                
                <div className="deal-price">
                  <span className="current-price">₹{deal.price}</span>
                  <span className="original-price">₹{deal.originalPrice}</span>
                  <span className="discount">
                    {Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)}% OFF
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

export default TopDeals; 