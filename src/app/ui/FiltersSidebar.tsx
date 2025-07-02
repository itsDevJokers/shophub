"use client";

export default function FiltersSidebar({
  filters,
  setFilters,
  clearFilters,
}: any) {
  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <aside className="lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
        {/* Category Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Category</h4>
          <div className="space-y-2">
            {[
              "all",
              "men's clothing",
              "women's clothing",
              "jewelery",
              "electronics",
            ].map((cat) => (
              <label key={cat} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  className="text-blue-600 focus:ring-blue-500"
                  checked={filters.category === cat}
                  onChange={handleFilterChange}
                />
                <span className="ml-2 text-sm text-gray-600 capitalize">
                  {cat.replace("'", "'s")}
                </span>
              </label>
            ))}
          </div>
        </div>
        {/* Price Range */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Price Range
          </h4>
          <div className="space-y-2">
            {[
              { value: "all", label: "All Prices" },
              { value: "0-50", label: "$0 - $50" },
              { value: "50-100", label: "$50 - $100" },
              { value: "100-200", label: "$100 - $200" },
              { value: "200-Infinity", label: "$200+" },
            ].map((price) => (
              <label key={price.value} className="flex items-center">
                <input
                  type="radio"
                  name="price"
                  value={price.value}
                  className="text-blue-600 focus:ring-blue-500"
                  checked={filters.price === price.value}
                  onChange={handleFilterChange}
                />
                <span className="ml-2 text-sm text-gray-600">
                  {price.label}
                </span>
              </label>
            ))}
          </div>
        </div>
        {/* Rating Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Rating</h4>
          <div className="space-y-2">
            {[
              { value: "all", label: "All Ratings" },
              { value: "4+", label: "4+ Stars" },
              { value: "3+", label: "3+ Stars" },
            ].map((rating) => (
              <label key={rating.value} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value={rating.value}
                  className="text-blue-600 focus:ring-blue-500"
                  checked={filters.rating === rating.value}
                  onChange={handleFilterChange}
                />
                <span className="ml-2 text-sm text-gray-600">
                  {rating.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={clearFilters}
          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          Clear Filters
        </button>
      </div>
    </aside>
  );
}
