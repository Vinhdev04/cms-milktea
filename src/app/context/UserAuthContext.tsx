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
    const savedUser = localStorage.getItem('milkteaUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    }

    const savedCart = localStorage.getItem('milkteaCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }

    const savedFavorites = localStorage.getItem('milkteaFavorites');
    if (savedFavorites) {
      try {
        setFavorites(new Set(JSON.parse(savedFavorites)));
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('milkteaUser', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('milkteaCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('milkteaFavorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const login = async (email: string, password: string) => {
    const mockUsers = [
      { id: 'admin-001', name: 'Admin Demo', email: 'admin@smyou.vn', phone: '0900000001', loyaltyPoints: 9999, tier: 'Platinum' as const, password: 'admin123' },
      { id: 'user1', name: 'Nguyễn Văn A', email: 'user1@example.com', phone: '0901234567', loyaltyPoints: 250, tier: 'Silver' as const, password: 'password123' },
      { id: 'user2', name: 'Trần Thị B', email: 'user2@example.com', phone: '0909876543', loyaltyPoints: 500, tier: 'Gold' as const, password: 'password123' },
      { id: 'user3', name: 'Lê Minh C', email: 'user3@example.com', phone: '0912345678', loyaltyPoints: 1000, tier: 'Platinum' as const, password: 'password123' },
    ];

    const foundUser = mockUsers.find((userItem) => 
      userItem.email.toLowerCase() === email.toLowerCase() && 
      password === (userItem as any).password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser as any;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      return { success: true };
    }

    return { success: false, error: 'Email hoặc mật khẩu không chính xác' };
  };

  const signup = async (data: { name: string; email: string; phone: string; dateOfBirth?: string; password: string }) => {
    const newUser: User = {
      id: 'user_' + Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      loyaltyPoints: 0,
      tier: 'Bronze',
    };

    setUser(newUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setFavorites(new Set());
    setIsAuthenticated(false);
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
