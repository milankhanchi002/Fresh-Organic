import React from 'react';
import { FaLeaf, FaHeart, FaAward, FaUsers, FaTruck, FaShieldAlt } from 'react-icons/fa';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>About Fresh&Organic</h1>
          <p>Bringing farm-fresh quality to your doorstep since 2022</p>
        </div>
      </div>

      <div className="container">
        <section className="story-section">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              Founded in 2022, Fresh&Organic began as a small family dairy farm in the heart of Haryana, Panipat. 
              What started with just 10 cows has now grown into one of the most trusted names in dairy products, 
              serving thousands of families across India.
            </p>
            <p>
              Our commitment to quality, purity, and tradition has remained unchanged over the years. 
              We believe that every family deserves access to fresh, pure dairy products that are free from 
              artificial preservatives and harmful chemicals.
            </p>
          </div>
          <div className="story-image">
            <img src="https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Our Dairy Farm" />
          </div>
        </section>

        <section className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <FaLeaf className="value-icon" />
              <h3>Pure & Natural</h3>
              <p>We never compromise on the purity of our products. Every item is sourced from our own farms and processed without artificial additives.</p>
            </div>
            <div className="value-card">
              <FaHeart className="value-icon" />
              <h3>Family First</h3>
              <p>We treat every customer like family, ensuring that what we serve to our loved ones is what we offer to yours.</p>
            </div>
            <div className="value-card">
              <FaAward className="value-icon" />
              <h3>Quality Assured</h3>
              <p>Our products undergo rigorous quality checks and are certified by leading food safety authorities.</p>
            </div>
            <div className="value-card">
              <FaUsers className="value-icon" />
              <h3>Community Focus</h3>
              <p>We support local farmers and contribute to the growth of our rural communities through sustainable practices.</p>
            </div>
            <div className="value-card">
              <FaTruck className="value-icon" />
              <h3>Fast Delivery</h3>
              <p>We ensure that fresh products reach your doorstep within hours of processing, maintaining their nutritional value.</p>
            </div>
            <div className="value-card">
              <FaShieldAlt className="value-icon" />
              <h3>Trust & Transparency</h3>
              <p>We believe in complete transparency about our processes, ingredients, and sourcing methods.</p>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>3</h3>
              <p>Years of Excellence</p>
            </div>
            <div className="stat-item">
              <h3>10,000+</h3>
              <p>Happy Families</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Products Delivered Daily</p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>Quality Assured</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs; 