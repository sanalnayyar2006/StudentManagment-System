# Student Management System — Technical Documentation

## Executive Overview
This document provides a comprehensive technical overview of the backend built for the **Student Management System**. It outlines the features completed to date, system architecture, initial implementation challenges, security hardening, and performance optimizations.

---

## 1. Features Built to Date

### Primary Feature: Authentication & Session System (`/api/auth`)
A production-grade, secure, stateless & cookie-based authentication system supporting user registration, login, session validation, and logout.

#### Endpoints:
* `POST /api/auth/register` — Public registration for new user accounts.
* `POST /api/auth/login` — Authenticates user credentials and issues a secure `httpOnly` JWT session cookie.
* `POST /api/auth/logout` — Revokes the active session cookie.
* `GET /api/auth/me` — Protected endpoint returning currently authenticated user details.

---

## 2. System Architecture & How It Was Built

The application strictly implements **Layered Architecture (N-Tier Architecture)** combined with the **Repository Pattern** and **Express Middleware Pipeline**:

```
[ HTTP Client ]
      │
      ▼
[ Express Middleware Pipeline ] ──> CORS, Cookie Parser, JSON Body Parser, Rate Limiters
      │
      ▼
[ Zod Validation Layer ]        ──> Runtime payload validation & sanitization
      │
      ▼
[ Router Layer ]               ──> auth.route.ts
      │
      ▼
[ Controller Layer ]           ──> auth.controller.ts (Express req/res handling & HTTP Cookies)
      │
      ▼
[ Service Layer ]              ──> auth.service.ts (Business rules, Bcrypt hashing, JWT generation)
      │
      ▼
[ Repository Layer ]           ──> auth.repository.ts (Data access abstraction)
      │
      ▼
[ Database Layer ]             ──> Prisma ORM & SQLite Database (schema.prisma)
```

---

## 3. Step-by-Step Layer Implementation

### A. Database & Schema Design (`prisma/schema.prisma`)
* Configured SQLite database with Prisma ORM.
* Created the `User` model with fields: `id` (UUID), `email` (unique index), `hashedPassword`, `role` (default: `"ADMIN"`), `createdAt`, and `updatedAt`.
* Designed domain models for future feature phases: `School`, `Student`, `StudentProfile`, `StudentClass`, `GovRequiredDetails`, `PreviousAcademicRecord`, `ScholarShipDetails`, and `FacilitesProvided`.

### B. Data Access Abstraction (`src/repositories/auth.repository.ts`)
* Built `AuthRepository` class encapsulating Prisma query calls:
  - `findByEmail(email)`
  - `findById(id)`
  - `create(data)`
* **Why**: Keeps database-specific ORM code completely separated from core business rules.

### C. Business Logic Layer (`src/services/auth.service.ts`)
* Handled account creation, password verification via `bcrypt`, and JWT token generation using `jsonwebtoken`.
* Created standard TypeScript interfaces for input payloads and authentication responses.

### D. Custom Error Handling (`src/errors/app.error.js`)
* Implemented custom `AppError` class inheriting from `Error` to handle operational errors with explicit HTTP status codes (400, 401, 404, etc.).

### E. Controller & Cookie Delivery (`src/controllers/auth.controller.ts`)
* Intercepts valid user actions and sets JWT inside secure HTTP cookies (`httpOnly: true`, `sameSite: "strict"`).
* Manages session termination via `res.clearCookie("token")`.

### F. Validation & Route Hardening (`src/routes/auth.route.ts`)
* Integrated **Zod** schema validation to fail fast on malformed requests before entering controller/service logic.

---

## 4. Problems Faced Post-Initial Build & How They Were Solved

### Problem 1: Privilege Escalation in Public Registration
* **Initial Issue**: The original Zod schema accepted `role` from `req.body` (`role: z.string().optional()`). Any anonymous user calling `POST /register` could send `{ "role": "ADMIN" }` or `{ "role": "SUPERADMIN" }` to grant themselves root privileges.
* **Resolution**: Removed `role` from `registerSchema`. Public registration strictly forces the service layer to assign default roles.

### Problem 2: Vulnerable JWT Exposure (LocalStorage vs Cookies)
* **Initial Issue**: Tokens were originally returned in raw JSON response bodies, encouraging client applications to store JWTs in browser `localStorage` (vulnerable to **XSS - Cross-Site Scripting** attacks).
* **Resolution**: Integrated `cookie-parser` and updated `auth.controller.ts` to attach JWTs via `httpOnly`, `sameSite: "strict"`, `secure` cookies. Scripts cannot read `httpOnly` cookies.

### Problem 3: Unhandled Async Rejections & Process Crashing
* **Initial Issue**: Async exceptions thrown inside service methods (e.g. `throw new AppError("User already exists", 400)`) were unhandled by default Express 4 async controllers, risking process crashes or hung requests.
* **Resolution**: Introduced `AppError` and centralized error middleware in `app.ts` to cleanly catch and return formatted JSON error messages to clients.

---

## 5. Security & Performance Optimizations Applied

1. **Rate Limiting (`express-rate-limit`)**:
   - Implemented `loginLimiter`: Max 10 login attempts per 15 minutes per IP to prevent brute-force credential stuffing.
   - Implemented `registerLimiter`: Max 3 account registrations per 60 minutes per IP to mitigate spam account creation.
2. **Brute Force & Side-Channel Defense**:
   - `bcrypt` hashing with salt rounds (cost factor 10) for constant-time password comparisons.
3. **CORS Configuration**:
   - Configured `cors({ origin: true, credentials: true })` to allow secure cookie transmission across origins during development and production.
4. **Environment Isolation (`src/config/env.ts`)**:
   - Centralized environment parsing with fallback defaults for local development.

---

## 6. Verification & Current Status

* **Authentication API**: Fully functional & verified (`/register`, `/login`, `/logout`, `/me`).
* **Git Status**: Cleaned up legacy build artifacts (`.d.ts` and `.js.map` files) and pushed to remote branch `main`.
* **Dev Server**: Active and running without compilation errors.
