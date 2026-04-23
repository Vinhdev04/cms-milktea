import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type AppRole = "admin" | "member";

export const mockAccounts = [
  {
    id: "A001",
    name: "Admin Chips",
    email: "admin@chips.vn",
    password: "admin",
    role: "Quản trị viên",
    appRole: "admin" as AppRole,
    avatar: "A",
    branch: "Tất cả chi nhánh",
    phone: "0900000001",
    permissions: ["dashboard", "menu", "orders", "customers", "staff", "vouchers", "reports", "settings", "branches", "toppings", "media", "reviews", "audit-log"],
  },
  {
    id: "U001",
    name: "Nguyễn Thị Lan",
    email: "member@smyou.vn",
    password: "member123",
    role: "Thành viên Gold",
    appRole: "member" as AppRole,
    avatar: "NL",
    branch: "SMYOU Quận 1",
    phone: "0901234567",
    customerId: "C001",
    points: 2450,
    tier: "Gold",
    permissions: [],
  },
  {
    id: "U002",
    name: "Trần Văn Minh",
    email: "silver@smyou.vn",
    password: "member123",
    role: "Thành viên Silver",
    appRole: "member" as AppRole,
    avatar: "TM",
    branch: "SMYOU Quận 3",
    phone: "0912345678",
    customerId: "C002",
    points: 1180,
    tier: "Silver",
    permissions: [],
  },
];

export type AuthUser = typeof mockAccounts[number];

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: AuthUser }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_KEY = "smyou_auth_user";

export function getDefaultRouteForRole(role?: AppRole) {
  return role === "member" ? "/app" : "/admin";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem(AUTH_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string; user?: AuthUser }> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const found = mockAccounts.find(
      (account) => account.email.toLowerCase() === email.toLowerCase() && account.password === password
    );

    if (!found) {
      return { success: false, error: "Email hoặc mật khẩu không đúng." };
    }

    setUser(found);
    localStorage.setItem(AUTH_KEY, JSON.stringify(found));
    return { success: true, user: found };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
