import { User } from "../../components/AuthContext/types";

const createToken = async (): Promise<string> => {
  try {
    const response = await fetch("/api/auth/csrf-token", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    const result = await response.json();
    return result.csrfToken;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
};

const getUser = async (token: string): Promise<User> => {
  try {
    const response = await fetch("/api/auth/user", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token,
      },
      mode: "cors",
    });
    const result = await response.json();
    return result.user;
  } catch (error) {
    console.error("Error fetching active user:", error);
    throw error;
  }
};

const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const loginData = {
      email: email,
      password: password,
    };
    const response = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      mode: "cors",
    });
    const result = await response.json();
    return result.user;
  } catch (error) {
    console.error("Error with login:", error);
    throw error;
  }
};

const logoutUser = async (): Promise<void> => {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    return;
  } catch (error) {
    console.error("Error with logout:", error);
    throw error;
  }
};

export { createToken, getUser, loginUser, logoutUser };
