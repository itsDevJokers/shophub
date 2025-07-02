"use client";

import { useState, useEffect } from "react";
import FiltersSidebar from "@/app/ui/FiltersSidebar";
import ProductGrid from "@/app/ui/ProductGrid";
import SortOptions from "@/app/ui/SortOptions";
import Pagination from "@/app/ui/Pagination";
import SearchItem from "./ui/SearchItem";

export default function HomeClient({
  initialProducts,
}: {
  initialProducts: any[];
}) {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [sortValue, setSortValue] = useState("default");
  const [filters, setFilters] = useState({
    category: "all",
    price: "all",
    rating: "all",
  });
  const [gridColumns, setGridColumns] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let tempProducts = [...initialProducts];

    if (searchQuery) {
      tempProducts = tempProducts.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.category !== "all") {
      tempProducts = tempProducts.filter(
        (p) => p.category === filters.category
      );
    }
    if (filters.price !== "all") {
      const priceRanges = {
        "0-50": (price: number) => price <= 50,
        "50-100": (price: number) => price > 50 && price <= 100,
        "100-200": (price: number) => price > 100 && price <= 200,
        "200+": (price: number) => price > 200,
      };
      tempProducts = tempProducts.filter((p) =>
        priceRanges[filters.price as keyof typeof priceRanges](p.price)
      );
    }
    if (filters.rating !== "all") {
      const minRating = parseFloat(filters.rating);
      tempProducts = tempProducts.filter((p) => p.rating.rate >= minRating);
    }

    switch (sortValue) {
      case "price-low":
        tempProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        tempProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        tempProducts.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "name":
        tempProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        tempProducts.sort((a, b) => a.id - b.id);
    }

    setFilteredProducts(tempProducts);
    setCurrentPage(1);
  }, [filters, sortValue, initialProducts, searchQuery]);

  const clearFilters = () => {
    setFilters({ category: "all", price: "all", rating: "all" });
    setSortValue("default");
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <FiltersSidebar
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
          />
          <main className="flex-1">
            <SortOptions
              sortValue={sortValue}
              setSortValue={setSortValue}
              setGridView={setGridColumns}
              activeGrid={gridColumns}
            />
            <SearchItem
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <ProductGrid products={currentProducts} gridColumns={gridColumns} />
            {filteredProducts.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                showingStart={indexOfFirstProduct + 1}
                showingEnd={Math.min(
                  indexOfLastProduct,
                  filteredProducts.length
                )}
                totalProducts={filteredProducts.length}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
