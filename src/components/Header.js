import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSun, FaMoon, FaSearch, FaUser } from 'react-icons/fa';
import Cart from './Cart';
import './Header.css';

const Header = ({ cartItems, setCartItems, isDarkMode, toggleDarkMode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      setSearchQuery('');
    }
  };

  const handleUserClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo-section">
            <Link to="/" className="logo">
              <span className="logo-text">Fresh&Organic</span>
              <span className="logo-subtitle">Pure & Natural</span>
            </Link>
          </div>

          <nav className="nav-menu">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About Us</a>
            <a href="#products" className="nav-link">Products</a>
            <a href="#deals" className="nav-link">Top Deals</a>
            <a href="#contact" className="nav-link">Contact Us</a>
          </nav>

          <div className="header-actions">
            <form onSubmit={handleSearch} className="search-container">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            
            <div className="user-menu-container">
              <button className="user-btn" onClick={handleUserClick}>
                <FaUser />
              </button>
              {isUserMenuOpen && (
                <div className="user-menu">
                  <Link to="/profile" className="user-menu-item">Profile</Link>
                  <Link to="/orders" className="user-menu-item">Orders</Link>
                  <Link to="/wishlist" className="user-menu-item">Wishlist</Link>
                  <button className="user-menu-item logout-btn">Logout</button>
                </div>
              )}
            </div>
            
            <button className="theme-toggle" onClick={toggleDarkMode}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            
            <div className="cart-container" onClick={() => setIsCartOpen(true)}>
              <FaShoppingCart className="cart-icon" />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <Cart 
        cartItems={cartItems}
        setCartItems={setCartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Header; 