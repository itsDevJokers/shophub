import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
  showingStart,
  showingEnd,
  totalProducts,
}: any) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pageNumbers.push(i);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      pageNumbers.push("...");
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-600">
          Showing {showingStart}-{showingEnd} of {totalProducts} products
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p: any) => p - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
          </button>
          <div className="flex gap-1">
            {pageNumbers.map((num, index) =>
              num === "..." ? (
                <span key={index} className="px-2 py-2 text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-2 border rounded-lg transition-colors cursor-pointer ${
                    currentPage === num
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {num}
                </button>
              )
            )}
          </div>
          <button
            onClick={() => setCurrentPage((p: any) => p + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}
