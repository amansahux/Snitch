# SNITCH

> A full-stack fashion e-commerce platform built as a personal project
> to simulate a production-oriented marketplace with separate buyer and
> seller experiences.

SNITCH is a modern MERN-stack fashion e-commerce platform where
customers can browse products, manage their wishlist and cart, place
orders through Razorpay, and track their purchases. Sellers have a
dedicated dashboard for creating products, managing variants and
inventory, handling orders, and viewing business analytics.

The project was built to go beyond a basic CRUD e-commerce tutorial by
focusing on modular architecture, reusable components, role-based
access, validation, authentication, external services, state management,
and real-world buyer/seller workflows.

------------------------------------------------------------------------

## ✨ Core Highlights

-   🛍️ Buyer-side fashion shopping experience
-   🧑‍💼 Dedicated seller dashboard
-   🔐 JWT-based authentication
-   🔑 Google OAuth authentication
-   👥 Buyer/Seller role-based access
-   🛒 Cart and wishlist management
-   📦 Order creation, tracking, cancellation, and status management
-   💳 Razorpay payment integration
-   🖼️ ImageKit-based image storage
-   📊 Seller dashboard and analytics
-   📈 Inventory and revenue insights
-   🧩 Feature-based frontend architecture
-   🧱 Modular Express backend architecture
-   ✅ Zod request validation
-   🍪 HTTP-only cookie-based authentication flow
-   ⚡ Redis integration for backend caching/session-related utilities
-   📧 Email service integration
-   📱 Responsive buyer experience

------------------------------------------------------------------------

# 🏗️ System Architecture

``` mermaid
flowchart TB
    U["Buyer / Customer"]
    S["Seller"]

    FE["React Frontend<br/>Vite + React Router + Redux Toolkit"]
    API["Express.js REST API"]

    AUTH["Authentication<br/>JWT + Google OAuth"]
    DB[("MongoDB")]
    REDIS[("Redis")]
    IMG["ImageKit<br/>Image Storage"]
    PAY["Razorpay<br/>Payment Gateway"]
    EMAIL["Email Service"]

    U --> FE
    S --> FE

    FE --> API

    API --> AUTH
    API --> DB
    API --> REDIS
    API --> IMG
    API --> PAY
    API --> EMAIL
```

------------------------------------------------------------------------

# 🧭 End-to-End Application Flow

``` mermaid
flowchart TD
    START["User Opens SNITCH"]

    START --> HOME["Home / Shop"]
    HOME --> PRODUCT["Product Details"]

    PRODUCT --> WISH["Wishlist"]
    PRODUCT --> CART["Add to Cart"]

    WISH --> LOGIN1["Authentication Required"]
    CART --> LOGIN2["Authentication Required"]

    START --> AUTH["Login / Register"]
    AUTH --> JWT["JWT Authentication"]

    JWT --> BUYER["Buyer Experience"]
    JWT --> SELLER["Seller Experience"]

    BUYER --> CART2["Cart"]
    CART2 --> ADDRESS["Delivery Address"]
    ADDRESS --> ORDER["Create Order"]
    ORDER --> RAZORPAY["Razorpay Checkout"]
    RAZORPAY --> VERIFY["Verify Payment"]
    VERIFY --> SUCCESS["Order Success"]
    SUCCESS --> TRACK["Order Details / Tracking"]

    SELLER --> DASH["Seller Dashboard"]
    DASH --> PRODUCT_CREATE["Create Product"]
    PRODUCT_CREATE --> VARIANT["Manage Variants"]
    VARIANT --> INVENTORY["Inventory"]
    SELLER --> SELLER_ORDERS["Manage Orders"]
    SELLER --> ANALYTICS["Analytics"]
```

------------------------------------------------------------------------

# 👤 User Roles

SNITCH has two primary application roles.

