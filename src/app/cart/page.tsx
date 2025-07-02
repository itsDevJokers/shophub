"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import CartItemCard from "@/app/ui/CartItemCard";
import OrderSummary from "@/app/ui/OrderSummary";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

export default function CartPage() {
  const { cart, isLoading: isCartLoading } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setIsProductsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const isLoading = isCartLoading || isProductsLoading;

  const productMap = new Map(products.map((p) => [p.id, p]));

  const cartItemsWithDetails = cart?.products
    ?.map((item) => ({
      ...productMap.get(item.productId)!,
      quantity: item.quantity,
    }))
    .filter((item) => item.title);

  if (isLoading) {
    return <div className="text-center p-12">Loading your cart...</div>;
  }

  if (!cart || !cartItemsWithDetails || cartItemsWithDetails.length === 0) {
    return (
      <div className="text-center p-12 max-w-7xl mx-auto">
        <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-gray-400 text-3xl"
          />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Your cart is empty
        </h3>
        <p className="text-gray-600 mb-6">
          Start shopping to add items to your cart
        </p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex mb-8">{/* Breadcrumb */}</nav>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">
                Shopping Cart
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              {cartItemsWithDetails.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
        <div className="lg:w-1/3">
          <OrderSummary items={cartItemsWithDetails} />
        </div>
      </div>
    </div>
  );
}
