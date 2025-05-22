# TamShopEx

> E-commerce Web Platform for Cultural Products from Tamanrasset, Algeria


## 🌟 Overview

TamShopEx  is an eCommerce store developed using Next.js with Prisma PostgreSQL. The application is completely built from scratch(custom design) and completely responsive. TamShopEx is a specialized e-commerce platform designed to showcase and sell local cultural and handcrafted products from Tamanrasset. The goal of the project is to create a modern web application by following key stages in software engineering. I have created this online shop as part of my college exam with Hafidi Muhamed - Together with the application, we created detailed 30 pages software engineering documentation i'll summurize main points in this README but for full documentation checkout /TamShopEx/Documentation/Mabrouki_AlaEddine_TamShopEx.pdf .

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

3. **Creat database Set up environment variables**

- creat .env file in main directory and add :
   ```bash
    JWT_SECRET=##########################################

    DATABASE_URL=########################################

    NEXTAUTH_SECRET=#####################################
    NEXTAUTH_URL=http####################################
  ```
- (e.g) .env file:
    ```bash
    JWT_SECRET=0d0da830ef8b630b4db23310210da82d74c5ce900300e88340a5294f144a722d
    DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=(your_api_key)"
    NEXTAUTH_SECRET=12D16C923BA17672F89B18C1DB22A
    NEXTAUTH_URL=http://localhost:3000
    ```
   


4. **Set up database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```
   - creat database if you didnt have one
   ```bash
   npx prisma init --db
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
