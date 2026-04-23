import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: 'S' | 'M' | 'L';
  sugar: string;
  ice: string;
  toppings: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  loyaltyPoints: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
}

interface UserAuthContextType {
  user: User | null;
  cart: CartItem[];
  favorites: Set<string>;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: { name: string; email: string; phone: string; dateOfBirth?: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  updateCartItemOptions: (productId: string, options: Partial<CartItem>) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export function UserAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Initialize empty users list if not exists
    const allUsers = localStorage.getItem('milktea_users_clean');
    if (!allUsers) {
      localStorage.setItem('milktea_users_clean', JSON.stringify([]));
    }

    // Check for auth cookie
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const authToken = getCookie('milktea_auth_token');
    if (authToken) {
      const savedUser = localStorage.getItem('milkteaUser');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        } catch (error) { console.error('Failed to load user:', error); }
      }
    }

    const savedCart = localStorage.getItem('milkteaCart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (error) { console.error('Failed to load cart:', error); }
    }

    const savedFavorites = localStorage.getItem('milkteaFavorites');
    if (savedFavorites) {
      try { setFavorites(new Set(JSON.parse(savedFavorites))); } catch (error) { console.error('Failed to load favorites:', error); }
    }
  }, []);

  const [loginAttempts, setLoginAttempts] = useState<Record<string, number>>({});

  const login = async (email: string, password: string) => {
    // Simple Rate Limit
    const now = Date.now();
    const attempts = loginAttempts[email] || 0;
    if (attempts >= 5) {
      return { success: false, error: 'Thử quá nhiều lần. Vui lòng quay lại sau 1 phút.' };
    }

    // Load registered users from local storage
    const allUsers = JSON.parse(localStorage.getItem('milktea_users_clean') || '[]');
    const mockUsers = [
      { id: 'admin-001', name: 'Admin Demo', email: 'admin@chips.vn', phone: '0900000001', loyaltyPoints: 9999, tier: 'System' as const, password: 'admin', role: 'admin' },
      ...allUsers
    ];

    const foundUser = mockUsers.find((userItem) => 
      userItem.email.toLowerCase() === email.toLowerCase() && 
      password === (userItem as any).password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser as any;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      
      // Set cookie for 7 days
      document.cookie = `milktea_auth_token=${userWithoutPassword.id}; path=/; max-age=${7 * 24 * 60 * 60}`;
      localStorage.setItem('milkteaUser', JSON.stringify(userWithoutPassword));
      
      return { success: true, user: userWithoutPassword };
    }

    setLoginAttempts(prev => ({ ...prev, [email]: (prev[email] || 0) + 1 }));
    return { success: false, error: 'Email hoặc mật khẩu không chính xác' };
  };

  const signup = async (data: { name: string; email: string; phone: string; dateOfBirth?: string; password: string }) => {
    const allUsers = JSON.parse(localStorage.getItem('milktea_users_clean') || '[]');
    
    if (allUsers.some((u: any) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, error: 'Email này đã được đăng ký.' };
    }

    const newUser = {
      id: 'user_' + Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      loyaltyPoints: 0,
      tier: 'Bronze' as const,
      createdAt: new Date().toISOString()
    };

    allUsers.push(newUser);
    localStorage.setItem('milktea_users_clean', JSON.stringify(allUsers));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    document.cookie = `milktea_auth_token=${newUser.id}; path=/; max-age=${7 * 24 * 60 * 60}`;
    localStorage.setItem('milkteaUser', JSON.stringify(userWithoutPassword));
    
    // Dispatch storage event so admin dashboard (customers) updates in real-time
    window.dispatchEvent(new Event('storage'));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setFavorites(new Set());
    setIsAuthenticated(false);
    document.cookie = "milktea_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem('milkteaUser');
    localStorage.removeItem('milkteaCart');
    localStorage.removeItem('milkteaFavorites');
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const isFavorite = (productId: string) => {
    return favorites.has(productId);
  };

  const addToCart = (item: CartItem) => {
    setCart((previous) => {
      const existingItem = previous.find(
        (cartItem) => cartItem.productId === item.productId && cartItem.size === item.size && cartItem.sugar === item.sugar
      );

      if (existingItem) {
        return previous.map((cartItem) =>
          cartItem === existingItem ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem
        );
      }

      return [...previous, item];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((previous) => previous.filter((item) => item.productId !== productId));
  };

  const updateCartItem = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((previous) => previous.map((item) => (item.productId === productId ? { ...item, quantity } : item)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateCartItemOptions = (productId: string, options: Partial<CartItem>) => {
    setCart((previous) => previous.map((item) => {
      // For now, we match by productId. In a real app, we'd use a unique row ID.
      if (item.productId === productId) {
        return { ...item, ...options };
      }
      return item;
    }));
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        cart,
        favorites,
        isAuthenticated,
        login,
        signup,
        logout,
        addToCart,
        removeFromCart,
        updateCartItem,
        updateCartItemOptions,
        clearCart,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error('useUserAuth must be used within UserAuthProvider');
  }
  return context;
}