``` mermaid
flowchart LR
    AUTH["Authenticated User"]

    AUTH --> BUYER["Buyer"]
    AUTH --> SELLER["Seller"]

    BUYER --> B1["Browse Products"]
    BUYER --> B2["Wishlist"]
    BUYER --> B3["Cart"]
    BUYER --> B4["Checkout"]
    BUYER --> B5["Orders"]
    BUYER --> B6["Profile"]

    SELLER --> S1["Dashboard"]
    SELLER --> S2["Create Products"]
    SELLER --> S3["Manage Inventory"]
    SELLER --> S4["Manage Orders"]
    SELLER --> S5["Analytics"]
```

------------------------------------------------------------------------

# 🔐 Authentication Flow

SNITCH supports normal authentication as well as Google authentication.

## Registration / Login

``` mermaid
sequenceDiagram
    participant C as Client
    participant API as Express API
    participant V as Zod Validator
    participant DB as MongoDB

    C->>API: POST /auth/register
    API->>V: Validate request
    V-->>API: Valid data
    API->>DB: Create user
    DB-->>API: User created
    API-->>C: Authentication response

    C->>API: POST /auth/login
    API->>V: Validate credentials
    API->>DB: Find user
    DB-->>API: User
    API-->>C: JWT cookie
```

## Google Authentication

``` mermaid
sequenceDiagram
    participant U as User
    participant FE as React
    participant API as Express
    participant G as Google OAuth
    participant DB as MongoDB

    U->>FE: Click Continue with Google
    FE->>API: GET /auth/google
    API->>G: Redirect to Google
    G-->>API: OAuth callback
    API->>DB: Find/Create user
    DB-->>API: User
    API->>API: Generate JWT
    API-->>FE: Redirect to application
```

### Authentication Responsibilities

-   JWT identifies the authenticated user.
-   Authentication middleware protects private routes.
-   Seller authentication middleware protects seller-only operations.
-   Google OAuth can create or connect a user account.
-   Authentication state is consumed by protected frontend routes.

------------------------------------------------------------------------

# 🛒 Buyer Journey

## 1. Browse Products

Public users can access:

``` text
/
 /shop
 /shop/product/:id
```

The product system supports:

-   Product listing
-   Product details
-   Similar products
-   Product variants
-   Product images
-   Product information

``` mermaid
flowchart LR
    HOME["Home"] --> SHOP["Shop"]
    SHOP --> LIST["Product Listing"]
    LIST --> DETAIL["Product Details"]
    DETAIL --> SIMILAR["Similar Products"]
    DETAIL --> VARIANTS["Select Variant"]
    VARIANTS --> CART["Add to Cart"]
```

------------------------------------------------------------------------

# ❤️ Wishlist

Authenticated buyers can:

``` text
GET    /wishlist
POST   /wishlist/:productId
DELETE /wishlist/:productId
```

Flow:

``` mermaid
flowchart LR
    P["Product"] --> ADD["Add to Wishlist"]
    ADD --> API["Wishlist API"]
    API --> DB[("MongoDB")]
    DB --> W["Wishlist"]
    W --> REMOVE["Remove"]
```

------------------------------------------------------------------------

# 🛍️ Cart

The cart is available only to authenticated users.

``` text
GET    /cart
POST   /cart/items
PATCH  /cart/items/:itemId
DELETE /cart/items/:itemId
DELETE /cart
```

Cart operations include:

-   Add item
-   Update quantity/variant information
-   Remove item
-   Clear cart
-   Retrieve current cart

``` mermaid
sequenceDiagram
    participant U as Buyer
    participant FE as React
    participant API as Cart API
    participant DB as MongoDB

    U->>FE: Add product
    FE->>API: POST /cart/items
    API->>DB: Update cart
    DB-->>API: Updated cart
    API-->>FE: Cart response
    FE-->>U: Updated cart UI
```

------------------------------------------------------------------------

# 📦 Checkout & Order Flow

The order workflow connects cart, address, order creation, payment, and
payment verification.

