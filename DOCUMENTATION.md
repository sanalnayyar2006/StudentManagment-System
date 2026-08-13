# Student Management System — Technical Documentation

## Executive Overview
This document provides a comprehensive technical overview of the full-stack **Student Management System**. It details the features completed to date, full-stack system architecture, database schema migrations, security hardening, frontend & backend integration, and step-by-step layer implementations.

---

## 1. Features Built to Date

### Feature A: Authentication & Session System (`/api/auth`)
A production-grade, secure, stateless & cookie-based authentication system supporting user registration, login, session validation, and logout.

#### Endpoints:
* `POST /api/auth/register` — Public registration for new user accounts.
* `POST /api/auth/login` — Authenticates user credentials and issues a secure `httpOnly` JWT session cookie.
* `POST /api/auth/logout` — Revokes the active session cookie.
* `GET /api/auth/me` — Protected endpoint returning currently authenticated user details.

### Feature B: Student Management & Enrollment System (`/api/students`)
A complete student lifecycle and record management system supporting creation, listing, detail viewing, and profile updates.

#### Core Frontend & API Capabilities:
* **Add Student Portal (`AddStudent.tsx`)**: Full multi-section enrollment form covering personal info, government details, academic history, scholarship info, and school facilities.
* **Student Directory (`Students.tsx`)**: Interactive listing view with search, status filtering, and navigation to detailed profiles.
* **Student Service (`student.service.ts`)**: Modular HTTP service layer connecting client UI to backend REST APIs with full credentials and type safety.
* **Route Protection (`AuthGuard.tsx`)**: High-order client component guarding protected application routes against unauthenticated access.

---

## 2. System Architecture & Component Flow

The application combines a **Layered Architecture (N-Tier Architecture)** Express backend with a modern **React + Vite Frontend**:

```
[ Client Browser (React + Vite) ]
      │
      ├──> Router (App.tsx) ──> AuthGuard Protection
      │
      ├──> Service Layer (auth.service.ts, student.service.ts)
      │
      ▼ (HTTP / REST + HTTP-Only Cookies via Vite Proxy)
[ Express Backend Pipeline ] ──> CORS, Cookie Parser, Rate Limiters
      │
      ▼
[ Zod Validation Layer ]     ──> Request Payload Sanitization
      │
      ▼
[ Express Controllers ]     ──> req/res & Cookie Management
      │
      ▼
[ Service Layer ]           ──> Business Logic & Hashing
      │
      ▼
[ Repository Layer ]        ──> Prisma ORM Abstraction
      │
      ▼
[ SQLite Database ]          ──> school.db (Migrated Schema)
```

---

## 3. Step-by-Step Layer Implementation

### A. Database & Schema Design (`backend/prisma/schema.prisma`)
* **ORM & DB**: Configured SQLite with Prisma ORM (`backend/database/school.db`).
* **User Model**: `id` (UUID), `email` (unique index), `hashedPassword`, `role` (`ADMIN`), `createdAt`, `updatedAt`.
* **Domain Models**:
  - `Student`: Core record linking to profiles and relational details.
  - `StudentProfile`: Personal demographic information (DOB, Gender, Contact, Address, Photo).
  - `GovRequiredDetails`: Aadhaar Number, APAAR ID, PEN Number, Bank details.
  - `PreviousAcademicRecord`: Previous school name, last grade passed, TC details.
  - `ScholarShipDetails`: Financial aid records, scheme names, sanction IDs.
  - `FacilitesProvided`: Facilities provided to student (Transport, Hostel, Books, Meals).
* **Migrations**: Executed migration `20260808184754_updated_fields` to apply updated schema fields and relational constraints.

### B. Backend Data & Auth Pipeline
* **Repositories**: Encapsulated database queries (`auth.repository.ts`, etc.) away from services.
* **Services**: Encapsulated business rules, password verification via `bcrypt`, and JWT generation via `jsonwebtoken`.
* **Controllers & Error Handling**: Custom `AppError` class with HTTP status mapping. `auth.controller.ts` attached tokens via secure `httpOnly` cookies.
* **Routes & Validation**: Fast request rejection using **Zod** schema validation.

