
  # ERP System for SMEs (Community)

  A comprehensive ERP (Enterprise Resource Planning) system designed for Small and Medium Enterprises, built with React, TypeScript, and Supabase.

  ## Features

  - 🔐 **Authentication & Authorization** - Role-based access control with 8 user roles
  - 📊 **Dashboard** - Real-time business metrics and analytics
  - 💰 **Accounting** - Complete financial management
  - 📦 **Inventory** - Stock and order management
  - 💼 **Payroll** - Employee and payroll management
  - 📄 **Tax Compliance** - GST and TDS management
  - ⚡ **Quick Actions** - Fast invoicing and billing

  ## Quick Start

  ### 1. Install Dependencies

  ```bash
  npm install
  ```

  ### 2. Configure Environment Variables

  Copy the example environment file and update with your Supabase credentials:

  ```bash
  cp .env.example .env
  ```

  Edit `.env` and add your Supabase credentials. See [Environment Setup Guide](docs/ENVIRONMENT_SETUP.md) for details.

  ### 3. Seed Demo Users (Optional)

  Create demo users for testing:

  ```bash
  npm run seed
  ```

  This creates 7 test users with different roles. See credentials in the output.

  ### 4. Start Development Server

  ```bash
  npm run dev
  ```

  Or seed users and start server in one command:

  ```bash
  npm run dev:seed
  ```

  The app will be available at `http://localhost:3001/`

  ## Available Scripts

  | Command | Description |
  |---------|-------------|
  | `npm run dev` | Start development server |
  | `npm run build` | Build for production |
  | `npm run seed` | Seed database with demo users |
  | `npm run dev:seed` | Seed users and start dev server |

  ## Demo Credentials

  After running `npm run seed`, you can login with:

  | Email | Password | Role |
  |-------|----------|------|
  | admin@company.com | admin123 | Super Admin |
  | manager@company.com | manager123 | Manager |
  | accountant@company.com | accountant123 | Accountant |
  | inventory@company.com | inventory123 | Inventory Manager |
  | hr@company.com | hr123 | HR Manager |
  | sales@company.com | sales123 | Sales |
  | viewer@company.com | viewer123 | Viewer |

  ## Documentation

  - [Environment Setup](docs/ENVIRONMENT_SETUP.md) - Configure environment variables
  - [Authentication Guide](src/docs/AUTHENTICATION.md) - User authentication and roles
  - [Project Structure](src/docs/STRUCTURE.md) - Codebase organization
  - [Quick Reference](src/docs/QUICK_REFERENCE.md) - Common patterns and utilities

  ## Tech Stack

  - **Frontend**: React 18 + TypeScript + Vite
  - **UI Library**: shadcn/ui + Radix UI + Tailwind CSS
  - **Backend**: Supabase (Auth + Database)
  - **Server**: Hono (Edge Functions)
  - **State Management**: React Context
  - **Animations**: Motion (Framer Motion)

  ## Project Information

  Original design: https://www.figma.com/design/kQazZBnSc4qeqODKChmcxy/ERP-System-for-SMEs--Community-

  ## License

  Community Edition
