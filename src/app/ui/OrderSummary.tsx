"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";

export default function OrderSummary({ items }: { items: any[] }) {
  const router = useRouter();
  const { handleCheckout } = useCart();
  const [shippingCost] = useState(0);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax + shippingCost;

  const onCheckout = () => {
    handleCheckout({
      subtotal,
      tax,
      shipping: shippingCost,
      total,
    });
    router.push("/order/success");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm sticky top-8 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Order Summary
      </h2>
      <div className="space-y-3 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span className="font-medium">
            {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax (8%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold border-t pt-3">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={onCheckout}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 mt-6"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
