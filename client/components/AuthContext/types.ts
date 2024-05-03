export interface User {
  id: string;
  email: string;
  // Add more user properties as needed
}

export interface AuthContextType {
  currentUser: User | null;
  csrfToken: string;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  // Add other authentication methods as needed
}
