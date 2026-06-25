import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface User {
  id?: string;
  name: string;
  email: string;
  phone: string;
}

type LoginResult = "success" | "not_found" | "invalid_password";
type RegisterResult = "success" | "exists" | "missing";

interface RegisteredUser {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => LoginResult;
  register: (name: string, email: string, phone: string, password: string) => RegisterResult;
  updateProfile: (name: string, email: string, phone: string, password?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("glamora_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((email: string, password: string): LoginResult => {
    if (!email || !password) return "invalid_password";

    const stored = localStorage.getItem("glamora_registered_users");
    const accounts: RegisteredUser[] = stored ? JSON.parse(stored) : [];
    const account = accounts.find((item) => item.email.toLowerCase() === email.toLowerCase());

    if (!account) return "not_found";
    if (account.password !== password) return "invalid_password";

    const u = { name: account.name, email: account.email, phone: account.phone };
    setUser(u);
    localStorage.setItem("glamora_user", JSON.stringify(u));
    return "success";
  }, []);

  const register = useCallback((name: string, email: string, phone: string, password: string): RegisterResult => {
    if (!name || !email || !phone || !password) return "missing";

    const stored = localStorage.getItem("glamora_registered_users");
    const accounts: RegisteredUser[] = stored ? JSON.parse(stored) : [];
    const alreadyExists = accounts.some((item) => item.email.toLowerCase() === email.toLowerCase());

    if (alreadyExists) return "exists";

    const newAccount: RegisteredUser = { name, email, phone, password };
    const updatedAccounts = [...accounts, newAccount];
    localStorage.setItem("glamora_registered_users", JSON.stringify(updatedAccounts));
    return "success";
  }, []);

  const updateProfile = useCallback((name: string, email: string, phone: string, password?: string) => {
    if (!user) return;

    const updatedUser = { ...user, name, email, phone };
    setUser(updatedUser);
    localStorage.setItem("glamora_user", JSON.stringify(updatedUser));

    const stored = localStorage.getItem("glamora_registered_users");
    const accounts: RegisteredUser[] = stored ? JSON.parse(stored) : [];
    const updatedAccounts = accounts.map((account) =>
      account.email.toLowerCase() === user.email.toLowerCase()
        ? {
            ...account,
            name,
            email,
            phone,
            password: password && password.trim() ? password : account.password,
          }
        : account
    );

    localStorage.setItem("glamora_registered_users", JSON.stringify(updatedAccounts));
  }, [user]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("glamora_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
