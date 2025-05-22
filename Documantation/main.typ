// this is typst documentation go to https://typst.app/

#import "@preview/tablex:0.0.8": tablex, hlinex, vlinex, colspanx, rowspanx

// Document settings
#set document(
  title: "TamShopex Technical Documentation",
  author: ("Ala Eddine", "Muhammad"),
  keywords: ("TamShopex", "E-commerce", "Cultural Products", "Tamanrasset"),
)

#set page(
  paper: "a4",
  margin: (x: 2.5cm, y: 2cm),
  header: context {
    if counter(page).get().first() > 1 [
      #grid(
        columns: (1fr, 1fr),
        align: (left, right),
        [TamShopex Documentation],
        [#smallcaps[#h(1fr) #counter(page).display()]]
      )
      #line(length: 100%, stroke: 0.5pt + gray)
    ]
  }
)

// Color scheme
#let primary-blue = rgb("#2980b9")
#let secondary-green = rgb("#27ae60")
#let accent-orange = rgb("#e67e22")
#let dark-gray = rgb("#2c3e50")
#let light-gray = rgb("#95a5a6")

#set text(font: "New Computer Modern", size: 11pt)
#set par(justify: true, leading: 0.65em)

// Heading styles
#show heading.where(level: 1): it => {
  pagebreak(weak: true)
  v(2em)
  block[
    #set text(size: 24pt, weight: "bold", fill: primary-blue)
    #if it.numbering != none {
      counter(heading).display() + h(0.5em)
    }
    #it.body
  ]
  v(1em)
}

#show heading.where(level: 2): it => {
  v(1.5em)
  block[
    #set text(size: 16pt, weight: "bold", fill: primary-blue)
    #if it.numbering != none {
      counter(heading).display() + h(0.5em)
    }
    #it.body
  ]
  v(0.8em)
}

#show heading.where(level: 3): it => {
  v(1em)
  block[
    #set text(size: 14pt, weight: "bold", fill: dark-gray)
    #if it.numbering != none {
      counter(heading).display() + h(0.5em)
    }
    #it.body
  ]
  v(0.5em)
}

// Code block styling
#show raw.where(block: true): it => {
  set text(font: "JetBrains Mono", size: 9pt)
  block(
    fill: rgb("#f8f9fa"),
    stroke: 1pt + rgb("#e9ecef"),
    radius: 4pt,
    inset: 12pt,
    width: 100%,
    it
  )
}

// Inline code styling
#show raw.where(block: false): it => {
  box(
    fill: rgb("#f1f3f4"),
    inset: (x: 4pt, y: 2pt),
    radius: 2pt,
    text(font: "JetBrains Mono", size: 0.9em, it)
  )
}

// Table styling
#show table: it => {
  set text(size: 10pt)
  it
}

// Title Page

 

#align(center)[
  #text(size: 12pt)[People's Democratic Republic of Algeria Ministry Of Higher Education And Scientific Research
University of Amine Elokkal El Hadj Moussa Eg Akhamouk]
#figure(
    image("logo.jpg", width: 90pt),
    
    
  )
  
  #text(size: 20pt, weight: "bold", fill: primary-blue)[Bachelor's Degree in Computer Science]
  #v(1cm)
  
   #text(size: 18pt, fill: dark-gray)[Final Year Project Report]

  #text(size: 14pt )[Faculty of Science and Technology Department of Mathematics and Computer Science]

 
  
  #v(1cm)
  #line(length: 80%, stroke: 3pt + primary-blue)
  #v(1cm)
  
    #text(size: 33pt,fill: blue, weight: "bold")[TamShopEx]

  #text(size: 18pt, weight: "bold")[E-commerce Web Site for Cultural Products]
  #v(0.5cm)
  #text(size: 16pt)[Tamanrasset, Algeria]
  
  #v(1cm)
  
  #grid(
    columns: (1fr, 1fr),
    gutter: 2cm,
    [
      *made by:*\
      Mabrouki Ala Eddine\
      Hafidi Mohamed Abdelazim
    ],
    [
      *Project Type:*\
      Full-Stack E-commerce\
      Web Application
    ]
  )
  
  #v(2cm)
  #text(size: 14pt)[2025-2024]
  
 
  #text(style: "italic", size: 12pt, fill: dark-gray)[
    _Preserving Culture Through Digital Commerce_
  ]
]

#pagebreak()

