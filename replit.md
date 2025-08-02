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
- **User Management**: Multiple user roles (Students, Mentors, Masters, Admins) with role-based authentication, dedicated portals, and profile management.
- **Course System**: Categories (Piano, Guitar, etc.), learning paths, interactive content, and mentor integration.
- **Live Sessions**: Real-time classes with video conferencing, chat, and session management.
- **Classroom Hub**: Multi-role access for content management, progress tracking, and AI features.
- **Community Features**: Social learning, practice tools (Metronome, Tuner, Scale Trainer), and gamification.
- **Student Portal**: Dashboard with stats, course management, progress analytics, live sessions, and achievement system.
- **Mentor Portal**: Analytics, course creation, student management, and live teaching tools.
- **Master Role System**: Enhanced mentor role with classroom creation privileges and advanced features.
- **Administrative Panel**: User management, mentor application review, master role request management, content moderation, and analytics.

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

- **August 2, 2025**: Transitioned to one-academy-per-master model with enhanced customization
  - Removed all demo classroom data to start fresh with real academy creation
  - Updated master dashboard to enforce single academy creation per master user
  - Fixed staff requests API endpoint from `/api/staff-requests/pending` to `/api/staff-requests?status=pending`
  - Enhanced academy browser functionality for mentors to discover available academies
  - Updated mentor navigation to include "Browse Academies" and "Staff Applications" options
  - Streamlined academy creation process with comprehensive form for branding and curriculum
  - Implemented academy landing pages with shareable links for student enrollment
  - Masters can now create one personalized academy with custom instruments, colors, and content

- **August 2, 2025**: Implemented comprehensive role-based classroom management system
  - Restructured classroom navigation to only appear for approved masters in master dashboard
  - Created complete staff request database schema and API endpoints for mentor-to-classroom staff applications
  - Built MasterDashboard with classroom creation, management, and staff request approval functionality
  - Developed ClassroomStaff page for mentors to browse classrooms and request to join as staff members
  - Added comprehensive staff request workflow with pending/approved/rejected status management
  - Enhanced classroom creation form with proper field validation (title, description, subject, level, maxStudents)
  - Integrated staff request management into master dashboard with real-time notifications and approval actions
  - Updated mentor navigation to include "Classroom Staff" option for discovering staff opportunities
  - Created sample classroom data for testing with advanced piano, guitar, jazz, and theory classrooms
  - Implemented role-based authorization where masters create classrooms and approve mentor staff requests
  - Added visual status indicators and request history tracking for mentors applying to classroom positions

- **August 2, 2025**: Implemented complete master role progression system
  - Added master_role_requests table to database schema for mentor-to-master role advancement
  - Created comprehensive backend API with storage methods and routes for master role request management
  - Built MasterRoleRequestForm component for mentors to apply for master status with detailed information
  - Developed MasterRoleRequestStatus component showing current application status with real-time updates
  - Created MasterRoleRequestManager admin component for reviewing and approving master role applications
  - Enhanced MentorDashboard with master role request functionality and master dashboard navigation
  - Built dedicated MasterDashboard with classroom creation, management tools, and enhanced mentor features
  - Added master role authentication checks (isMaster, canCreateClassrooms) in auth system
  - Created MasterRoute protected component for master-only access with appropriate error handling
  - Integrated master role request management into AdminPanel with dedicated tab and approval workflow
  - Updated routing system with /master-dashboard route protected by master role requirements
  - Enhanced ClassroomCreationForm component for masters to create and manage classrooms
  - Added visual indicators and upgrade prompts for mentors to apply for master status
  - Implemented role progression system where masters have all mentor capabilities plus classroom management

- **August 1, 2025**: Created dedicated student mentors page within student portal
  - Built new StudentMentors.tsx page with full mentor browsing functionality for authenticated students
  - Added advanced search, filtering by specialization, and sorting by rating/price/experience
  - Updated student navigation to point to dedicated /student-mentors route instead of main /mentors page
  - Maintained main /mentors page as demo preview for non-authenticated visitors
  - Implemented interactive mentor cards with booking and messaging functionality for students
  - Added real-time stats display and proper empty states for better user experience
- **August 1, 2025**: Enhanced mentors page and added to student portal
  - Created sample mentor profiles for existing mentor users in the database
  - Converted mentors page to demo preview mode with welcome banner and interaction prompts
  - Added "Find Mentors" navigation option to both student sidebar and navigation components
  - Fixed mentor profiles data loading by creating proper mentor_profiles entries
  - Added gradient overlay and engaging UI to encourage sign-up when interacting with mentor features
  - Made mentors page accessible from student portal while maintaining preview functionality
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