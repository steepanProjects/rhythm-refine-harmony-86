# HarmonyLearn - Music Education Platform

## Overview

HarmonyLearn is a comprehensive music education platform enabling students to learn from expert mentors through interactive courses, live sessions, and community features. It supports multiple user roles (students, mentors, admins) with classroom management, payment processing, and analytics capabilities, aiming to provide a modern, full-stack learning experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite.
- **Styling**: Tailwind CSS with shadcn/ui and Radix UI.
- **State Management**: React Query.
- **Routing**: Wouter for client-side routing.
- **Theme System**: next-themes for dark/light mode.

### Backend Architecture
- **Runtime**: Node.js with Express.js.
- **Database**: PostgreSQL with Drizzle ORM.
- **Authentication**: Session-based authentication.
- **API**: RESTful API structure (`/api` prefix).

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect.
- **Database**: PostgreSQL with schema for users, courses, classrooms, enrollments, classroom_memberships, live_sessions, and posts.
- **Storage Layer**: `server/storage.ts` for CRUD operations.
- **API Routes**: RESTful endpoints in `server/routes.ts`.

### Key Features
- **User Management**: Multiple user roles (Students, Mentors, Admins) with role-based authentication, dedicated portals, and profile management.
- **Course System**: Categories (Piano, Guitar, etc.), learning paths, interactive content, and mentor integration.
- **Live Sessions**: Real-time classes with video conferencing, chat, and session management.
- **Classroom Hub**: Multi-role access for content management, progress tracking, and AI features.
- **Community Features**: Social learning, practice tools (Metronome, Tuner, Scale Trainer), and gamification.
- **Student Portal**: Dashboard with stats, course management, progress analytics, live sessions, and achievement system.
- **Mentor Portal**: Analytics, course creation, student management, and live teaching tools.
- **Administrative Panel**: User management, mentor application review, content moderation, and analytics.

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL hosting (`@neondatabase/serverless`).

### UI/UX Libraries
- **Radix UI**: Component primitives.
- **Tailwind CSS**: Utility-first styling framework.
- **shadcn/ui**: Component library.

### Development Tools
- **TypeScript**: Type safety.
- **ESBuild**: Fast JavaScript bundling.
- **Vite**: Development server with hot module replacement.

### Form Handling
- **React Hook Form**: Form state management.
- **Zod**: Schema validation.

## Recent Changes

- **August 1, 2025**: Fixed mentor authentication and login flow
  - Resolved inconsistent localStorage authentication data storage between MentorSignIn and auth.ts utilities
  - Updated both MentorSignIn.tsx and StudentSignIn.tsx to use centralized authentication system
  - Fixed MentorPage.tsx to check authentication state correctly using currentUser instead of userRole
  - Synchronized all authentication components to use consistent localStorage keys and data format
  - Added proper login event dispatching for auth state management across components
- **August 1, 2025**: Enhanced all main pages with demo preview functionality
  - Converted Community, Tools, and Courses pages to demo mode with subtle gradient overlays
  - Removed explicit "demo" language while maintaining sign-in prompts for all interactions
  - Added welcome banners with engaging copy that encourages user engagement
  - Implemented gradient fade effects that give pages a preview feel without explicitly stating it's a demo
  - Enhanced user experience with consistent authentication flow across all main pages
- **August 1, 2025**: Implemented comprehensive route-based authentication and authorization system with automatic portal enforcement