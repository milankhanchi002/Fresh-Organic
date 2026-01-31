import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Fresh&Organic</h3>
          <p className="footer-description">
            Your trusted source for pure and natural dairy products, ghee, and cooking oils. 
            We bring farm-fresh quality to your doorstep with our commitment to health and tradition.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link"><FaLinkedin /></a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="social-link"><FaWhatsapp /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#team">Our Team</a></li>
            <li><a href="#deals">Top Deals</a></li>
            <li><a href="#contact">Contact</a></li>
            {/* <li><Link to="/cart">Shopping Cart</Link></li> */}
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Our Products</h4>
          <ul className="footer-links">
            <li><a href="#dairy">Dairy Products</a></li>
            <li><a href="#ghee">Pure Ghee</a></li>
            <li><a href="#oils">Cooking Oils</a></li>
            <li><a href="#organic">Organic Products</a></li>
            <li><a href="#bundles">Combo Packs</a></li>
            <li><a href="#fresh">Fresh Daily</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Contact Info</h4>
          <div className="contact-info">
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <div>
                <p>123 Dairy Farm Road</p>
                <p>Haryana, Panipat</p>
              </div>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <div>
                <p>9551292000</p>
                <p>9551292000</p>
              </div>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <div>
                <p>info@dairyfresh.com</p>
                <p>support@dairyfresh.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2024 Fresh&Organic. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#shipping">Shipping Info</a>
            <a href="#returns">Returns Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 