``` mermaid
flowchart TD
    CART["Cart"] --> ADDRESS["Select Delivery Address"]
    ADDRESS --> CREATE["Create Order"]
    CREATE --> RZ["Create / Open Razorpay Payment"]
    RZ --> PAYMENT["Customer Payment"]
    PAYMENT --> VERIFY["Verify Payment"]
    VERIFY -->|Success| ORDER_SUCCESS["Order Success"]
    VERIFY -->|Failure| FAILED["Payment Failed / Cancelled"]
    ORDER_SUCCESS --> ORDERS["My Orders"]
    ORDERS --> DETAIL["Order Details"]
```

## Order APIs

``` text
POST /order/create
POST /order/order/verify-order

GET  /order/my-orders
GET  /order/my-orders/:id

PUT  /order/my-orders/:id/status
PUT  /order/payment/:id/status

GET  /order/seller

PUT  /order/:id/cancel
```

### Payment

Razorpay is integrated as the payment gateway.

The frontend opens the Razorpay checkout and receives payment
information. The backend then verifies the payment before treating the
order as successfully paid.

This keeps payment verification on the server side rather than trusting
only the frontend callback.

------------------------------------------------------------------------

# 👤 Profile & Address Management

Authenticated buyers can manage their profile and delivery addresses.

## Profile

``` text
GET   /auth/profile
GET   /auth/logout
PATCH /auth/profile/upload-pic
```

## Address

``` text
GET    /address
POST   /address/create
PUT    /address/update/:id
DELETE /address/delete/:id
```

``` mermaid
flowchart LR
    USER["Authenticated User"]
    USER --> PROFILE["Profile"]
    USER --> ADDRESS["Addresses"]

    PROFILE --> PIC["Profile Picture"]
    ADDRESS --> CREATE["Create"]
    ADDRESS --> UPDATE["Update"]
    ADDRESS --> DELETE["Delete"]
```

------------------------------------------------------------------------

# 🧑‍💼 Seller Experience

Seller routes are protected using the frontend `ProtectedRoute` with the
seller role and backend seller authentication middleware.

``` text
/seller
/seller/dashboard
/seller/analytics
/seller/orders
/seller/create-product
/seller/products
/seller/products/:id
```

``` mermaid
flowchart TD
    SELLER["Seller Login"]

    SELLER --> DASH["Dashboard"]
    SELLER --> ANALYTICS["Analytics"]
    SELLER --> ORDERS["Manage Orders"]
    SELLER --> CREATE["Create Product"]
    SELLER --> INVENTORY["Inventory"]
    INVENTORY --> DETAIL["Product Detail"]
```

------------------------------------------------------------------------

# 📦 Seller Product Management

Sellers can create, update, delete, and retrieve their products.

## Product APIs

``` text
POST   /product/create
DELETE /product/delete/:id
POST   /product/update/:id

GET    /product/seller
GET    /product
GET    /product/:id
GET    /product/similar/:id
```

Product creation supports multiple image uploads.

``` mermaid
flowchart LR
    SELLER["Seller"] --> FORM["Product Form"]
    FORM --> VALIDATE["Zod Validation"]
    VALIDATE --> UPLOAD["Multer"]
    UPLOAD --> IMAGEKIT["ImageKit"]
    IMAGEKIT --> PRODUCT["Product Data"]
    PRODUCT --> DB[("MongoDB")]
```

------------------------------------------------------------------------

# 🎨 Image Storage

Product and profile images are handled through an upload pipeline.

``` text
Frontend
   ↓
Multer
   ↓
Storage Service
   ↓
ImageKit
   ↓
Image URL
   ↓
MongoDB
```

The database stores the relevant image information rather than acting as
the primary binary image storage layer.

------------------------------------------------------------------------

# 🧩 Product Variants

SNITCH separates products and their variants.

Variant operations include:

``` text
POST   /variant/create/:productId
GET    /variant/get-variants/:productId
PUT    /variant/update-variant/:variantId
DELETE /variant/delete-variant/:variantId
```

