"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faThLarge } from "@fortawesome/free-solid-svg-icons";

export default function SortOptions({
  sortValue,
  setSortValue,
  setGridView,
  activeGrid,
}: any) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            id="sortSelect"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">View:</span>
          <button
            onClick={() => setGridView(3)}
            className={`p-2 border rounded hover:bg-gray-50 transition-colors cursor-pointer ${
              activeGrid === 3
                ? "bg-blue-50 border-blue-300"
                : "border-gray-300"
            }`}
          >
            <FontAwesomeIcon icon={faTh} className="text-sm" />
          </button>
          <button
            onClick={() => setGridView(4)}
            className={`p-2 border rounded hover:bg-gray-50 transition-colors cursor-pointer ${
              activeGrid === 4
                ? "bg-blue-50 border-blue-300"
                : "border-gray-300"
            }`}
          >
            <FontAwesomeIcon icon={faThLarge} className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}
