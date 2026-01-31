import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageSlider.css';

const ImageSlider = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShopClick = (cta) => {
    switch (cta) {
      case 'Shop Dairy':
        scrollToSection('products');
        break;
      case 'Shop Oils':
        scrollToSection('products');
        break;
      case 'Shop Ghee':
        scrollToSection('products');
        break;
      case 'Shop Organic':
        scrollToSection('products');
        break;
      default:
        scrollToSection('products');
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    fade: true,
    cssEase: 'ease-in-out',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
          autoplaySpeed: 3000
        }
      }
    ]
  };

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Fresh Dairy Products',
      subtitle: 'Pure and Natural from Farm to Table',
      cta: 'Shop Dairy'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Premium Cooking Oils',
      subtitle: 'Healthy Cooking Starts Here',
      cta: 'Shop Oils'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Pure Ghee',
      subtitle: 'Traditional Taste, Modern Quality',
      cta: 'Shop Ghee'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Organic Products',
      subtitle: 'Certified Organic for Your Health',
      cta: 'Shop Organic'
    }
  ];

  return (
    <div className="image-slider-container">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="slide">
            <div className="slide-image">
              <img src={slide.image} alt={slide.title} />
              <div className="slide-overlay">
                <div className="slide-content">
                  <h2 className="slide-title">{slide.title}</h2>
                  <p className="slide-subtitle">{slide.subtitle}</p>
                  <button 
                    className="slide-cta" 
                    onClick={() => handleShopClick(slide.cta)}
                  >
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider; 