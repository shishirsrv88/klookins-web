import ProductCard from "@/components/product-card";
import SortBar from "@/components/sort-bar";
import { products } from "@/lib/mock-data";
import { Suspense } from "react";

function sortProducts(items: typeof products, sort: string) {
  switch (sort) {
    case "price-asc":
      return [...items].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...items].sort((a, b) => b.price - a.price);
    case "rating":
      return [...items].sort((a, b) => b.rating - a.rating);
    case "reviews":
      return [...items].sort((a, b) => b.reviews - a.reviews);
    default:
      return items;
  }
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort = "featured" } = await searchParams;
  const sorted = sortProducts(products, sort);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 mb-1">All Bottles</h1>
          <p className="text-stone-500 text-sm">{sorted.length} products</p>
        </div>
        <Suspense>
          <SortBar currentSort={sort} />
        </Suspense>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
