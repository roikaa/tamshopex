# TamShopEx - Modern eCommerce Platform

![TamShopEx Logo](https://placeholder.com/logo)

## Overview

TamShopEx is a streamlined, modern eCommerce platform built with Next.js, TypeScript, and PostgreSQL. This project offers core online shopping functionality with a clean, responsive interface designed for quick deployment and scalability.

## Features

- **Product Browsing** - Browse products by category with an intuitive navigation system
- **Product Search** - Find products quickly with our responsive search functionality
- **Shopping Cart** - Add, modify, and remove items with cart persistence
- **Checkout Process** - Streamlined ordering with shipping information collection
- **Responsive Design** - Optimized for all devices from mobile to desktop

## Tech Stack

- **Frontend**: Next.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: React Context API
- **Styling**: CSS Modules / Tailwind CSS
- **Deployment**: Vercel

## Project Structure

```
tamshopex/
├── components/          # Reusable UI components
│   ├── cart/            # Cart-related components
│   ├── layout/          # Layout components (header, footer)
│   ├── product/         # Product display components
│   └── ui/              # Generic UI elements
├── pages/               # Next.js pages
│   ├── api/             # API routes
│   ├── category/        # Category pages
│   ├── checkout/        # Checkout flow pages
│   └── product/         # Product detail pages
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── styles/              # Global styles
├── lib/                 # Utility functions and helpers
├── contexts/            # React context providers
└── types/               # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tamshopex.git
   cd tamshopex
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:
   Create a `.env.local` file in the root directory:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/tamshopex"
   NEXT_PUBLIC_API_URL="http://localhost:3000/api"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Timeline

This project was developed in a 3-day sprint following this timeline:

### Day 1: Project Setup & Core Structure
- Initialize Next.js project with TypeScript
- Set up PostgreSQL database and Prisma
- Create basic data models
- Implement basic page routing

### Day 2: Product Management & Shopping Cart
- Build home page with product listings
- Implement category navigation
- Create product search functionality
- Develop shopping cart system

### Day 3: Checkout & Final Integration
- Build checkout form
- Connect all components
- Basic styling and responsiveness
- Testing and deployment

## Data Models

### Core Entities
- **Product**: id, name, description, price, imageUrl, categoryId
- **Category**: id, name
- **Cart**: id, items
- **Order**: id, customerDetails, items, total

## API Endpoints

| Endpoint                  | Method | Description                        |
|---------------------------|--------|------------------------------------|
| `/api/products`           | GET    | Get all products                   |
| `/api/products/:id`       | GET    | Get a specific product             |
| `/api/categories`         | GET    | Get all categories                 |
| `/api/search?q=query`     | GET    | Search products                    |
| `/api/cart`               | GET    | Get cart items                     |
| `/api/cart`               | POST   | Add item to cart                   |
| `/api/cart/:itemId`       | PUT    | Update cart item                   |
| `/api/cart/:itemId`       | DELETE | Remove item from cart              |
| `/api/orders`             | POST   | Create a new order                 |

## Deployment

This project is configured for deployment on Vercel with a PostgreSQL database hosted on Railway or Supabase.

```bash
# Build the project
npm run build
# or
yarn build

# Deploy to Vercel
vercel --prod
```

## Future Enhancements

- User authentication and account management
- Payment gateway integration
- Admin dashboard for product management
- Order tracking and history
- Discount and promotion system
- User reviews and ratings

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact [akio216216@gmail.com](mailto:akio216216@gmail.com).
