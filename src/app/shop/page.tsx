import ProductCard from "@/components/product-card";
import { products, categories } from "@/lib/mock-data";
import Link from "next/link";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  const activeCategory = categories.find((c) => c.id === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-stone-900 mb-1">
          {activeCategory ? activeCategory.name : "All Products"}
        </h1>
        <p className="text-stone-500 text-sm">{filtered.length} products</p>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 flex-wrap mb-10">
        <Link
          href="/shop"
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
            href={`/shop?category=${cat.id}`}
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

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24 text-stone-400">
          <p className="text-lg">No products found in this category.</p>
          <Link href="/shop" className="text-sm text-stone-900 underline mt-2 inline-block">View all products</Link>
        </div>
      )}
    </div>
  );
}