#v(1cm)
#text(size: 16pt, style: "oblique", fill: blue)[Summery: ]
#text(size: 12pt)[
The TamShopEx project focuses on the design and implementation of a dynamic e-commerce
website dedicated to showcasing and selling cultural and handcrafted products from
Tamanrasset. Built using modern technologies such as Next.js, TypeScript, Tailwind CSS,
PostgreSQL, and Prisma Postgres , the platform ensures a responsive, secure, and user-friendly
experience. The system caters to both customers and administrators: users can browse products,
search by category or keyword, view detailed product pages, manage a shopping cart, and
simulate the checkout process. Authentication and role-based access control are implemented
via NextAuth.js. Administrators have access to a management dashboard to handle product
listings, user accounts, and order processing. The platform adopts a modular architecture and
supports multilingual, mobile-first design, with future plans for integration of real payment
gateways and international reach. Overall, TamShopEx aims to preserve cultural heritage while
empowering local artisans through digital trade]

#v(1cm)
#text(size: 16pt, style: "oblique", fill: blue)[Résumé: ]
#text(size: 12pt)[Le projet TamShopEx consiste en la conception et le développement d'un site e-commerce
dynamique dédié à la présentation et à la vente de produits culturels et artisanaux de la région
de Tamanrasset. Construit avec des technologies modernes telles que Next.js, TypeScript,
Tailwind CSS, PostgreSQL et Prisma Postgres, la plateforme garantit une expérience utilisateur
fluide, sécurisée et réactive. Le système s’adresse à la fois aux clients et aux administrateurs : les
utilisateurs peuvent naviguer par catégories, rechercher des produits, consulter les détails, gérer
leur panier et simuler le processus d’achat. L'authentification et le contrôle des accès selon les
rôles sont assurés via NextAuth.js. Les administrateurs disposent d’un tableau de bord pour gérer
les produits, les utilisateurs et les commandes. Le projet adopte une architecture modulaire et un
design responsive adapté aux mobiles, avec des perspectives d’intégration de paiements en ligne
et d’expansion à l’international. TamShopEx vise à valoriser le patrimoine culturel tout en
soutenant les artisans locaux grâce au commerce numérique.]

#v(1cm)
#text(lang: "ar", size: 16pt, style: "oblique", fill: blue)[ملخص: ]
#text(lang: "ar", size: 12pt)[ TamShopEx هو موقع إلكتروني ديناميكي مخصص لعرض وبيع المنتجات الثقافية والحرفية من منطقة تمنراست. يستخدم تقنيات حديثة مثل Next.js وTypeScript وTailwind CSS وقاعدة بيانات Prisma Postgres مع Prisma لضمان تجربة استخدام سلسة وآمنة. يخدم كلاً من الزبائن والإداريين، حيث يمكن للمستخدمين تصفح المنتجات والبحث حسب الفئة أو الكلمات المفتاحية، وإدارة سلة الشراء. تم تطبيق نظام تسجيل دخول مع التحكم بالصلاحيات باستخدام NextAuth.js. المشرفون لديهم لوحة تحكم لإدارة المنتجات والمستخدمين والطلبات
يتميز بهيكلية برمجية منظمة وتصميم متجاوب للأجهزة المحمولة ويدعم التعدد اللغوي.]

// Table of Contents
#outline(
  title: [Table of Contents],
  
  indent: auto
)

#pagebreak()

#set heading(numbering: "1.")

= General Introduction
== Introduction:
In recent years, e-commerce has witnessed significant growth due to the digital transformation of
various sectors and the changing habits of consumers, who are increasingly drawn to online
shopping for its convenience and speed. Among the fields that can greatly benefit from this shift
are cultural and handcrafted products, which hold strong symbolic and traditional value.
Creating a dedicated e-commerce platform for showcasing and selling these types of products
represents a strategic step toward promoting cultural heritage and connecting artisans with local
and international markets in a professional and efficient manner.

== E-commerce: Definition and TypesE-commerce: 
=== Definition: 
E-commerce refers to the process of buying and selling goods or services via the internet. It
includes all forms of commercial exchanges carried out through digital media and serves as a
powerful tool to expand market reach, reduce costs, and provide flexible shopping experiences
for consumers.

=== Typs: 

- B2C (Business to Consumer): Stores selling products directly to end users.
- B2B (Business to Business): Companies selling wholesale to other businesses or retailers.
- C2C (Consumer to Consumer): Individuals selling products to one another through dedicated
platforms.
- C2B (Consumer to Business): Individuals offering their products or services to companies (e.g.,
artisans selling their crafts to online marketplaces).

