import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { User, AuthContextType } from "./types";
import {
  createToken,
  getUser,
  loginUser,
  logoutUser,
} from "../../api/auth/service";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [csrfToken, setCsrfToken] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/login") {
      return;
    }
    const fetchCurrentUser = async () => {
      const user = await getUser(csrfToken);
      setCurrentUser(user);
      if (!user) {
        navigate("/login");
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const user = await loginUser(email, password);
      setCurrentUser(user);
      const token = await createToken();
      setCsrfToken(token);
      return user;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setCurrentUser(null);
      setCsrfToken("");
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value: AuthContextType = {
    currentUser,
    csrfToken,
    login,
    logout,
    // Add other authentication methods as needed
  };

  return (
    <AuthContext.Provider value={value}>
      <div>{children}</div>
    </AuthContext.Provider>
  );
}
