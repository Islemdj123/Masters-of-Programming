# Masters of Programming - University Club Website

## Overview

This is a full-stack web application for the "Masters of Programming" university club at University Abbas Laghrour Khenchela. The application serves as the club's digital presence, featuring information about founders, administration, members, projects, and providing membership application functionality. Built with a modern stack including React, Express, and PostgreSQL with Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & UI**: React-based single-page application using Vite as the build tool and development server. The UI is built with shadcn/ui components (New York style variant) on top of Radix UI primitives, styled with Tailwind CSS v4.

**Routing**: Client-side routing implemented with Wouter, providing navigation between pages (Home, Founders, Administration, Members, Projects, Join, Contact, Login, Dashboard).

**State Management**: TanStack Query (React Query) handles server state management, data fetching, and caching. Form state is managed with React Hook Form and validated using Zod schemas.

**Component Structure**: 
- Reusable UI components in `client/src/components/ui/` following shadcn/ui patterns
- Custom feature components like `MemberCard`, `ProjectCard`, `JoinForm`, and `Navbar` in `client/src/components/`
- Page components in `client/src/pages/` for each route

**Styling Approach**: Utility-first CSS with Tailwind, CSS variables for theming, custom animations, and responsive design patterns. The application uses a neutral color scheme with primary/secondary accent colors.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript. The application uses ES modules (`"type": "module"`) throughout.

**Development vs Production**: 
- Development mode (`index-dev.ts`) integrates Vite middleware for HMR and serves the client directly
- Production mode (`index-prod.ts`) serves pre-built static assets from the `dist/public` directory
- Both modes share the same Express app configuration and routes defined in `app.ts`

**API Design**: RESTful API endpoints following the pattern `/api/{resource}` with standard CRUD operations:
- GET for fetching collections and individual items
- POST for creating new records
- PUT for updating existing records
- DELETE for removing records

**Request Processing**: JSON body parsing with raw body preservation for webhook scenarios, URL-encoded form data support, and comprehensive request/response logging middleware.

**Authentication**: Simple session-based authentication using localStorage on the client side. The login system uses hardcoded credentials (admin/admin) intended for demonstration. Session management uses `connect-pg-simple` for PostgreSQL-backed sessions.

### Data Layer

**Database**: PostgreSQL database accessed via Neon serverless driver, configured through the `DATABASE_URL` environment variable.

**ORM**: Drizzle ORM provides type-safe database access with schema definition in TypeScript. Database migrations are managed in the `migrations/` directory.

**Schema Design**: The database includes the following tables:
- `users`: Admin authentication (id, username, password)
- `founders`: Club founding members (id, fullName, role, photoUrl, description, createdAt)
- `administration`: Current administration team (id, fullName, role, department, photoUrl, description, createdAt)
- `members`: General club members (id, fullName, specialty, studyYear, photoUrl, createdAt)
- `projects`: Club projects and activities (id, title, date, description, bannerUrl, createdAt)
- `joinRequests`: Membership applications (id, fullName, email, phone, fieldOfStudy, studyYear, motivation, status, createdAt)

**Data Validation**: Zod schemas derived from Drizzle table definitions ensure type safety and runtime validation across the full stack. Schemas are shared between client and server via the `shared/` directory.

**Storage Abstraction**: The `IStorage` interface in `server/storage.ts` defines all database operations, providing a clear contract for data access and making the codebase more maintainable and testable.

**Database Seeding**: Automatic database seeding on application startup checks for existing data before populating initial records. Seeding runs asynchronously to avoid blocking server startup.

### Project Structure

**Monorepo Layout**: The codebase uses a monorepo structure with clear separation:
- `client/` - Frontend React application
- `server/` - Backend Express application  
- `shared/` - Shared TypeScript code (schemas, types)
- `attached_assets/` - Static assets and documentation

**Path Aliases**: TypeScript path mapping enables clean imports:
- `@/` maps to `client/src/`
- `@shared/` maps to `shared/`
- `@assets/` maps to `attached_assets/`

**Build Process**: 
- Client builds with Vite to `dist/public/`
- Server bundles with esbuild to `dist/index.js`
- Production deployment runs the bundled server which serves static client assets

## External Dependencies

### Core Framework Dependencies
- **React 18**: UI library with hooks and concurrent features
- **Express**: Node.js web application framework
- **Vite**: Frontend build tool and development server
- **Drizzle ORM**: TypeScript ORM for PostgreSQL

### Database & Storage
- **@neondatabase/serverless**: PostgreSQL driver for Neon serverless database
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI Component Libraries
- **Radix UI**: Headless UI components providing accessibility and behavior
  - Includes 25+ component primitives (Dialog, Dropdown, Select, Tabs, Toast, etc.)
- **shadcn/ui**: Pre-styled components built on Radix UI
- **Lucide React**: Icon library

### Form Handling & Validation
- **React Hook Form**: Performant form state management
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Validation resolver for React Hook Form + Zod integration
- **drizzle-zod**: Generate Zod schemas from Drizzle tables

### Styling & UI Utilities
- **Tailwind CSS v4**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant styling
- **clsx & tailwind-merge**: Conditional class name utilities
- **embla-carousel-react**: Carousel/slider component

### Data Fetching & State
- **TanStack Query**: Server state management, caching, and synchronization

### Development Tools
- **Wouter**: Lightweight routing library
- **tsx**: TypeScript execution for Node.js
- **@replit/vite-plugin-***: Replit-specific development plugins for error handling, cartographer, and dev banner

### Routing
- **Wouter**: Minimalist client-side router chosen for its simplicity and small bundle size compared to React Router