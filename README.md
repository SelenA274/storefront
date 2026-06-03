# VELO Beauty Storefront

## Overview

VELO Beauty Storefront is a modern e-commerce web application designed to provide customers with a seamless online shopping experience. The platform allows users to browse beauty products, manage their shopping cart, place orders, and maintain personal accounts through a responsive and user-friendly interface.

This application serves as the customer-facing component of the VELO Beauty E-Commerce Platform.

---

## Features

### Customer Authentication
- User Registration
- User Login
- Logout
- Password Recovery
- Password Reset

### Product Catalog
- Browse Products
- View Product Details
- Product Variants
- Ratings and Reviews
- Category Navigation

### Shopping Experience
- Add Products to Cart
- Update Cart Items
- Remove Products
- Checkout Process
- Order History

### User Profile
- Manage Personal Information
- Manage Shipping Addresses
- View Previous Orders

### Real-Time Updates
- Live Stock Monitoring
- Product Availability Updates

---

## Technologies Used

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

### State Management
- Redux Toolkit
- React Redux

### API Communication
- Axios

### Real-Time Communication
- Socket.IO Client

### Additional Libraries
- GSAP
- Embla Carousel
- Lucide React
- React Toastify

---

## Project Structure

```text
src/
├── app/
├── features/
│   ├── auth/
│   ├── products/
│   ├── cart/
│   ├── orders/
│   └── profile/
├── shared/
├── hooks/
├── lib/
└── store/
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/SelenA274/storefront.git
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=your_backend_url
NEXT_PUBLIC_SITE_URL=your_website_url
```

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## System Architecture

```text
Customer
   ↓
Storefront (Next.js)
   ↓
Backend API
   ↓
MongoDB Atlas
```

---

## Future Enhancements

- Wishlist Functionality
- Product Recommendations
- Advanced Search and Filtering
- Multi-language Support
- Online Payment Integration
- Improved Analytics

---

## Related Repositories

- Backend API: https://github.com/SelenA274/ecommerce-backend
- CRM Dashboard: https://github.com/SelenA274/crm

---

## Author

Selen amasha
Software Engineer Student
