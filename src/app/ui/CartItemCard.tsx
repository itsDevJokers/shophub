"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/app/context/CartContext";

export default function CartItemCard({ item }: { item: any }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="p-6 flex gap-4">
      <Image
        src={item.image}
        alt={item.title}
        width={96}
        height={96}
        className="object-cover rounded-lg"
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-gray-900 truncate">
            {item.title}
          </h3>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FontAwesomeIcon icon={faMinus} className="text-sm" />
            </button>
            <span className="px-4 py-2 border-l border-r border-gray-300">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FontAwesomeIcon icon={faPlus} className="text-sm" />
            </button>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
