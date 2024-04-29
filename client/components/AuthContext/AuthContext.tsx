// AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

// import axios from "axios"; // Assuming you use axios for HTTP requests

interface User {
  id: string;
  email: string;
  // Add more user properties as needed
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  // Add other authentication methods as needed
}

interface JwtPayload {
  userId: string;
  userEmail: string;
  // Add other properties as needed
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// After successful login, store JWT in local storage
const storeJwtInLocalStorage = (jwt: string) => {
  localStorage.setItem("jwt", jwt);
};

// Retrieve JWT from local storage
const getJwtFromLocalStorage = () => {
  return localStorage.getItem("jwt");
};

const removeJwtFromLocalStorage = () => {
  localStorage.removeItem("jwt");
};

const isJwtExpired = (token: string) => {
  try {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken?.exp ? decodedToken.exp * 1000 : null; // Convert expiration time to milliseconds
    const currentTime = Date.now(); // Get current time in milliseconds

    // Check if current time is past the expiration time
    return expirationTime ? currentTime > expirationTime : true;
  } catch (error) {
    // If there's an error decoding the token, consider it expired
    return true;
  }
};

const getActiveUserFromJwt = () => {
  const token = getJwtFromLocalStorage();
  if (!token) {
    console.error("Token is undefined");
    return { id: "", email: "" };
  }
  const decodedToken = token ? (jwtDecode(token) as JwtPayload | null) : null;
  if (!decodedToken) {
    console.error("Decoded token is null or undefined");
    return { id: "", email: "" };
  }

  // Check if decoded token has the expected properties
  if (!decodedToken.userId || !decodedToken.userEmail) {
    console.error("Decoded token does not contain expected properties");
    return { id: "", email: "" };
  }
  return { id: decodedToken.userId, email: decodedToken.userEmail };
};

const isLoggedIn = () => {
  const jwt = getJwtFromLocalStorage();
  // Check if JWT exists and is not expired
  return jwt && !isJwtExpired(jwt);
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // originally set to true

  useEffect(() => {
    // const fetchCurrentUser = async () => {
    if (isLoggedIn()) {
      const data = getActiveUserFromJwt();
      setCurrentUser({ id: data.id, email: data.email });
    } else {
      console.log("=================");
      console.log("Not logged in!");
      console.log("=================");
    }
    setLoading(false);
    // };

    // fetchCurrentUser();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const loginData = {
      email: email, // Replace with actual email
      password: password, // Replace with actual password
    };
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (response.status == 200) {
        const userData = await response.json();
        const user = userData.user;
        const jwt = userData.token;
        storeJwtInLocalStorage(jwt);
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
      //   await axios.post("/api/logout");
      removeJwtFromLocalStorage();
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value: AuthContextType = {
    currentUser,
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
