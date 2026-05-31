"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SortBar({ currentSort }: { currentSort: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "featured") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      value={currentSort}
      onChange={(e) => handleSort(e.target.value)}
      className="text-sm border border-stone-200 rounded-full px-4 py-1.5 text-stone-600 bg-white focus:outline-none focus:border-stone-400 cursor-pointer"
    >
      <option value="featured">Featured</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="rating">Top Rated</option>
      <option value="reviews">Most Reviewed</option>
    </select>
  );
}
