// Centralized authentication utilities

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'mentor' | 'admin';
  isMaster?: boolean;
}

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  try {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) return null;
    
    const user = JSON.parse(userStr);
    // Validate that user object has required fields
    if (!user.id || !user.role) return null;
    
    return user;
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

// Logout user and clear all auth data
export const logout = (): void => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('authToken'); // If we have tokens
  localStorage.removeItem('userSession'); // Any other session data
  
  // Dispatch a custom event to notify all components of logout
  window.dispatchEvent(new CustomEvent('user-logout'));
  
  // Redirect to home page
  window.location.href = '/';
};

// Login user and store auth data
export const login = (user: User): void => {
  localStorage.setItem('currentUser', JSON.stringify(user));
  
  // Dispatch a custom event to notify all components of login
  window.dispatchEvent(new CustomEvent('user-login', { detail: user }));
};

// Check user role
export const hasRole = (role: string): boolean => {
  const user = getCurrentUser();
  return user?.role === role;
};

// Check if user has any of the specified roles
export const hasAnyRole = (roles: string[]): boolean => {
  const user = getCurrentUser();
  return user ? roles.includes(user.role) : false;
};

export const isMaster = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'mentor' && user?.isMaster === true;
};

export const canCreateClassrooms = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'admin' || (user?.role === 'mentor' && user?.isMaster === true);
};

// Validate user session and check if it's still valid
export const validateSession = (): boolean => {
  const user = getCurrentUser();
  if (!user) return false;
  
  // Additional validation can be added here
  // For example, check token expiration, session timeout, etc.
  return true;
};

// Check if user is authorized to access a specific resource
export const isAuthorized = (requiredRole?: string, allowedRoles?: string[]): boolean => {
  if (!isAuthenticated()) return false;
  
  const user = getCurrentUser();
  if (!user) return false;
  
  if (requiredRole && user.role !== requiredRole) return false;
  if (allowedRoles && !allowedRoles.includes(user.role)) return false;
  
  return true;
};

// Check if current path is within user's designated portal
export const isInCorrectPortal = (): boolean => {
  const user = getCurrentUser();
  if (!user) return true; // Allow unauthenticated users on public pages
  
  const currentPath = window.location.pathname;
  
  switch (user.role) {
    case 'student':
      return currentPath.startsWith('/student-') || 
             currentPath.startsWith('/tools/') ||
             currentPath === '/courses' ||
             currentPath.startsWith('/courses/') ||
             currentPath === '/community' ||
             currentPath === '/learning-paths' ||
             currentPath === '/live-sessions';
    case 'mentor':
      return currentPath.startsWith('/mentor-') ||
             currentPath.startsWith('/classroom/') ||
             currentPath.startsWith('/master-') ||
             currentPath === '/courses' ||
             currentPath.startsWith('/courses/');
    case 'admin':
      return currentPath.startsWith('/admin') ||
             currentPath === '/courses' ||
             currentPath.startsWith('/courses/');
    default:
      return false;
  }
};

// Automatic logout when navigating outside designated portal
export const checkPortalNavigation = (): void => {
  const user = getCurrentUser();
  if (!user) return;
  
  if (!isInCorrectPortal()) {
    console.log('User navigated outside their portal area, logging out automatically');
    logout();
  }
};

// Listen for auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void): (() => void) => {
  const handleLogin = (event: CustomEvent) => {
    callback(event.detail);
  };
  
  const handleLogout = () => {
    callback(null);
  };
  
  window.addEventListener('user-login', handleLogin as EventListener);
  window.addEventListener('user-logout', handleLogout);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('user-login', handleLogin as EventListener);
    window.removeEventListener('user-logout', handleLogout);
  };
};