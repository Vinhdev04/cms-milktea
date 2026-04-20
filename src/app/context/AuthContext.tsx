import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ===================== MOCK ADMIN ACCOUNT =====================
export const mockAdminUsers = [
  {
    id: "A001",
    name: "Tài khoản demo",
    email: "admin@smyou.vn",
    password: "admin123",
    role: "Quản trị viên",
    avatar: "A",
    branch: "Tất cả chi nhánh",
    phone: "0900000001",
    permissions: ["dashboard", "menu", "orders", "customers", "staff", "vouchers", "reports", "settings", "branches", "toppings", "media", "reviews", "audit-log"],
  },
];

export type AdminUser = typeof mockAdminUsers[0];

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_KEY = "smyou_auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount
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

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));
    
    const found = mockAdminUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (found) {
      const { password: _pw, ...safeUser } = found as typeof found;
      void _pw;
      setUser(found);
      localStorage.setItem(AUTH_KEY, JSON.stringify(found));
      return { success: true };
    }
    
    return { success: false, error: "Email hoặc mật khẩu không đúng." };
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
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
