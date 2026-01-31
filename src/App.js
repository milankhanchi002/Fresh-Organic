import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ImageSlider from './components/ImageSlider';
import ProductsGrid from './components/ProductsGrid';
import TopDeals from './components/TopDeals';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Team from './components/Team';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const HomePage = () => (
    <>
      <div id="home">
        <ImageSlider />
      </div>
      <div id="about">
        <AboutUs />
      </div>
      <div id="products">
        <ProductsGrid addToCart={addToCart} />
      </div>
      <div id="team">
        <Team />
      </div>
      <div id="deals">
        <TopDeals addToCart={addToCart} />
      </div>
      <div id="contact">
        <ContactUs />
      </div>
    </>
  );

  return (
    <Router>
      <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
        <Header 
          cartItems={cartItems} 
          setCartItems={setCartItems}
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
        />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
