"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchItem({ searchQuery, setSearchQuery }: any) {
  const handleSearchChange = (e: any) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  return (
    <div className="mb-6 mt-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products by title..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg  transition-colors"
        />
      </div>
    </div>
  );
}
