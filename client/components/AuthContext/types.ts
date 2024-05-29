export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  group_id: number;
  role_id: number;
  language_id: number;
}

export interface AuthContextType {
  currentUser: User | null;
  csrfToken: string;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  // Add other authentication methods as needed
}