This allows a product to have multiple purchasable configurations.

``` mermaid
flowchart TD
    PRODUCT["Product"] --> V1["Variant"]
    PRODUCT --> V2["Variant"]
    PRODUCT --> V3["Variant"]

    V1 --> SIZE1["Size / Configuration"]
    V2 --> SIZE2["Size / Configuration"]
    V3 --> SIZE3["Size / Configuration"]

    V1 --> STOCK1["Inventory"]
    V2 --> STOCK2["Inventory"]
    V3 --> STOCK3["Inventory"]
```

------------------------------------------------------------------------

# 📊 Seller Dashboard & Analytics

Seller analytics are exposed through:

``` text
GET /dashboard/data
```

The backend dashboard route is protected using seller authentication.

The seller dashboard provides the application's business-facing view for
areas such as:

-   Sales information
-   Revenue insights
-   Order information
-   Inventory intelligence
-   Product-related metrics

The exact aggregation logic lives inside the dashboard controller and
its related backend data layer.

------------------------------------------------------------------------

# 🧠 Backend Architecture

The backend follows a modular Express architecture.

``` text
Backend/
└── src/
    ├── config/
    │   ├── cache.js
    │   ├── config.js
    │   └── db.js
    │
    ├── controllers/
    │   ├── address.controller.js
    │   ├── auth.controller.js
    │   ├── cart.controller.js
    │   ├── dashboard.controller.js
    │   ├── order.controller.js
    │   ├── product.controller.js
    │   ├── variant.controller.js
    │   └── wishlist.controller.js
    │
    ├── dao/
    │   └── cart.dao.js
    │
    ├── middlewares/
    │   ├── asyncHandler.middleware.js
    │   ├── auth.middleware.js
    │   ├── error.middleware.js
    │   ├── multer.middleware.js
    │   └── zod.middleware.js
    │
    ├── models/
    │   ├── address.model.js
    │   ├── cart.model.js
    │   ├── order.model.js
    │   ├── product.model.js
    │   ├── user.model.js
    │   ├── variant.model.js
    │   └── wishlist.model.js
    │
    ├── routes/
    │   ├── address.routes.js
    │   ├── auth.routes.js
    │   ├── cart.routes.js
    │   ├── dashboard.routes.js
    │   ├── order.routes.js
    │   ├── product.routes.js
    │   ├── variant.routes.js
    │   └── wishlist.routes.js
    │
    ├── services/
    │   ├── email.service.js
    │   └── storage.service.js
    │
    ├── utils/
    │   ├── emailTemplates.js
    │   ├── redis.utils.js
    │   └── sendTokenResponse.js
    │
    ├── validators/
    │   ├── address.validator.js
    │   ├── auth.validator.js
    │   ├── cart.validator.js
    │   ├── order.validator.js
    │   ├── product.validator.js
    │   └── variant.validator.js
    │
    ├── app.js
    └── server.js
```

------------------------------------------------------------------------

# 🖥️ Frontend Architecture

The frontend uses a feature-oriented structure.

``` text
Frontend/
└── src/
    ├── app/
    │   ├── components/
    │   │   ├── GuestRoute.jsx
    │   │   ├── HomeRedirect.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── toast/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── app.routes.jsx
    │   └── app.store.js
    │
    ├── assets/
    │
    ├── features/
    │   ├── address/
    │   ├── Auth/
    │   ├── cart/
    │   ├── Dashboard/
    │   ├── orders/
    │   ├── Product/
    │   ├── profile/
    │   └── wishlist/
    │
    └── main.jsx
```

Each major feature is separated into responsibilities such as:

``` text
Feature
├── components/
├── hooks/
├── pages/
├── services/
├── state/
└── validation/
```

This keeps UI, API calls, state, hooks, and validation from becoming one
large codebase.

------------------------------------------------------------------------

# 🧠 State Management

Redux Toolkit is used for frontend state management.

