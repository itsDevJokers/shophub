"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faShoppingCart,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();
  const { cart, isLoading } = useCart();

  const itemCount =
    cart?.products?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const handleLogout = async () => {
    await logout();
    router.push("/"); // Redirect to homepage after logout
  };

  const handleCartClick = () => {
    if (isLoggedIn) {
      router.push("/cart");
    } else {
      router.push("/login");
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => router.push("/")}
            className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition-colors"
          >
            ShopHub
          </button>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleCartClick}
              className="text-gray-600 hover:text-blue-600 relative cursor-pointer"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="text-lg" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">
                  Hi, {user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 cursor-pointer"
                  title="Logout"
                >
                  <FontAwesomeIcon icon={faSignOut} className="text-lg" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="text-gray-600 hover:text-blue-600 cursor-pointer"
                title="Login"
              >
                <FontAwesomeIcon icon={faUser} className="text-lg" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
