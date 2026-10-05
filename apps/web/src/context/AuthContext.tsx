import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  name: string;
  role: string;
  avatar: string;
  location: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, pass: string) => boolean;
  logout: () => void;
  updateUser: (updated: Partial<User>) => void;
}

const MOCK_CREDENTIALS = {
  username: "Javkhlan Tselmeg",
  password: "password123",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("app_user");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Javkhlan Tselmeg",
          role: "Software Engineer",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
          location: "Ulaanbaatar, Mongolia",
        };
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("app_auth") === "true";
  });

  useEffect(() => {
    localStorage.setItem("app_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("app_auth", String(isAuthenticated));
  }, [isAuthenticated]);

  const login = (username: string, pass: string): boolean => {
    const trimmedUser = username.trim().toLowerCase();
    const isValidUsername =
      trimmedUser === MOCK_CREDENTIALS.username.toLowerCase() || trimmedUser === "javkhlan";
    const isValidPassword = pass === MOCK_CREDENTIALS.password;

    if (isValidUsername && isValidPassword) {
      setUser((prev) =>
        prev
          ? { ...prev, name: MOCK_CREDENTIALS.username }
          : {
              name: MOCK_CREDENTIALS.username,
              role: "Software Engineer",
              avatar:
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
              location: "Ulaanbaatar, Mongolia",
            },
      );
      setIsAuthenticated(true);
      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateUser = (updated: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updated } : null));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