== Advantages and Disadvantages of E-commerce : 
=== Advanteges:
 Access to a broader local and international customer base.
- Reduced operational costs compared to physical stores.
- Personalized user experiences and product suggestions.
- Support for artisans in promoting their work.
- Easy comparison and flexible navigation.
- Availability 24/7 without geographical or time constraints.

=== Disavanteges:
- Lack of human interaction.
- Security concerns regarding online payments.
- Difficulty in assessing the quality of handcrafted products through images alone.
- Potential shipping and delivery issues.
- Customer hesitation to trust new or local platforms.

== Project Overview:

=== What is the Website?:

The proposed platform is an e-commerce website that enables users to browse and purchase a
variety of products, with a special focus on cultural and handcrafted items such as traditional
clothing, heritage utensils, handmade crafts, and decorative pieces that reflect cultural identity

=== Project Objectives:
- Create a user-friendly and functional interface to display cultural products.
- Facilitate online marketing and sales for artisans and small businesses.
- Promote cultural goods locally and internationally.
- Allow users to easily interact with the platform (search, order, review).
- Provide sellers with an integrated dashboard for product and order management.

== Current State Analysis: 
Currently, cultural products are mainly sold through traditional markets, seasonal exhibitions, or
unstructured social media accounts. This fragmented method lacks organization and makes it
difficult to reach a wider audience or manage orders efficiently. Additionally, many artisans lack
the digital skills needed to effectively market their products online, and there is a notable
absence of a unified and trustworthy platform to connect them with customers.

== Challenges and Proposed Solutions

=== Challenges

- Reliance on traditional methods of selling and promotion.
- Lack of digital documentation for cultural products.
- Limited digital literacy among artisans.
- Absence of a unified, reliable online platform.
- Payment and delivery challenges in certain regions.
=== Proposed Solutions:
Develop a dynamic e-commerce platform with multiple user interfaces.
Support high-quality visuals and detailed product descriptions, including cultural context.
Integrate smart search and product categorization by type, culture, and region.
Provide secure and user-friendly payment gateways.
Allow artisans to create and manage their own accounts and product listings.
Enable customer reviews and ratings to build trust.
Promote the platform digitally to attract local and international traffic

== Internet and Web Role in the Project:
=== The Internet:
The internet provides the infrastructure to connect the platform with users worldwide, enabling
access to products regardless of geographical location.

=== The Web:
he web serves as the visual and interactive layer of the platform, enabling users to navigate,
view products, search, and perform transactions through intuitive pages and interfaces.

== Difference Between a Web Page and a Website:
- *Web Page:* A single content document such as a product or contact page.
- *Website:* A collection of interconnected web pages sharing the same domain, offering comprehensive services (search, cart, communication, etc.)

== Difference Between Static and Dynamic Websites:
- *Static Website:* Displays fixed content that does not change with each visit.
- *Dynamic Website:* Interactive and data-driven; content changes according to user interactions
and database updates.
- *Advantages of Dynamic Websites:*
- Easy content updates.
- Personalized user experience.
- Automated management of products, orders, and customers.
- Better scalability and functional flexibility.




= Executive Summary

== Project Overview

TamShopex is a specialized e-commerce platform designed to showcase and sell local and cultural products from Tamanrasset, Algeria. The platform serves as a digital marketplace connecting local artisans with tourists, locals, and anyone interested in Tamanrasset's rich cultural heritage.

== Business Objectives

The platform aims to achieve several key objectives:

- *Cultural Preservation*: Digitally preserve and promote Tamanrasset's cultural heritage through traditional products
- *Economic Growth*: Support local artisans and businesses by providing digital market access
- *Tourism Enhancement*: Offer tourists authentic cultural products and experiences
- *Community Building*: Create a platform that connects local culture with global audiences

== Target Audience

The platform targets three distinct user groups:

1. *Primary*: Tourists visiting Tamanrasset seeking authentic cultural souvenirs
2. *Secondary*: Local residents interested in cultural products
3. *Tertiary*: International customers interested in North African and Tuareg culture


= Project Overview

== Project Information

#table(
  columns: 2,
  stroke: 0.5pt + gray,
  [*Attribute*], [*Value*],
  [Project Name], [TamShopex],
  [Development Team], [Mabrouki Ala Eddine and Hafidi Mohamed Abdelazim],
  [Development Model], [Waterfall methodology],
  [Current Status], [Testing phase],
  [Target Platform], [Web-based e-commerce application],
)

