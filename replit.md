# HarmonyLearn - Music Education Platform

## Overview

HarmonyLearn is a comprehensive music education platform built with a modern full-stack architecture. The application enables students to learn music from expert mentors through interactive courses, live sessions, and community features. It supports multiple user roles (students, mentors, admins) with classroom management, payment processing, and analytics capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- **August 1, 2025**: Implemented comprehensive route-based authentication and authorization system with automatic portal enforcement
  - Created ProtectedRoute component with role-based access control (student, mentor, admin)
  - Added authentication validation for all protected pages and routes
  - Secured student portal pages to require student role authentication
  - Protected mentor dashboard and management pages with mentor role validation
  - Secured admin panel with admin role requirements
  - Enhanced CourseDetail page to prevent unauthorized enrollments
  - Added comprehensive security checks preventing URL manipulation to access unauthorized content
  - Implemented automatic logout system that detects when users navigate outside their designated portal areas
  - Added real-time navigation monitoring with immediate logout enforcement
  - Created visual access denied screens with appropriate redirect options for each user role
  - Successfully tested and verified that students are automatically logged out when accessing unauthorized areas
  - Ensured course enrollment and other sensitive actions require proper authentication after logout
- **August 1, 2025**: Implemented comprehensive authentication-based portal system
  - Created centralized authentication system with auth.ts utility for consistent user state management
  - Added AuthDialog component for sign-in/sign-up prompts when unauthenticated users try to access features
  - Modified Tools, Courses, and Community pages to show demo content for unauthenticated users
  - Added authentication checks that display sign-in popup when users try to interact with features
  - Implemented proper logout functionality that clears all authentication data and notifies all components
  - Added real-time authentication state updates using custom events across all pages
  - Protected individual tool pages with authentication redirects
  - Fixed authentication detection after logout to properly restrict access
  - Maintained clean separation between demo portal (public) and functional portal (authenticated users)
- **July 31, 2025**: Completely redesigned student practice tools with modern card-based layout
  - Removed tab format and created attractive gradient card design for each tool
  - Added comprehensive Metronome with BPM control, time signatures, and visual feedback
  - Built Focus Timer with Pomodoro technique, progress bars, and preset durations
  - Enhanced Scale Trainer with interactive note visualization and multiple practice modes
  - Created Precision Tuner with chromatic accuracy and visual tuning indicators
  - Added practice statistics dashboard with daily goals and recent session tracking
  - Implemented responsive design with proper color theming for each tool category
- **July 31, 2025**: Enhanced student community page with full feature parity
  - Added audio file sharing capabilities with playable recordings in posts
  - Created Featured Members section showing top community contributors
  - Built comprehensive Forums section organized by instruments and genres with search
  - Enhanced Events section with detailed information, locations, and participant counts
  - Improved post interactions with heart likes, shares, and better visual design
  - Updated post creation form with "Add Audio" and "Add Tags" functionality
- **July 31, 2025**: Created comprehensive student portal with dedicated navigation and features
  - Built complete StudentDashboard with real-time stats, course progress, and achievement tracking
  - Created StudentCourses page with enrolled/available course management and filtering
  - Added StudentProgress page with detailed analytics, weekly goals, and learning tracking
  - Developed StudentSessions page for live session management and booking
  - Integrated all student pages with real API data instead of mock content
  - Updated routing system to include all student portal pages
  - Enhanced Header navigation to support role-based routing for students
  - Fixed admin portal mentor application form display issues by correcting field mapping
  - Converted MentorDashboard from mock data to real API integration
- **July 31, 2025**: Fixed authentication system errors
  - Resolved duplicate import issue in `server/storage.ts` that was causing compilation errors
  - Fixed frontend-backend data mismatch in registration forms:
    - Updated StudentSignUp and MentorSignUp components to use firstName/lastName instead of single name field
    - Modified forms to send username, firstName, lastName, email, password, and role to match backend schema
    - Registration API now working perfectly for both student and mentor accounts
  - Verified login, registration, and core API endpoints are functioning correctly
- **July 2025**: Resolved authentication routing conflicts
  - Removed duplicate general `/sign-in` and `/sign-up` pages that conflicted with role-specific authentication
  - Updated all navigation to use role-specific routes: `/student-signin`, `/student-signup`, `/mentor-signin`, `/mentor-signup`
  - Fixed GetStarted page to route users to appropriate role-specific authentication based on their selection
  - Updated Header component to provide clear role-based authentication options
- **December 2024**: Successfully migrated from Lovable to Replit environment
- **Routing Migration**: Replaced react-router-dom with wouter for Replit compatibility
- **Database Integration**: Added PostgreSQL database with comprehensive schema for music education platform
- **Styling Fixes**: Fixed gradient styling issues by properly configuring Tailwind CSS with custom gradients
- **API Implementation**: Created full RESTful API with CRUD operations for all major entities

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Query for server state management
- **Routing**: Wouter for client-side routing
- **Theme System**: next-themes for dark/light mode support
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Session-based authentication (implied from package dependencies)
- **API**: RESTful API structure with `/api` prefix
- **Development**: Hot module replacement with Vite integration

