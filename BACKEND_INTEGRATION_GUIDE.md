# Backend Integration Guide for HarmonyLearn

## Overview
This guide outlines how to integrate the HarmonyLearn frontend with a backend service (Replit or other). The frontend is structured and ready for backend integration.

## Current Frontend Structure

### Authentication Routes
- `/sign-in`, `/sign-up` - General authentication
- `/student-signin`, `/student-signup` - Student-specific flows  
- `/mentor-signin`, `/mentor-signup` - Mentor-specific flows

### Protected Routes (Need Authentication)
- `/admin` - Administrative panel
- `/classroom/*` - Classroom system
- `/live-sessions` - Live session management
- User profile pages

### Data Models Needed

#### User Model
```typescript
interface User {
  id: string;
  email: string;
  role: 'student' | 'mentor' | 'admin';
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
    instruments?: string[];
    experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
  };
  createdAt: Date;
  updatedAt: Date;
}
```

#### Course Model
```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  instructor: User;
  thumbnail: string;
  price: number;
  duration: number; // in minutes
  lessons: Lesson[];
  createdAt: Date;
}
```

#### Classroom Model
```typescript
interface Classroom {
  id: string;
  title: string;
  description: string;
  subject: string;
  level: string;
  maxStudents: number;
  instructor: User;
  students: User[];
  isActive: boolean;
  createdAt: Date;
}
```

#### Live Session Model
```typescript
interface LiveSession {
  id: string;
  title: string;
  description: string;
  instructor: User;
  scheduledAt: Date;
  duration: number; // in minutes
  maxParticipants: number;
  participants: User[];
  meetingLink?: string;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
}
```

## API Endpoints Needed

### Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
POST /api/auth/refresh
```

### Users
```
GET /api/users
GET /api/users/:id
PUT /api/users/:id
DELETE /api/users/:id
GET /api/users/instructors
```

### Courses
```
GET /api/courses
GET /api/courses/:id
POST /api/courses (admin/instructor only)
PUT /api/courses/:id
DELETE /api/courses/:id
GET /api/courses/categories
```

### Classrooms
```
GET /api/classrooms
GET /api/classrooms/:id
POST /api/classrooms (instructor only)
PUT /api/classrooms/:id
DELETE /api/classrooms/:id
POST /api/classrooms/:id/join
POST /api/classrooms/:id/leave
```

### Live Sessions
```
GET /api/live-sessions
GET /api/live-sessions/:id
POST /api/live-sessions (instructor only)
PUT /api/live-sessions/:id
DELETE /api/live-sessions/:id
POST /api/live-sessions/:id/join
```

### Admin
```
GET /api/admin/analytics
GET /api/admin/users
PUT /api/admin/users/:id
GET /api/admin/content-moderation
POST /api/admin/content-moderation/:id/action
```

## Frontend Integration Points

### 1. Update Authentication Components
Files to modify:
- `src/pages/SignIn.tsx`
- `src/pages/SignUp.tsx` 
- `src/pages/StudentSignIn.tsx`
- `src/pages/StudentSignUp.tsx`
- `src/pages/MentorSignIn.tsx`
- `src/pages/MentorSignUp.tsx`

Add API calls to handle form submissions and token management.

### 2. Create API Service Layer
Create `src/services/api.ts`:
```typescript
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('authToken');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  // Auth methods
  async login(credentials: LoginCredentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Course methods
  async getCourses() {
    return this.request('/courses');
  }

  // Add more methods as needed
}

export const apiService = new ApiService();
```

### 3. Add Authentication Context
Create `src/contexts/AuthContext.tsx`:
```typescript
interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### 4. Update Data Fetching
Replace mock data in components with real API calls using React Query:

Example for `src/pages/Courses.tsx`:
```typescript
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';

const Courses = () => {
  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: apiService.getCourses,
  });

  if (isLoading) return <div>Loading...</div>;
  
  // Rest of component
};
```

### 5. Protected Routes
Create `src/components/ProtectedRoute.tsx`:
```typescript
interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }
  
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};
```

### 6. Real-time Features
For live sessions and classroom interactions, consider integrating:
- WebSocket connection for real-time updates
- WebRTC for video/audio calls
- Socket.io for classroom collaboration

### 7. File Upload
For course materials and user avatars:
```typescript
async uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  const result = await response.json();
  return result.url;
}
```

## Environment Variables
Add to `.env.local`:
```
VITE_API_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000
```

## Next Steps

1. **Set up authentication flow** - Start with login/register functionality
2. **Implement course management** - CRUD operations for courses
3. **Add classroom features** - Real-time classroom interactions
4. **Integrate payment** - For course purchases
5. **Add real-time features** - WebSocket connections for live sessions
6. **Implement notifications** - Toast notifications for user actions
7. **Add analytics** - Track user behavior and platform metrics

## Testing Strategy
- Unit tests for API service methods
- Integration tests for authentication flow
- E2E tests for critical user journeys
- Mock API responses during development

The frontend is well-structured and ready for backend integration. The component architecture supports easy data binding and the design system ensures consistent UI throughout the application.