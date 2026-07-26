# MMPS ERP Student Management Portal

An realtime-sync, responsive, and pixel-perfect enterprise resource planning (ERP) Student Management Dashboard built with React, Vite, Tailwind CSS, and TypeScript. The application provides administrators with a comprehensive overview of school metrics, fee collection statistics, operational logs, and quick action flows.

---

## 🚀 Tech Stack

The application leverages a modern frontend architecture built for speed, type safety, and scalability:

- **Core Framework:** [React 19](https://react.dev/)
- **Build Tool & Dev Server:** [Vite 6](https://vite.dev/)
- **Programming Language:** [TypeScript](https://www.typescriptlang.org/) (Strictly typed)
- **Styling Engine:** [Tailwind CSS v3](https://tailwindcss.com/)
- **State Management & Querying:** [TanStack React Query v5](https://tanstack.com/query/latest) (For optimized data fetching and caching)
- **Routing:** [React Router DOM v6](https://reactrouter.com/en/main)
- **Component Primitives:** [Radix UI](https://www.radix-ui.com/) (Accessible base primitives)
- **Iconography:** [Lucide React](https://lucide.dev/) (icons)

---

## 📂 Project Structure & Navigation Map

Here is the organization of the codebase:

```bash
StudentManagement/
├── design/                 # High-fidelity design mockups and UI targets
│   ├── Dashboard.png       # Target layout for the main administrator dashboard
│   ├── Login.png           # Target layout for authentication
│   └── StudentsList.png    # Target layout for the student directory
├── public/                 # Static assets (favicons, logos)
├── src/
│   ├── components/
│   │   └── ui/             # Accessible, atomic design UI components (shadcn-like primitives)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── table.tsx
│   ├── lib/                # Utility configurations (e.g., tailwind merge helpers)
│   ├── pages/              # Page view components (corresponds to routes)
│   │   ├── Dashboard.tsx   # Pixel-perfect admin dashboard view (Matches design/Dashboard.png)
│   │   ├── Login.tsx       # User login page
│   │   └── Signup.tsx      # User registration page
│   ├── services/           # Data & API abstraction layer (using TanStack Query hooks)
│   │   ├── auth.service.ts      # Authentication logic and mock APIs
│   │   └── dashboard.service.ts # Dashboard KPIs, recent collections, and logs mock services
│   ├── App.tsx             # Main routing registry and App Providers setup
│   ├── index.css           # Global Tailwind directive definitions
│   └── main.tsx            # React application entry point
├── eslint.config.ts        # ESLint flat configuration for static code analysis
├── postcss.config.js       # PostCSS Tailwind pre-processing directives
├── tailwind.config.ts      # Design tokens (colors, layout rules, spacing overrides)
├── tsconfig.json           # Compiler rules for TypeScript
└── vite.config.ts          # Build bundler configurations and path aliases
```

---

## ✨ Features Implemented

1. **Pixel-Perfect Dashboard (`/dashboard`):**
   - Replicated exact visual hierarchy from `design/Dashboard.png` including alignment, colors, typography, and spacing.
   - Built a sleek, fixed-width **left sidebar navigation** with consistent brand headers, active/inactive indicator states, profile controls, and a custom logout flow.
   - Designed a **top utility bar** housing global search, notification controls with indicator badges, and the current academic term pill.
   - Placed a responsive **4-column KPI section** displaying critical parameters: Total Students, Fees Collected, Staff Attendance, and Pending Dues (with color-coded trend indicators).
   - Structured a split bottom layout:
     - **Recent Fee Collections:** Column-aligned tabular listing showing receipt IDs, standard levels, payment methods, transaction amounts, and custom validation status pills.
     - **Quick Actions Grid:** 2x2 modular directory linking shortcut actions like adding students, collecting fees, generating reports, and sending notifications.
     - **Operational Logs:** Timeline layout showing chronological logs tagged by authority details and contextual color anchors.
2. **TanStack React Query Integration:**
   - Asynchronous query cache handlers loaded in `src/pages/Dashboard.tsx` to handle loading/error indicators smoothly.
3. **Enterprise UI Primitives:**
   - Created modular, reusable, type-safe components under `src/components/ui` to guarantee structural consistency.

---

## 💻 Local Setup & Execution Guide

Follow these steps to run the project on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18+ recommended) and npm installed.

### 1. Clone & Enter Directory
```bash
git clone <repository-url>
cd StudentManagement
```

### 2. Install Dependencies
Install all package dependencies defined in the project:
```bash
npm install
```

### 3. Run Development Server
Spin up the local Vite hot-reloading development server:
```bash
npm run dev
```
Once started, open your browser and navigate to the local address displayed (typically **`http://localhost:5173`**).

### 4. Build for Production
To bundle and compile the application with full TypeScript check:
```bash
npm run build
```
This produces production-ready static assets in the `dist/` directory, which can be run locally using `npm run preview`.
