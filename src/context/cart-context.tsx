"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, color: string) => void;
  updateQuantity: (id: string, color: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id && i.color === newItem.color);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id && i.color === newItem.color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (id: string, color: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.color === color)));
  };

  const updateQuantity = (id: string, color: string, quantity: number) => {
    if (quantity === 0) {
      removeItem(id, color);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id && i.color === color ? { ...i, quantity } : i))
    );
  };

  return (
    <CartContext.Provider value={{ items, itemCount, total, addItem, removeItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
