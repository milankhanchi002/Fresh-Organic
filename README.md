# DairyFresh E-Commerce Website

A modern, responsive React e-commerce website for dairy products, ghee, and cooking oils.

## Features

### 🏠 Header
- **Logo & Branding**: DairyFresh with tagline "Pure & Natural"
- **Navigation**: Home, About Us, Contact Us links
- **Cart Icon**: Shows item count with animated badge
- **Dark Mode Toggle**: Sun/Moon icon to switch themes

### 🖼️ Image Slider
- **Automatic Sliding**: 3-second intervals with pause on hover
- **4 Beautiful Slides**: Dairy products, cooking oils, ghee, organic products
- **Call-to-Action**: "Shop Now" buttons on each slide
- **Responsive Design**: Adapts to different screen sizes

### 🛍️ Products Grid (2x3 Layout)
- **6 Products**: Fresh milk, buffalo ghee, mustard oil, curd, coconut oil, paneer
- **Product Cards**: Image, name, description, rating, pricing
- **Add to Cart**: Hover overlay with shopping cart button
- **Price Display**: Current price, original price, discount percentage
- **Category Badges**: Dairy, Ghee, Oil categories

### 🔥 Top Deals Section
- **6 Special Offers**: Bundle packs and combo deals
- **Hot Badges**: Animated fire icons for trending deals
- **Same Grid Layout**: 2x3 responsive grid
- **Special Pricing**: Combo discounts and bundle savings

### 📞 Footer
- **Company Info**: DairyFresh description and social links
- **Quick Links**: Navigation and product categories
- **Contact Information**: Address, phone, email
- **Legal Links**: Privacy policy, terms, shipping info

## Technologies Used

- **React 18**: Modern React with hooks
- **React Icons**: Beautiful icon library
- **React Slick**: Image slider functionality
- **CSS3**: Modern styling with gradients and animations
- **Responsive Design**: Mobile-first approach

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd dairy-ecommerce
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm start
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation and cart
│   ├── Header.css
│   ├── ImageSlider.js     # Automatic image carousel
│   ├── ImageSlider.css
│   ├── ProductsGrid.js    # Main products display
│   ├── ProductsGrid.css
│   ├── TopDeals.js        # Special offers section
│   ├── TopDeals.css
│   ├── Footer.js          # Contact and links
│   └── Footer.css
├── App.js                 # Main application component
├── App.css               # Global styles
└── index.js              # Entry point
```

## Key Features

### 🎨 Modern Design
- Gradient backgrounds and modern color schemes
- Smooth animations and hover effects
- Professional typography and spacing

### 📱 Responsive Layout
- Mobile-first design approach
- Adaptive grid layouts (3→2→1 columns)
- Touch-friendly buttons and interactions

### 🌙 Dark Mode
- Toggle between light and dark themes
- Consistent styling across all components
- Smooth transitions between modes

### 🛒 Shopping Cart
- Add items to cart functionality
- Cart count badge with animation
- Product state management

### ⭐ Product Ratings
- Star ratings for all products
- Customer review system ready

### 🏷️ Price Display
- Current and original prices
- Discount percentage calculation
- Professional pricing layout

## Customization

### Adding Products
Edit the `products` array in `ProductsGrid.js`:
```javascript
const products = [
  {
    id: 1,
    name: "Product Name",
    price: 100.00,
    originalPrice: 120.00,
    image: "image-url",
    rating: 4.8,
    category: "Category",
    description: "Product description"
  }
];
```

### Modifying Slider Images
Edit the `slides` array in `ImageSlider.js`:
```javascript
const slides = [
  {
    id: 1,
    image: "image-url",
    title: "Slide Title",
    subtitle: "Slide Subtitle"
  }
];
```

### Changing Colors
Update CSS variables in component files:
- Primary: `#667eea` to `#764ba2`
- Accent: `#ffd700`
- Text: `#333` (light) / `#ffffff` (dark)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized images with proper sizing
- Lazy loading ready for large catalogs
- Smooth animations with CSS transforms
- Minimal JavaScript for fast loading

## Future Enhancements

- [ ] Shopping cart page
- [ ] Product detail pages
- [ ] User authentication
- [ ] Payment integration
- [ ] Search functionality
- [ ] Filter and sort options
- [ ] Wishlist feature
- [ ] Order tracking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

**DairyFresh** - Bringing farm-fresh quality to your doorstep! 🥛🧈🛢️