### Database Design
- **Schema Location**: `shared/schema.ts` for shared type definitions
- **ORM**: Drizzle ORM with PostgreSQL dialect using Neon Database
- **Database**: PostgreSQL with comprehensive schema for music education platform
- **Tables**: users, courses, classrooms, enrollments, classroom_memberships, live_sessions, posts
- **Relations**: Fully defined relationships between all entities using Drizzle relations
- **Storage Layer**: `server/storage.ts` with DatabaseStorage class implementing comprehensive CRUD operations
- **API Routes**: RESTful endpoints in `server/routes.ts` for all major entities
- **Migrations**: Managed through `drizzle-kit push` command

## Key Components

### User Management
- **Multiple User Roles**: Students, Mentors, Admins with different permissions and dedicated portals
- **Authentication Flow**: Separate sign-in/sign-up flows for students and mentors with role-based routing
- **Profile Management**: Role-specific profile features and dashboards
- **Student Portal**: Comprehensive dashboard with course management, progress tracking, and session booking
- **Mentor Portal**: Real-time analytics, course management, and student interaction tools
- **Admin Portal**: User management, mentor application processing, and system administration

### Course System
- **Course Categories**: Piano, Guitar, Violin, Drums, Vocals, Music Theory
- **Learning Paths**: Structured progression through related courses
- **Interactive Content**: Video lessons, practice tools, progress tracking
- **Mentor Integration**: Expert instructors with ratings and specializations

### Live Sessions
- **Real-time Classes**: Video conferencing capabilities for live instruction
- **Interactive Features**: Chat, hand raising, screen sharing
- **Session Management**: Scheduling, recording, participant management

### Classroom Hub
- **Multi-role Access**: Different interfaces for masters, staff, and students
- **Content Management**: Lesson organization, assignment distribution
- **Progress Tracking**: Student analytics and performance monitoring
- **AI Features**: Automated feedback and assessment tools

### Community Features
- **Social Learning**: Student posts, achievements, discussions
- **Practice Tools**: Metronome, tuner, scale trainer, rhythm exercises
- **Gamification**: XP system, badges, leaderboards

### Student Portal Features
- **Dashboard**: Personal stats, course overview, achievement tracking, and weekly progress goals
- **Course Management**: Enrolled course tracking with progress indicators, available course browsing with filtering
- **Progress Analytics**: Detailed learning analytics, study time tracking, achievement system, and goal setting
- **Live Sessions**: Session booking, upcoming session management, live session joining, and recording access
- **Achievement System**: Progress-based achievements, skill milestones, and participation rewards

### Mentor Portal Features  
- **Dashboard**: Real-time student analytics, course performance metrics, and earnings tracking
- **Course Creation**: Course content management, pricing, and student enrollment tracking
- **Student Management**: Progress monitoring, direct messaging, and performance analytics
- **Live Teaching**: Session scheduling, live class management, and recording distribution
- **Analytics**: Revenue tracking, student engagement metrics, and teaching performance insights

### Administrative Panel
- **User Management**: Student and mentor administration with role-based permissions
- **Mentor Applications**: Application review system with approval/rejection workflow
- **Content Moderation**: Report handling and content review with admin notes
- **Analytics Dashboard**: Revenue, engagement, and performance metrics across all user types
- **System Settings**: Platform configuration and maintenance tools

## Data Flow

### Authentication Flow
1. Users select role-specific sign-in/sign-up
2. Credentials validated against PostgreSQL user store
3. Session created and stored in database
4. Role-based routing to appropriate dashboard

### Course Interaction
1. Students browse courses by category or learning path
2. Course enrollment triggers payment processing
3. Progress tracked through database updates
4. Completion triggers achievement and XP systems

### Live Session Flow
1. Mentors schedule sessions through admin interface
2. Students join through classroom hub
3. Real-time features managed through WebSocket connections
4. Session data and recordings stored for future access

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL hosting (@neondatabase/serverless)
- **Connection**: Environment variable `DATABASE_URL` required

### UI/UX Libraries
- **Radix UI**: Comprehensive component primitives
- **Tailwind CSS**: Utility-first styling framework
- **shadcn/ui**: Pre-built component library with consistent design system

### Development Tools
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast JavaScript bundling for production
- **Vite**: Development server with hot module replacement

### Form Handling
- **React Hook Form**: Form state management with @hookform/resolvers
- **Zod**: Schema validation integrated with Drizzle

## Deployment Strategy

### Development Environment
- **Dev Server**: Express server with Vite middleware integration
- **Hot Reloading**: Full-stack development with instant updates
- **Environment**: NODE_ENV=development with debug logging

### Production Build
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: ESBuild bundles Express server to `dist/index.js`
3. **Assets**: Static files served from built frontend
4. **Database**: Migrations applied via `drizzle-kit push`

### Environment Configuration
- **Database URL**: Required for PostgreSQL connection
- **Session Secret**: For secure session management
- **API Keys**: Payment processing and external service integration

### Hosting Considerations
- **Static Assets**: Frontend served from Express with fallback routing
- **API Routes**: Prefixed with `/api` for clear separation
- **Session Storage**: PostgreSQL-backed sessions for scalability
- **File Uploads**: Support for MP3, MP4, PDF, and image formats

The application follows a monorepo structure with shared types between frontend and backend, enabling type-safe API communication and reducing development friction. The modular component architecture allows for easy feature expansion and maintenance.