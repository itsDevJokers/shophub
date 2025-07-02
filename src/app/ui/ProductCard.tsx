"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const generateStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FontAwesomeIcon
        key={`full-${i}`}
        icon={faStar}
        className="text-yellow-400 text-sm"
      />
    );
  }
  if (hasHalfStar) {
    stars.push(
      <FontAwesomeIcon
        key="half"
        icon={faStarHalfAlt}
        className="text-yellow-400 text-sm"
      />
    );
  }
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FontAwesomeIcon
        key={`empty-${i}`}
        icon={faStarEmpty}
        className="text-gray-300 text-sm"
      />
    );
  }
  return stars;
};

export default function ProductCard({ product }: { product: any }) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (isLoggedIn) {
      addToCart(product.id).catch((err) =>
        console.error("Add to cart failed", err)
      );
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        <Image
          src={product.image}
          alt={product.title}
          layout="fill"
          objectFit="contain"
          className="group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col">
        <div className="flex items-center gap-1 mb-2">
          {generateStars(product.rating.rate)}
          <span className="text-sm text-gray-500 ml-1">
            ({product.rating.count})
          </span>
        </div>
        <h3 className="font-medium text-gray-900 mb-2 text-sm leading-tight h-10 overflow-hidden truncate">
          {product.title}
        </h3>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