``` mermaid
flowchart LR
    COMPONENT["React Component"]
    ACTION["User Action"]
    REDUX["Redux Toolkit Store"]
    SERVICE["Feature Service"]
    API["Backend API"]

    ACTION --> COMPONENT
    COMPONENT --> REDUX
    COMPONENT --> SERVICE
    SERVICE --> API
    API --> SERVICE
    SERVICE --> REDUX
    REDUX --> COMPONENT
```

Feature state is organized around application domains rather than
keeping everything inside a single component.

------------------------------------------------------------------------

# 🛡️ Request Validation & Middleware

Backend requests pass through reusable middleware.

``` mermaid
flowchart LR
    REQUEST["HTTP Request"]
    AUTH["Authentication"]
    VALIDATE["Zod Validation"]
    CONTROLLER["Controller"]
    SERVICE["Service / DAO"]
    DB["Database"]

    REQUEST --> AUTH
    AUTH --> VALIDATE
    VALIDATE --> CONTROLLER
    CONTROLLER --> SERVICE
    SERVICE --> DB
```

The project uses:

-   Authentication middleware
-   Seller authentication middleware
-   Zod validation middleware
-   Multer upload middleware
-   Async handler middleware
-   Central error middleware

------------------------------------------------------------------------

# 🔑 Route Protection

## Public Routes

Examples:

``` text
GET /product
GET /product/:id
GET /product/similar/:id
```

## Authenticated Routes

Examples:

``` text
GET /cart
POST /cart/items
GET /wishlist
POST /wishlist/:productId
GET /order/my-orders
GET /auth/profile
```

## Seller Routes

Examples:

``` text
GET  /dashboard/data
POST /product/create
POST /product/update/:id
DELETE /product/delete/:id
GET  /product/seller
```

------------------------------------------------------------------------

# 🗺️ Backend API Map

``` mermaid
flowchart TD
    API["Express API"]

    API --> AUTH["/auth"]
    API --> ADDRESS["/address"]
    API --> CART["/cart"]
    API --> DASH["/dashboard"]
    API --> ORDER["/order"]
    API --> PRODUCT["/product"]
    API --> VARIANT["/variant"]
    API --> WISH["/wishlist"]

    AUTH --> A1["register / login"]
    AUTH --> A2["Google OAuth"]
    AUTH --> A3["profile / logout"]

    ADDRESS --> AD1["CRUD Addresses"]
    CART --> C1["Cart CRUD"]
    DASH --> D1["Seller Analytics"]
    ORDER --> O1["Create / Verify / Track"]
    PRODUCT --> P1["Browse / CRUD"]
    VARIANT --> V1["Variant CRUD"]
    WISH --> W1["Wishlist CRUD"]
```

------------------------------------------------------------------------

# 📚 Complete Backend Route Reference

## Authentication

  Method   Endpoint                     Access
  -------- ---------------------------- ---------------
  POST     `/auth/register`             Public
  POST     `/auth/login`                Public
  GET      `/auth/google`               Public
  GET      `/auth/google/callback`      OAuth
  GET      `/auth/profile`              Authenticated
  GET      `/auth/logout`               Authenticated
  PATCH    `/auth/profile/upload-pic`   Authenticated

## Address

  Method   Endpoint                Access
  -------- ----------------------- ---------------
  GET      `/address`              Authenticated
  POST     `/address/create`       Authenticated
  PUT      `/address/update/:id`   Authenticated
  DELETE   `/address/delete/:id`   Authenticated

## Cart

  Method   Endpoint                Access
  -------- ----------------------- ---------------
  GET      `/cart`                 Authenticated
  POST     `/cart/items`           Authenticated
  PATCH    `/cart/items/:itemId`   Authenticated
  DELETE   `/cart/items/:itemId`   Authenticated
  DELETE   `/cart`                 Authenticated