== Core Features

The platform provides essential e-commerce functionality tailored for cultural products:

=== Product Management
- Category-based navigation reflecting cultural themes
- Advanced search functionality with category filters
- Featured products highlighting unique cultural items

=== User Experience
- Intuitive product discovery and exploration
- Responsive design optimized for all devices
- Cultural storytelling integrated with product listings
- Multi-language support considerations for diverse audiences

=== E-commerce Functionality
- Persistent shopping cart across sessions
- Streamlined checkout process
- Order management and tracking
- Inventory management with real-time stock updates

=== Authentication & Security
- JWT-based authentication system
- Role-based access control (Admin/Customer)
- Secure user registration and login processes
- Data protection and privacy compliance


= System Architecture

== Architecture Overview

TamShopex follows a monolithic architecture pattern using Next.js full-stack framework, providing both frontend and backend capabilities in a single, cohesive application.

=== Architectural Benefits
- Simplified development and deployment
- Improved development velocity for small teams
- Reduced complexity in inter-service communication

== Component Interaction Flow

=== User Authentication Flow
1. User submits credentials via signin/signup pages
2. Frontend sends request to `/api/auth` endpoints
3. Server validates credentials and generates JWT token
4. Token is stored and used for subsequent authenticated requests

=== Product Browsing Flow
1. User navigates to products page
2. Frontend requests product data from `/api/products`
3. Server queries database via Prisma ORM
4. Product data is returned and rendered with cultural context

=== Shopping Cart Flow
1. User adds product to cart
2. Frontend sends request to `/api/cart` with product details
3. Server updates cart in database (user-linked or session-based)
4. Cart state is synchronized across user sessions

== Data Flow Architecture

The application follows a unidirectional data flow pattern:
- *Frontend*: React components manage local state and trigger API calls
- *API Layer*: Next.js API routes handle business logic and data validation
- *Database Layer*: Prisma ORM manages database operations and relationships

= Technical Stack

== Frontend Technologies

=== Next.js with App Router
- *Framework*: React-based full-stack framework
- *Routing*: App Router for improved performance and developer experience
- *Rendering*: Server-side rendering (SSR) and static site generation (SSG)
- *Benefits*: SEO optimization, improved performance, simplified development

=== React Components
- *Component Architecture*: Functional components with hooks
- *State Management*: React useState and useEffect for local state
- *Props and Context*: Data passing and global state management
- *Component Reusability*: Modular components for scalability

=== Styling and UI
- *CSS Framework*: Tailwind CSS or CSS Modules (recommended)
- *Responsive Design*: Mobile-first approach
- *Component Libraries*: Potential integration with shadcn/ui or similar
- *Cultural Theming*: Custom styling reflecting Tamanrasset cultural aesthetics

== Backend Technologies

=== Next.js API Routes
- *Server-side Logic*: Built-in API routes for backend functionality
- *Middleware Support*: Request/response processing pipeline
- *Performance*: Optimized server-side rendering and API handling

=== Authentication & Authorization
- *NextAuth.js*: Comprehensive authentication solution
- *JWT Tokens*: Stateless authentication with secure token management
- *Role-based Access*: ADMIN and CUSTOMER role differentiation
- *Session Management*: Secure session handling and persistence

== Database Technologies

=== Prisma Postgres Database
- *Easy setup*: Prisma ORM compliance and data integrity
- *Scalability*: Horizontal and vertical scaling capabilities
- *Complex Queries*: Advanced querying for product search and filtering

=== Prisma ORM
- *Type Safety*: TypeScript integration with type-safe database operations
- *Schema Management*: Declarative schema definition and migrations
- *Query Builder*: Intuitive and powerful query interface
- *Relationship Management*: Simplified handling of complex data relationships

= Database Design

== Database Schema Overview

The TamShopex database is designed to support efficient e-commerce operations while maintaining data integrity and supporting future scalability. The schema includes six main entities with well-defined relationships.

== Class Diagram

=== defenition :
The class diagram is a fundamental component in the design phase, as it provides a structural
representation of the system’s entities, their attributes, and the relationships between them. For
the TamShopex platform, the diagram was designed in alignment with the typical requirements
of an e-commerce system, while taking into account the cultural specificity of the products being
offered.


#figure(
  image("UML_class.png"),
  caption: [
    UML Class diagram
  ],
)

== Use case Diagram

