import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  // Add more user properties as needed
}

interface AuthContextType {
  currentUser: User | null;
  csrfToken: string;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  // Add other authentication methods as needed
}

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
  const [loading, setLoading] = useState(true); // originally set to true
  const [csrfToken, setCsrfToken] = useState<string>(""); // Add csrfToken state
  const navigate = useNavigate(); // Use the useNavigate hook to navigate programmatically

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (window.location.pathname === "/signup") {
        return;
      }
      const fetchGetReponse = await fetch("/api/auth/csrf-token", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (fetchGetReponse.status == 200) {
        const data = await fetchGetReponse.json();
        setCsrfToken(data.csrfToken);

        const response = await fetch("/api/auth/user", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        });
        if (response.status == 200) {
          const userData = await response.json();
          const user = userData.user;
          setCurrentUser({ id: user.id, email: user.email });
        } else {
          if (currentUser !== null) {
            setCurrentUser(null);
            setCsrfToken("");
          }
          navigate("/login");
        }
      }
      setLoading(false);
    };

    fetchCurrentUser();
  }, [navigate]);

  const login = async (email: string, password: string): Promise<User> => {
    const loginData = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-Csrf-Token": csrfToken,
        },
        body: JSON.stringify(loginData),
      });
      if (response.status == 200) {
        const userData = await response.json();
        const user = userData.user;
        setCurrentUser({ id: user.id, email: user.email });
        return { id: user.id, email: user.email };
      } else {
        throw new Error("Failed to log in");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setCurrentUser(null);
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });
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
      {!loading && children}
    </AuthContext.Provider>
  );
}