## Orders

  Method   Endpoint                        Access
  -------- ------------------------------- ---------------
  POST     `/order/create`                 Authenticated
  POST     `/order/order/verify-order`     Authenticated
  GET      `/order/my-orders`              Authenticated
  GET      `/order/my-orders/:id`          Authenticated
  PUT      `/order/my-orders/:id/status`   Authenticated
  PUT      `/order/payment/:id/status`     Authenticated
  GET      `/order/seller`                 Authenticated
  PUT      `/order/:id/cancel`             Authenticated

## Products

  Method   Endpoint                 Access
  -------- ------------------------ --------
  POST     `/product/create`        Seller
  DELETE   `/product/delete/:id`    Seller
  POST     `/product/update/:id`    Seller
  GET      `/product/seller`        Seller
  GET      `/product`               Public
  GET      `/product/:id`           Public
  GET      `/product/similar/:id`   Public

## Variants

  Method   Endpoint                               Access
  -------- -------------------------------------- ----------------------
  POST     `/variant/create/:productId`           Route-defined
  GET      `/variant/get-variants/:productId`     Public/route-defined
  PUT      `/variant/update-variant/:variantId`   Route-defined
  DELETE   `/variant/delete-variant/:variantId`   Route-defined

> The supplied route definition for variants does not include an
> authentication middleware. If these endpoints are intended to be
> seller-only, authorization should also be enforced at the backend
> route/controller level.

## Wishlist

  Method   Endpoint                 Access
  -------- ------------------------ ---------------
  GET      `/wishlist`              Authenticated
  POST     `/wishlist/:productId`   Authenticated
  DELETE   `/wishlist/:productId`   Authenticated

------------------------------------------------------------------------

# 🧭 Frontend Route Map

``` mermaid
flowchart TD
    ROOT["/"]

    ROOT --> HOME["Home"]
    ROOT --> SHOP["/shop"]
    ROOT --> PRODUCT["/shop/product/:id"]
    ROOT --> LOGIN["/login"]
    ROOT --> REGISTER["/register"]

    ROOT --> WISH["/wishlist"]
    ROOT --> CART["/cart"]
    ROOT --> SUCCESS["/order-success/:orderId"]

    ROOT --> PROFILE["/profile"]
    PROFILE --> ORDERS["orders"]
    PROFILE --> ACCOUNT["account"]
    ACCOUNT --> PROFILE_INFO["profile"]
    ACCOUNT --> ADDRESS["address"]
    PROFILE --> WISH_SECTION["wishlist"]

    ROOT --> ORDER_DETAIL["/profile/orders/:id"]

    ROOT --> SELLER["/seller"]
    SELLER --> SD["dashboard"]
    SELLER --> SA["analytics"]
    SELLER --> SO["orders"]
    SELLER --> SCP["create-product"]
    SELLER --> SP["products"]
    SELLER --> SPD["products/:id"]
```

------------------------------------------------------------------------

# 🔄 Complete Buyer-to-Seller Business Flow

``` mermaid
flowchart TD
    CUSTOMER["Customer"]

    CUSTOMER --> REGISTER["Register / Login"]
    REGISTER --> BROWSE["Browse Fashion Products"]

    BROWSE --> PRODUCT["View Product"]
    PRODUCT --> WISHLIST["Wishlist"]
    PRODUCT --> CART["Add to Cart"]

    CART --> ADDRESS["Choose Address"]
    ADDRESS --> CREATE_ORDER["Create Order"]
    CREATE_ORDER --> PAYMENT["Razorpay"]
    PAYMENT --> VERIFY["Backend Payment Verification"]

    VERIFY --> SUCCESS["Successful Order"]
    SUCCESS --> CUSTOMER_ORDERS["Customer Orders"]

    SELLER["Seller"] --> DASHBOARD["Seller Dashboard"]
    DASHBOARD --> CREATE_PRODUCT["Create Product"]
    CREATE_PRODUCT --> VARIANTS["Create Variants"]
    VARIANTS --> INVENTORY["Inventory"]

    INVENTORY --> STORE["Products Available"]
    STORE --> BROWSE

    CUSTOMER_ORDERS --> SELLER_ORDERS["Seller Order Management"]
    SELLER_ORDERS --> STATUS["Update Order Status"]
    STATUS --> CUSTOMER_ORDERS

    SELLER_ORDERS --> ANALYTICS["Analytics"]
```

