"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";

interface CartProduct {
  productId: number;
  quantity: number;
}
interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
}

interface Order {
  items: any[];
  summary: {
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  };
}

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  addToCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, newQuantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  latestOrder: Order | null;
  handleCheckout: (summary: Order["summary"]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, isLoggedIn } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      if (isLoggedIn && user?.id) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://fakestoreapi.com/carts/user/${user.id}`
          );
          const data = await response.json();
          if (data && data.length > 0) {
            setCart(data[0]);
          }
        } catch (error) {
          console.error("Failed to fetch cart:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [isLoggedIn, user]);

  const addToCart = async (productId: number) => {
    if (!user || !isLoggedIn) {
      console.error("User is not logged in.");
      return;
    }

    const existingProducts = cart?.products || [];
    const productIndex = existingProducts.findIndex(
      (p) => p.productId === productId
    );
    let updatedProducts: CartProduct[];

    if (productIndex > -1) {
      updatedProducts = existingProducts.map((p, index) =>
        index === productIndex ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      updatedProducts = [...existingProducts, { productId, quantity: 1 }];
    }

    try {
      const cartId = cart?.id || user.id; // Fallback for demo purposes

      const response = await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          date: new Date().toISOString(),
          products: updatedProducts,
        }),
      });
      const updatedCartData = await response.json();

      setCart((prevCart) => ({
        ...prevCart!,
        id: cartId,
        userId: user.id,
        products: updatedProducts,
      }));
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const updateCartAPI = async (products: CartProduct[]) => {
    if (!user) return null;
    const cartId = cart?.id || user.id;
    const response = await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        date: new Date().toISOString(),
        products,
      }),
    });
    return response.json();
  };

  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (!cart) return;
    const updatedProducts = cart.products
      .map((p) =>
        p.productId === productId
          ? { ...p, quantity: Math.max(0, newQuantity) }
          : p
      )
      .filter((p) => p.quantity > 0); // Remove if quantity is 0

    setCart((prev) => (prev ? { ...prev, products: updatedProducts } : null)); // Optimistic UI update
    await updateCartAPI(updatedProducts);
  };

  const removeFromCart = async (productId: number) => {
    if (!cart) return;
    const updatedProducts = cart.products.filter(
      (p) => p.productId !== productId
    );

    setCart((prev) => (prev ? { ...prev, products: updatedProducts } : null)); // Optimistic UI update
    await updateCartAPI(updatedProducts);
  };

  const handleCheckout = (summary: Order["summary"]) => {
    if (!cart) return;

    const orderToSave: Order = {
      items: cart.products,
      summary: summary,
    };

    setLatestOrder(orderToSave);

    // Clear the current cart
    setCart(null);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        latestOrder,
        handleCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