=== defenition: 
The use case diagram identifies the system's actors and the main actions available to them.
- Main Actors:
- Customer: registers, browses products, adds items to cart, places orders, views order history.
- Admin: manages products, users, and validates or cancels orders.
* Key Use Cases:*
- Customer : Register / Login
- Search for products
- View product details
- Add product to cart
- Place an order
- Track order status
- Admin : Manage products
- Manage users
- Process orders

#figure(
  image("case.png"),
  caption: [
    Use case diagram
  ],
)

#v(4cm)
== Table Specifications

=== Table (e.g):

The Product table contains cultural products with detailed information:

```sql
CREATE TABLE "Product" (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    imageUrl VARCHAR(500),
    stock INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    categoryId VARCHAR(36) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (categoryId) REFERENCES "Category"(id) ON DELETE RESTRICT
);

-- Performance indexes
CREATE INDEX idx_product_category ON "Product"(categoryId);
CREATE INDEX idx_product_featured ON "Product"(featured);
CREATE INDEX idx_product_stock ON "Product"(stock);
CREATE INDEX idx_product_price ON "Product"(price);
```

== Data Relationships

#table(
  columns: 3,
  stroke: 0.5pt + gray,
  [*Relationship*], [*Type*], [*Description*],
  [User-Cart], [1:1], [Each user has one cart for session persistence],
  [Category-Product], [1:N], [Each product belongs to one category],
  [Cart-CartItem], [1:N], [Each cart contains multiple items],
  [User-Order], [1:N], [Users can have multiple orders],
  [Product-OrderItem], [N:M], [Products can appear in multiple orders],
)

== Data Integrity and Constraints

- *Primary Keys*: UUID-based for security and scalability
- *Foreign Keys*: Enforce referential integrity
- *Unique Constraints*: Prevent duplicate emails and cart items
- *Check Constraints*: Ensure positive prices and quantities
- *Index Strategy*: Optimized for common query patterns

= API Implementation

== API Architecture Overview

TamShopex implements RESTful API endpoints using Next.js API routes, providing a comprehensive backend service for the e-commerce platform. The API follows REST conventions with proper HTTP methods, status codes, and JSON responses.


== Products API

*Endpoint*: `GET /api/products`

