import ProductCard from "@/app/ui/ProductCard";

export default function ProductGrid({ products, gridColumns }: any) {
  const gridClasses: Record<number, string> = {
    3: "lg:grid-cols-3 xl:grid-cols-3",
    4: "lg:grid-cols-4 xl:grid-cols-4",
  };

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 ${gridClasses[gridColumns]} gap-6 mb-8`}
    >
      {products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
