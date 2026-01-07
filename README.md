# Secure Notes Backend API

A production-style Notes Management backend built with Node.js, Express, and MongoDB.  
Implements JWT-based authentication, ownership-level authorization, and secure CRUD APIs.

---

## 🚀 Features

- JWT-based authentication
- Protected routes using middleware
- Ownership-based access control
- Secure CRUD operations for notes
- Pagination support
- Centralized error handling
- Clean modular architecture

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- dotenv

---

## 📂 API Endpoints
- POST /api/notes → Create note
- GET /api/notes → Get my notes (paginated)
- GET /api/notes/:id → Get single note
- PUT /api/notes/:id → Update note
- DELETE /api/notes/:id → Delete note


---

## 🔐 Security Design

- All routes are JWT-protected
- Notes are user-owned resources
- Only owners can read/update/delete their notes
- Resource-level authorization enforced at controller level

---

## 📌 Purpose

This project was built to demonstrate real-world backend engineering concepts such as authentication, authorization, ownership enforcement, pagination, and clean API design.