*Query Parameters*:
- `page`: Page number for pagination
- `limit`: Number of products per page
- `category`: Filter by category ID
- `featured`: Filter featured products
- `search`: Search term for product name/description

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "uuid",
        "name": "Traditional Tuareg Jewelry",
        "description": "Handcrafted silver jewelry...",
        "price": 12000,
        "imageUrl": "/jewelry1.jpg",
        "stock": 20,
        "featured": true,
        "category": {
          "id": "uuid",
          "name": "Jewelry",
          "description": "Traditional jewelry and accessories"
        }
      }
    ]
  }
}
```

= Security Framework

== Authentication Security

=== JWT Token Management
- Secure token generation with appropriate expiration times
- Token refresh mechanism for extended sessions
- Secure storage practices for client-side tokens
- Token validation and blacklisting capabilities

=== Password Security
- Bcrypt hashing with appropriate salt rounds
- Strong password requirements enforcement
- Protection against brute force attacks
- Secure password reset mechanisms

== Data Protection

=== Input Validation
- Server-side validation for all API endpoints
- SQL injection prevention through parameterized queries
- XSS protection through input sanitization
- CSRF protection for state-changing operations

=== Authorization Controls
- Role-based access control (RBAC)
- Resource-level permissions
- API endpoint protection
- Admin functionality isolation

= Development Process

== Development Methodology

The TamShopex project follows a Waterfall development methodology, providing structured phases and clear deliverables for the two-person development team.

=== Project Phases
1. *Requirements Analysis*: Comprehensive requirement gathering and documentation
2. *System Design*: Architecture design and technical specification
3. *Implementation*: Code development following design specifications
4. *Testing*: Systematic testing and quality assurance
5. *Deployment*: Production deployment and launch
6. *Maintenance*: Ongoing support and feature enhancement

== Code Quality Standards

=== Coding Standards
- TypeScript for type safety and better developer experience
- Comprehensive code comments and documentation

=== Version Control
- Git version control with structured branching
- Meaningful commit messages following conventional standards
- Code review process for quality assurance
- Regular backup and repository management

= Conclusion

== Project Summary

TamShopex represents a comprehensive e-commerce solution specifically designed to preserve and promote the cultural heritage of Tamanrasset through digital commerce. The platform combines modern web technologies with cultural sensitivity to create an authentic marketplace for traditional products.

== Technical Achievements

The project successfully implements:
- A robust full-stack web application using Next.js
- Secure authentication and authorization systems
- Comprehensive e-commerce functionality
- Culturally-focused product categorization
- Scalable database design with PostgreSQL and Prisma
- RESTful API architecture for frontend-backend communication

== Future Enhancements

Potential areas for future development include:
- Mobile application development
- Advanced recommendation systems
- Multi-language support implementation
- Integration with local payment systems
- Enhanced cultural storytelling features
- Community forums and artisan profiles

== Final Thoughts

TamShopex demonstrates the powerful intersection of technology and culture, showing how modern e-commerce solutions can be leveraged to preserve and promote cultural heritage while supporting local communities. The project's success lies not only in its technical implementation but in its meaningful contribution to cultural preservation and economic empowerment.

#pagebreak()

= Appendices

== Complete API Endpoint Reference

#table(
  columns: (1fr, auto, 2fr),
  stroke: 0.5pt + gray,
  [*Endpoint*], [*Method*], [*Description*],
  [`/api/auth/register`], [`POST`], [User registration with email and password],
  [`/api/auth/login`], [`POST`], [User authentication and token generation],
  [`/api/auth/logout`], [`POST`], [User logout and token invalidation],
  [`/api/products`], [`GET`], [Retrieve products with pagination and filtering],
  [`/api/products/[id]`], [`GET`], [Get specific product details],
  [`/api/products`], [`POST`], [Create new product (Admin only)],
  [`/api/products/[id]`], [`PUT`], [Update product information (Admin only)],
  [`/api/products/[id]`], [`DELETE`], [Delete product (Admin only)],
  [`/api/category`], [`GET`], [Retrieve all product categories],
  [`/api/category`], [`POST`], [Create new category (Admin only)],
  [`/api/category/[id]`], [`DELETE`], [Delete category (Admin only)],
  [`/api/cart`], [`GET`], [Retrieve user's cart contents],
  [`/api/cart`], [`POST`], [Add product to cart],
  [`/api/cart`], [`PUT`], [Update cart item quantity],
  [`/api/cart`], [`DELETE`], [Remove item from cart],
  [`/api/cart/clean`], [`DELETE`], [Clear entire cart],
  [`/api/order`], [`GET`], [Retrieve user's orders],
  [`/api/order`], [`POST`], [Create new order],
  [`/api/order/[id]`], [`GET`], [Get specific order details],
  [`/api/order/[id]`], [`PUT`], [Update order status (Admin only)],
)

#v(5cm)
== Project File Structure

```
tamshopex/
├── app/                              # Next.js 15+ App Router - main application pages
│   ├── cart/                       # Shopping cart page (/cart)
│   ├── products/               # Products listing page (/products)
│   │   └── [id]                   # Dynamic product detail pages (/products/123)
│   ├── signin/                   # User authentication - sign in page (/signin)
│   └── signup/                  # User registration page (/signup)
├── components/               # Reusable React components
│   ├── home/                    # Homepage-specific components (hero, featured products)
│   ├── layout/                   # Layout components (header, footer)
│   └── products/                # Product-related components (cards, search, filters)
├── lib/                                # Utility functions and configurations
├── pages/                           # Legacy Pages Router (used for API routes)
│   └── api/                        # API endpoints for backend functionality
├── prisma/                         # Database schema and migrations
└── public/                         # Static assets (images, icons, logos)
```

= Website pages preview

== Home page
#figure(
  image("pic/3.png"),
  caption: [
    home page
  ],
)

=== Shop by category section
#figure(
  image("pic/10.png"),
  caption: [
    Shop by category section
  ],
)
=== Featured products section
#figure(
  image("pic/11.png"),
  caption: [
    Featured products section
  ],
)
== All products page
#figure(
  image("pic/8.png"),
  caption: [
    All products page
  ],
)
== Search page
#figure(
  image("pic/9.png"),
  caption: [
    Search page
  ],
)

== Product [id] page
#figure(
  image("pic/7.png"),
  caption: [
    Product page
  ],
)
== Cart page
#figure(
  image("pic/6.png"),
  caption: [
    Cart page
  ],
)


== Checkout page
#figure(
  image("pic/2.png"),
  caption: [
    Checkout page
  ],
)
== About US page
#figure(
  image("pic/1.png"),
  caption: [
    About US page
  ],
)
==  Contact Us page
#figure(
  image("pic/4.png"),
  caption: [
    Contact Us page
  ],
)



