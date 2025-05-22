# TamShopEx

> E-commerce Web Platform for Cultural Products from Tamanrasset, Algeria

## 🌟 Overview

TamShopEx is a specialized e-commerce platform designed to showcase and sell local cultural and handcrafted products from Tamanrasset, connecting local artisans with tourists and cultural enthusiasts worldwide.

## 🎯 Mission

**Preserving Culture Through Digital Commerce** - Supporting local artisans while promoting Tamanrasset's rich cultural heritage through modern e-commerce technology.

## ✨ Key Features

- **Cultural Product Showcase** - Traditional jewelry, crafts, and heritage items
- **Smart Search & Filtering** - Category-based navigation and advanced search
- **Shopping Cart & Checkout** - Seamless shopping experience
- **User Authentication** - Secure login/registration with role-based access
- **Admin Dashboard** - Product and order management for administrators
- **Responsive Design** - Mobile-first, accessible across all devices
- **Multi-language Support** - Designed for diverse audiences

## 🛠️ Tech Stack

### Frontend
- **Next.js 15+** - React-based full-stack framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern, responsive styling
- **React Components** - Modular, reusable UI components

### Backend
- **Next.js API Routes** - Server-side logic and RESTful endpoints
- **NextAuth.js** - Comprehensive authentication system
- **JWT Tokens** - Secure, stateless authentication

### Database
- **PostgreSQL** - Robust relational database
- **Prisma ORM** - Type-safe database operations and schema management

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd tamshopex
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Configure database URL, NextAuth secret, etc.
   ```

4. **Set up database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open** [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
tamshopex/
├── app/                    # Next.js App Router pages
│   ├── cart/              # Shopping cart
│   ├── products/          # Product listing & details
│   ├── signin/            # Authentication
│   └── signup/            # User registration
├── components/            # Reusable React components
├── lib/                   # Utilities and configurations
├── pages/api/             # API endpoints
├── prisma/                # Database schema
└── public/                # Static assets
```

## 🔗 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | Retrieve products with filtering |
| `/api/products/[id]` | GET | Get product details |
| `/api/cart` | GET/POST/PUT/DELETE | Cart management |
| `/api/auth/register` | POST | User registration |
| `/api/auth/login` | POST | User authentication |
| `/api/order` | GET/POST | Order management |

## 👥 Target Audience

- **Primary**: Tourists seeking authentic cultural souvenirs
- **Secondary**: Local residents interested in cultural products  
- **Tertiary**: International customers interested in North African culture

## 🔮 Future Enhancements

- Mobile application development
- Advanced recommendation systems
- Integration with local payment systems
- Enhanced cultural storytelling features
- Community forums and artisan profiles

## 👨‍💻 Development Team

- **Mabrouki Ala Eddine**
- **Hafidi Mohamed Abdelazim**

## 📚 Documentation

For detailed technical documentation, system architecture, and implementation details, refer to the complete project documentation.

## 📄 License

Bachelor's Degree Final Year Project - University of Amine Elokkal El Hadj Moussa Eg Akhamouk

---

*Empowering local artisans through digital innovation* 🏺✨
