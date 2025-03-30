// User interface
export interface User {
  email: string;
  name?: string;
  token?: string;
}

// Simplified authentication service with no functionality
export const authService = {
  // Always returns false since we've removed authentication
  isAuthenticated(): boolean {
    return false;
  },
  
  // Returns null since we've removed authentication
  getCurrentUser(): User | null {
    return null;
  }
};

export default authService; 