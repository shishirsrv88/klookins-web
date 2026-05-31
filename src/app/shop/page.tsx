import ProductCard from "@/components/product-card";
import SortBar from "@/components/sort-bar";
import { products, categories } from "@/lib/mock-data";
import Link from "next/link";
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
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const { category, sort = "featured" } = await searchParams;
  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;
  const sorted = sortProducts(filtered, sort);

  const activeCategory = categories.find((c) => c.id === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-stone-900 mb-1">
          {activeCategory ? activeCategory.name : "All Products"}
        </h1>
        <p className="text-stone-500 text-sm">{sorted.length} products</p>
      </div>

      {/* Category filters + sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div className="flex gap-2 flex-wrap">
          <Link
            href={category ? `/shop${sort !== "featured" ? `?sort=${sort}` : ""}` : "/shop"}
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
              !category
                ? "bg-stone-900 text-white border-stone-900"
                : "border-stone-200 text-stone-600 hover:border-stone-400"
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}${sort !== "featured" ? `&sort=${sort}` : ""}`}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                category === cat.id
                  ? "bg-stone-900 text-white border-stone-900"
                  : "border-stone-200 text-stone-600 hover:border-stone-400"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
        <Suspense>
          <SortBar currentSort={sort} />
        </Suspense>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="text-center py-24 text-stone-400">
          <p className="text-lg">No products found in this category.</p>
          <Link href="/shop" className="text-sm text-stone-900 underline mt-2 inline-block">View all products</Link>
        </div>
      )}
    </div>
  );
}