------------------------------------------------------------------------

# 🧱 Data Model Overview

Based on the application's model structure:

``` mermaid
erDiagram
    USER ||--o{ ADDRESS : has
    USER ||--o{ CART : owns
    USER ||--o{ ORDER : places
    USER ||--o{ WISHLIST : owns

    PRODUCT ||--o{ VARIANT : contains
    USER ||--o{ PRODUCT : creates

    CART }o--o{ PRODUCT : contains
    ORDER }o--o{ PRODUCT : contains
    WISHLIST }o--o{ PRODUCT : contains

    USER {
        ObjectId _id
        string fullname
        string email
        string role
        string googleId
    }

    PRODUCT {
        ObjectId _id
        string name
        string description
        number price
        ObjectId seller
    }

    VARIANT {
        ObjectId _id
        ObjectId product
        string configuration
        number stock
    }

    ADDRESS {
        ObjectId _id
        ObjectId user
    }

    CART {
        ObjectId _id
        ObjectId user
    }

    ORDER {
        ObjectId _id
        ObjectId user
        string paymentStatus
        string orderStatus
    }

    WISHLIST {
        ObjectId _id
        ObjectId user
    }
```

> The diagram is a high-level relationship map based on the model files
> and route structure shown for the project. Exact fields and
> relationships should be read from the individual Mongoose schemas.

------------------------------------------------------------------------

# 📁 Technology Stack

### Frontend

-   React.js
-   React Router
-   Redux Toolkit
-   Tailwind CSS
-   Vite
-   JavaScript / JSX

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   JWT
-   Passport.js
-   Zod
-   Multer

### Infrastructure / Services

-   Redis
-   ImageKit
-   Razorpay
-   Email Service

### Development

-   Git
-   REST APIs
-   Feature-based architecture
-   Environment-based configuration

------------------------------------------------------------------------

# 🔌 External Services

``` mermaid
flowchart LR
    BACKEND["Express Backend"]

    BACKEND --> MONGO["MongoDB"]
    BACKEND --> REDIS["Redis"]
    BACKEND --> IMAGEKIT["ImageKit"]
    BACKEND --> RAZORPAY["Razorpay"]
    BACKEND --> EMAIL["Email Service"]
    BACKEND --> GOOGLE["Google OAuth"]
```

### MongoDB

Primary application database for users, products, variants, carts,
orders, addresses, and wishlists.

### Redis

Used through the project's Redis utilities/cache layer for backend
caching-related functionality.

### ImageKit

Used as external image storage for uploaded product/profile media.

### Razorpay

Used for the checkout/payment flow.

### Google OAuth

Used for social authentication.

### Email Service

Used for application emails such as authentication/account-related
communication.

------------------------------------------------------------------------

# 🔒 Security & Validation

The project includes multiple layers of backend protection:

``` text
Client Request
      ↓
Authentication Middleware
      ↓
Role Authorization
      ↓
Zod Validation
      ↓
Controller
      ↓
Service / DAO
      ↓
Database / External Service
```

Important mechanisms include:

-   JWT authentication
-   HTTP-only cookie authentication
-   Seller authorization
-   Request validation with Zod
-   File upload handling with Multer
-   Centralized error handling
-   Environment variables for configuration/secrets

------------------------------------------------------------------------

# 🧩 Why the Architecture Is Feature-Based

Instead of keeping all frontend components in one large directory, the
application separates domains:

``` text
Auth
Product
Cart
Wishlist
Orders
Profile
Address
Dashboard
```

Each feature can own its:

``` text
components
hooks
pages
services
state
validation
```

