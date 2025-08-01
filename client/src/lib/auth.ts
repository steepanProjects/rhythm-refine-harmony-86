// Centralized authentication utilities

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'mentor' | 'admin';
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