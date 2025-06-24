# 🌍 PlanetScribbles

[Live Demo](https://planetscribbles.onrender.com/) • [GitHub Repo](https://github.com/fareesaM/planetScribbles)

## 🚀 Overview

PlanetScribbles is a full-stack ecommerce platform built using the MERN stack, tailored for selling books, merchandise, and event tickets. It features user authentication, secure payments, inventory management, admin dashboards, and seamless frontend integration—all hosted live on Render.

This project showcases real-world experience with:
- React, Redux, Tailwind CSS (frontend)
- Node.js, Express, MongoDB, Mongoose (backend)
- Stripe for payment processing
- JWT-based authentication & role-based (admin/user) access control
- RESTful API design with protected routes
- CI/CD deployment using Render

---

## 🧩 Key Features

- **User Authentication & Authorization**  
  Secure registration and login via JWT; admin-only routes for inventory and order management.

- **Product & Ticket Catalog**  
  Browse, search, and paginate books, merch, and events; each item displays detailed info.

- **Cart & Checkout**  
  Add items to cart, adjust quantities, and pay via Stripe integration.

- **Order Management**  
  Users view past orders; Admins can update order status (paid/delivered).

- **Admin Dashboard**  
  Accessible to admin users only; CRUD operations on products and events.

- **Responsive UI**  
  Built with Tailwind CSS and React Router for smooth, mobile-friendly navigation.

---

## 📂 Project Structure

```text
planetScribbles/
│
├── backend/
│   ├── config/      # Environment and DB setup
│   ├── controllers/ # Route logic (auth, products, events, orders)
│   ├── middleware/  # Error handling, auth & role-based protection
│   ├── models/      # Mongoose schemas: User, Product, Event, Order
│   └── routes/      # Express route definitions
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Shared components: Header, Footer, Forms
│   │   ├── pages/       # Route-based views: Home, Product, Cart, etc.
│   │   ├── redux/       # Actions, reducers, store
│   │   └── utils/       # API calls, constants
│   └── public/          # Static assets
│
├── .env.example        # Environment variable template
├── package.json        # Scripts and dependencies
└── README.md           # ← You’re here