This makes it easier to:

-   Locate related code
-   Change one domain without touching unrelated features
-   Reuse domain-specific logic
-   Scale the frontend as features grow
-   Keep API and UI responsibilities separated

------------------------------------------------------------------------

# 🚀 Local Development

## 1. Clone the repository

``` bash
git clone <your-repository-url>
cd Snitch
```

## 2. Backend

``` bash
cd Backend
npm install
npm run dev
```

Configure the backend environment variables in:

``` text
Backend/.env
```

The exact environment variable names should match the project's
`config.js` implementation.

## 3. Frontend

``` bash
cd Frontend
npm install
npm run dev
```

Then open the Vite development URL shown in the terminal.

------------------------------------------------------------------------

# 🌐 Production Architecture

The application can be deployed with the frontend and backend as
separate services.

``` mermaid
flowchart TB
    USER["Browser"]

    FRONTEND["Frontend Deployment<br/>React + Vite"]
    BACKEND["Backend Deployment<br/>Node + Express"]

    MONGO[("MongoDB")]
    REDIS[("Redis")]
    IMAGEKIT["ImageKit"]
    RAZORPAY["Razorpay"]
    GOOGLE["Google OAuth"]
    EMAIL["Email Service"]

    USER --> FRONTEND
    FRONTEND --> BACKEND

    BACKEND --> MONGO
    BACKEND --> REDIS
    BACKEND --> IMAGEKIT
    BACKEND --> RAZORPAY
    BACKEND --> GOOGLE
    BACKEND --> EMAIL
```

------------------------------------------------------------------------

# 🧪 Project Development Approach

SNITCH was developed as a personal project with an emphasis on learning
how a complete product fits together.

The development process involved working across:

``` text
UI/UX
  ↓
Frontend Architecture
  ↓
API Design
  ↓
Authentication
  ↓
Database Modeling
  ↓
Business Logic
  ↓
External Services
  ↓
Payment Integration
  ↓
Seller Dashboard
  ↓
Analytics
  ↓
Deployment
  ↓
Debugging
```

The goal was not simply to build CRUD screens, but to understand how
frontend, backend, database, authentication, storage, payments, and
business workflows connect inside one application.

------------------------------------------------------------------------

# 📌 Project Structure at a Glance

``` text
SNITCH
│
├── Backend
│   ├── config
│   ├── controllers
│   ├── dao
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   ├── validators
│   ├── app.js
│   └── server.js
│
├── Frontend
│   └── src
│       ├── app
│       ├── assets
│       ├── features
│       │   ├── Auth
│       │   ├── Product
│       │   ├── cart
│       │   ├── wishlist
│       │   ├── orders
│       │   ├── profile
│       │   ├── address
│       │   └── Dashboard
│       └── main.jsx
│
└── README.md
```

------------------------------------------------------------------------

# 🎯 What I Learned

Building SNITCH helped me move from isolated tutorials toward thinking
about complete application systems.

Key areas I worked with:

-   Designing modular frontend architecture
-   Building REST APIs with Express
-   JWT-based authentication
-   Role-based authorization
-   Google OAuth integration
-   MongoDB data modeling
-   Backend validation with Zod
-   File upload and external storage
-   Payment gateway integration
-   Cart and order workflows
-   Seller-side product management
-   Inventory management
-   Dashboard analytics
-   Redux Toolkit state management
-   Redis-backed backend utilities
-   Debugging frontend/backend integration issues
-   Connecting multiple third-party services into one application

------------------------------------------------------------------------

# 👨‍💻 Project Status

SNITCH is a **personal full-stack e-commerce project**, not a SaaS
product.

The project is intended to demonstrate practical full-stack development,
architecture, integration, and problem-solving skills through a complete
buyer and seller workflow.

------------------------------------------------------------------------

## ⭐ Author

**Aman Sahu**

Built with React, Node.js, MongoDB, and a lot of debugging sessions. ☕
