"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem { _id: string; name: string; price: number; image: string; quantity: number; stock: number; }
interface CartCtx { items: CartItem[]; addToCart: (item: CartItem) => void; removeFromCart: (id: string) => void; updateQty: (id: string, qty: number) => void; clearCart: () => void; total: number; count: number; }

const CartContext = createContext<CartCtx>({} as CartCtx);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("rustik_cart");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("rustik_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) return prev.map((i) => i._id === item._id ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.stock) } : i);
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => setItems((prev) => prev.filter((i) => i._id !== id));

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) return removeFromCart(id);
    setItems((prev) => prev.map((i) => i._id === id ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const count = items.reduce((acc, i) => acc + i.quantity, 0);

  return <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, total, count }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
