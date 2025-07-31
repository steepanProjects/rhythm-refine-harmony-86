# HarmonyLearn - Music Learning Platform

## Project Overview
HarmonyLearn is a comprehensive music learning platform built with React, TypeScript, and modern web technologies. It provides a structured environment for students to learn music, connect with mentors, and participate in live sessions.

## Technology Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI (shadcn/ui)
- **Routing**: React Router DOM
- **State Management**: React Query (TanStack Query)
- **Theme Management**: next-themes
- **Backend**: Supabase (connected)

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components (buttons, cards, etc.)
│   ├── admin/           # Admin panel specific components
│   ├── classroom/       # Classroom management components
│   └── *.tsx           # Main app components (Hero, Header, etc.)
├── pages/               # Route components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── assets/              # Static assets (images, etc.)
├── App.tsx             # Main app component with routing
├── main.tsx            # Application entry point
└── index.css           # Global styles and design system
```

## Design System
The project uses a comprehensive design system defined in:
- `src/index.css` - CSS custom properties for colors, gradients, shadows
- `tailwind.config.ts` - Tailwind configuration with semantic tokens
- All components use semantic color tokens (no direct colors like `text-white`)

### Color Palette
- **Primary**: Deep Musical Blue (`hsl(220 85% 35%)`)
- **Secondary**: Warm Golden Accent (`hsl(45 95% 55%)`)
- **Accent**: Vibrant Music Accent (`hsl(280 75% 65%)`)
- **Gradients**: Hero, warm, cool, and subtle variants
- **Shadows**: Musical, glow, and warm variants

## Key Features

### 1. User Authentication
- Student sign-in/up (`/student-signin`, `/student-signup`)
- Mentor sign-in/up (`/mentor-signin`, `/mentor-signup`)
- General sign-in/up (`/sign-in`, `/sign-up`)

### 2. Learning Platform
- Course browsing (`/courses`)
- Learning paths (`/learning-paths`)
- Live sessions (`/live-sessions`)
- Practice tools (`/tools`)

### 3. Classroom System
- Virtual classrooms (`/classroom`)
- Classroom dashboard (`/classroom/dashboard/:id`)
- Classroom management (`/classroom/manage`)
- Live class interface (`/classroom/live/:id`)

### 4. Community Features
- Community hub (`/community`)
- Mentor connections (`/mentors`)
- Social interactions and achievements

### 5. Administrative Panel
- Admin dashboard (`/admin`)
- User management
- Course management
- Content moderation
- Analytics dashboard
- Payment management
- System settings

## Components Architecture

### Main Components
- **Header**: Navigation with theme toggle
- **Hero**: Landing page hero with image carousel
- **CourseCategories**: Course category grid
- **FeaturesGrid**: Feature highlights
- **MentorSection**: Mentor showcase
- **StatsSection**: Platform statistics
- **TestimonialSection**: User testimonials with carousel
- **Footer**: Site footer with links

### Admin Components
- **AnalyticsDashboard**: Platform metrics and charts
- **UserManagement**: User administration
- **CourseManagement**: Course CRUD operations
- **ContentModeration**: Content review system
- **PaymentManagement**: Payment tracking
- **SystemSettings**: Configuration management

### Classroom Components
- **ClassroomList**: Available classrooms
- **ClassroomSidebar**: Navigation and quick actions
- **LiveClassInterface**: Video call and collaboration tools
- **CreateClassroomButton**: Modal for creating new classrooms
- **RoleSelector**: Switch between student/mentor/master roles

## State Management
- React Query for server state
- Local component state with useState
- Theme state managed by next-themes
- No global state management (simple architecture)

## Routing Structure
```
/ - Landing page
/get-started - Onboarding flow
/sign-in, /sign-up - General authentication
/student-signin, /student-signup - Student-specific auth
/mentor-signin, /mentor-signup - Mentor-specific auth
/courses - Course catalog
/learning-paths - Structured learning paths
/mentors - Mentor directory
/live-sessions - Live session scheduling
/community - Community hub
/tools - Practice tools
/about - About page
/admin - Administrative panel
/classroom/* - Classroom system routes
```

## Backend Integration
- **Supabase**: Connected for backend services
- Authentication system ready
- Database integration prepared
- File storage available

## Development Notes

### Code Quality
- TypeScript strict mode disabled for rapid development
- ESLint configured for code quality
- Responsive design throughout
- Semantic HTML structure
- Accessibility considerations

### Performance
- Vite for fast development and builds
- React.lazy loading ready for implementation
- Image optimization with proper imports
- CSS custom properties for theme switching

### Deployment Ready
- Production build configured
- Environment variables structure in place
- Modern browser support
- PWA capabilities ready

## Next Steps for Backend Integration
1. Set up Supabase schemas for users, courses, classrooms
2. Implement authentication flows
3. Add real-time features for live sessions
4. Set up file upload for course materials
5. Implement payment processing
6. Add notification system
7. Set up analytics tracking

## Development Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

This structure provides a solid foundation for a comprehensive music learning platform with room for backend integration and feature expansion.