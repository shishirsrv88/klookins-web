import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import ProductCard from "@/components/product-card";
import { featuredProducts, categories } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=1800&auto=format&fit=crop&q=80"
          alt="Writing desk with stationery"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/85 via-stone-900/60 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-widest text-amber-300 uppercase mb-4">
              Premium Stationery — Made for India
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Write your<br />
              <span className="italic font-light text-amber-200">best story.</span>
            </h1>
            <p className="text-lg text-stone-200 mb-10 max-w-lg">
              Beautifully designed notebooks, pens, and planners for students and professionals who believe quality matters.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "bg-amber-400 hover:bg-amber-300 text-stone-900 rounded-full px-8 font-semibold")}>
                Shop Now
              </Link>
              <Link href="/shop?category=gifting" className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "text-white border border-white/40 hover:bg-white/10 rounded-full")}>
                View Gift Sets <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Promo strip */}
      <div className="bg-amber-400 text-stone-900 text-center py-3 px-4 text-sm font-medium tracking-wide">
        Free shipping on orders above ₹999 &nbsp;·&nbsp; New arrivals every week &nbsp;·&nbsp; Handcrafted in India
      </div>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-2xl font-bold text-stone-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              className="group bg-stone-50 hover:bg-stone-100 rounded-xl p-6 transition-colors text-center"
            >
              <div className="text-3xl mb-3">{cat.emoji}</div>
              <p className="text-sm font-semibold text-stone-900 group-hover:text-stone-600">{cat.name}</p>
              <p className="text-xs text-stone-400 mt-1 hidden md:block">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-stone-900">Bestsellers</h2>
          <Link href="/shop" className="text-sm text-stone-500 hover:text-stone-900 flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Mid banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative rounded-2xl overflow-hidden min-h-[360px] flex items-center">
          <Image
            src="https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=1400&auto=format&fit=crop&q=80"
            alt="Gift stationery set"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/70 to-stone-900/20" />
          <div className="relative z-10 p-12 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 w-full">
            <div>
              <p className="text-amber-300 text-sm uppercase tracking-widest mb-3">Free shipping above ₹999</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Give the gift of<br />beautiful stationery.
              </h2>
              <p className="text-stone-300 max-w-sm">
                Every Klookins gift set comes wrapped in our signature packaging — ready to gift.
              </p>
            </div>
            <Link href="/shop?category=gifting" className={cn(buttonVariants({ size: "lg" }), "bg-amber-400 hover:bg-amber-300 text-stone-900 font-semibold rounded-full px-8 shrink-0")}>
              Shop Gift Sets
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
