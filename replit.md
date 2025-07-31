# HarmonyLearn - Music Education Platform

## Overview

HarmonyLearn is a comprehensive music education platform built with a modern full-stack architecture. The application enables students to learn music from expert mentors through interactive courses, live sessions, and community features. It supports multiple user roles (students, mentors, admins) with classroom management, payment processing, and analytics capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

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
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Migrations**: Managed through `drizzle-kit` with migrations stored in `./migrations`
- **Session Storage**: PostgreSQL-based session storage using `connect-pg-simple`

## Key Components

### User Management
- **Multiple User Roles**: Students, Mentors, Admins with different permissions
- **Authentication Flow**: Separate sign-in/sign-up flows for students and mentors
- **Profile Management**: Role-specific profile features and dashboards

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

### Administrative Panel
- **User Management**: Student and mentor administration
- **Content Moderation**: Report handling and content review
- **Analytics Dashboard**: Revenue, engagement, and performance metrics
- **System Settings**: Platform configuration and maintenance

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