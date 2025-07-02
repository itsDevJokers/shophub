"use client";

import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPrint,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function OrderSuccessPage() {
  const router = useRouter();
  const { latestOrder } = useCart();
  const { user } = useAuth();
  const [orderNumber, setOrderNumber] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        setAllProducts(await res.json());
      } catch (error) {
        console.error("Failed to fetch product details", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!latestOrder) {
      router.replace("/");
      return;
    }
    const newOrderNum =
      "SH-" +
      new Date().getFullYear() +
      "-" +
      Math.floor(Math.random() * 100000)
        .toString()
        .padStart(5, "0");
    setOrderNumber(newOrderNum);
  }, [latestOrder, router]);

  if (isLoading || !latestOrder) {
    return (
      <div className="text-center p-12">Loading your order confirmation...</div>
    );
  }

  const productMap = new Map(allProducts.map((p) => [p.id, p]));
  const { items, summary } = latestOrder;

  console.log("items:", items);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <FontAwesomeIcon icon={faCheck} className="text-green-600 text-3xl" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-lg text-gray-600">
          Thank you for your purchase,{" "}
          <span className="font-medium">
            {user?.username || "Valued Customer"}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <button
                onClick={() => window.print()}
                className="text-blue-600 text-sm font-medium"
              >
                <FontAwesomeIcon icon={faPrint} className="mr-1" />
                Print Receipt
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {items.map((item: any) => {
                const productDetails = productMap.get(item.productId);
                if (!productDetails) return null;

                return (
                  <div
                    key={item.productId}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <Image
                      src={productDetails.image}
                      alt={productDetails.title}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {productDetails.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${(productDetails.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t pt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${summary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>
                    {summary.shipping === 0
                      ? "Free"
                      : `$${summary.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${summary.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Total Paid</span>
                  <span>${summary.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold">Order Details</h3>
            <div className="space-y-3 mt-4">
              <div className="flex justify-between text-sm">
                <span>Order Number</span>
                <span className="font-medium">{orderNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Order Date</span>
                <span className="font-medium">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <Link
            href="/"
            className="w-full block text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