### C. Frontend Service Layer (`src/services/`)
* **`auth.service.ts`**: Handles login, signup, session checking (`/api/auth/me`), and logout calls with `credentials: 'include'`.
* **`student.service.ts`**: API methods for creating students (`createStudent`), retrieving student lists (`getAllStudents`), fetching individual profile details (`getStudentById`), and updating profiles (`updateStudent`).

### D. Frontend Routing & Route Protection (`src/components/AuthGuard.tsx` & `src/App.tsx`)
* Implemented `AuthGuard` component wrapping protected routes (`/dashboard`, `/students`, `/students/add`, `/profile`, etc.).
* Automatically redirects unauthenticated users to `/login` while preserving attempted navigation.
* Wired Vite development server proxy (`vite.config.ts`) to forward `/api` calls seamlessly to backend server port.

### E. Add Student & Profile Management (`src/pages/AddStudent.tsx`)
* Built a comprehensive multi-section form enabling administrators to input:
  1. **Personal Information**: Full Name, DOB, Gender, Category, Religion, Contact Info, Address.
  2. **Government Identifiers**: Aadhaar, APAAR ID, PEN Number, Bank Details.
  3. **Academic History**: Previous School, Grade Passed, Transfer Certificate details.
  4. **Scholarship Info**: Scholarship name, amount, sanction details.
  5. **Provided Facilities**: Checkboxes for hostel, transport, textbooks, uniforms, midday meals.
* Implemented submit state management, live error feedback, and automatic redirection to student list on success.

---

## 4. Database Migrations & Schema Refinements

* Added required inputs and field defaults across `StudentProfile`, `GovRequiredDetails`, `PreviousAcademicRecord`, and `ScholarShipDetails`.
* Updated Prisma configuration and generated fresh Prisma Client artifacts.
* Created and applied SQL migration `20260808184754_updated_fields` to sync SQLite database state.

---

## 5. Problems Faced & How They Were Solved

### Problem 1: Privilege Escalation in Public Registration
* **Issue**: Public registration schema previously accepted `role` from request body.
* **Resolution**: Removed `role` from registration schema; strictly defaulted to standard roles in service layer.

### Problem 2: Vulnerable JWT Exposure (LocalStorage vs Cookies)
* **Issue**: Exposing raw JWTs in response JSON risks XSS token theft.
* **Resolution**: Configured backend `auth.controller.ts` to transmit JWTs in secure, `httpOnly`, `sameSite: "strict"` cookies. Configured frontend fetch requests with `credentials: 'include'`.

### Problem 3: Route Access by Unauthenticated Users
* **Issue**: Direct navigation to `/students` or `/students/add` was accessible without valid auth session.
* **Resolution**: Created `AuthGuard` component that checks session state via `authService.getCurrentUser()` and redirects unauthorized users to `/login`.

### Problem 4: Form Data Structure Mismatch on Student Creation
* **Issue**: Complex nested database relations required precise matching between frontend form input structures and Prisma relational payloads.
* **Resolution**: Standardized payload interfaces in `student.service.ts` and structured state handling in `AddStudent.tsx` to match backend expectations.

---

## 6. Security & Performance Optimizations Applied

1. **Rate Limiting (`express-rate-limit`)**:
   - `loginLimiter`: Max 10 attempts per 15 minutes per IP.
   - `registerLimiter`: Max 3 account registrations per hour per IP.
2. **Brute Force & Side-Channel Defense**:
   - `bcrypt` hashing with salt rounds (cost factor 10) for constant-time password comparison.
3. **CORS & Credentials Security**:
   - Configured `cors({ origin: true, credentials: true })` and Vite proxy to support secure cross-origin HTTP-only cookie passing.
4. **Environment Isolation (`src/config/env.ts`)**:
   - Centralized environment parsing with clean fallback defaults.

---

## 7. Verification & Current Status

* **Backend Services**: Verified `/api/auth` endpoints and Prisma database connection.
* **Frontend Application**: Vite dev server active and compiling cleanly (`npm run dev`).
* **Route Protection**: `AuthGuard` verified working across all protected routes.
* **Add Student Feature**: Tested multi-section form workflow and student service integration.
* **Git Repository**: All updates committed and pushed to `main` branch (`ce2725afd7bbf6265624ae3a5a7ecc5d37bfc96f`).
