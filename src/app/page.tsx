import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product-card";
import { featuredProducts, categories } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-widest text-stone-400 uppercase mb-4">
              Premium Stationery — Made for India
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-stone-900 leading-tight mb-6">
              Write your<br />
              <span className="italic font-light">best story.</span>
            </h1>
            <p className="text-lg text-stone-500 mb-10 max-w-lg">
              Beautifully designed notebooks, pens, and planners for students and professionals who believe quality matters.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="bg-stone-900 hover:bg-stone-700 text-white rounded-full px-8">
                <Link href="/shop">Shop Now</Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-stone-600 rounded-full">
                <Link href="/shop?category=gifting">View Gift Sets <ArrowRight size={16} className="ml-1" /></Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block">
          <div className="h-full bg-stone-200 relative">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop"
              alt="Beautiful stationery"
              fill
              className="object-cover opacity-80"
              priority
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-2xl font-bold text-stone-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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

      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-stone-900 rounded-2xl p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-stone-400 text-sm uppercase tracking-widest mb-3">Free shipping above ₹999</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Give the gift of<br />beautiful stationery.
            </h2>
            <p className="text-stone-400 max-w-sm">
              Every Klookins gift set comes wrapped in our signature packaging — ready to gift.
            </p>
          </div>
          <Button asChild size="lg" className="bg-white text-stone-900 hover:bg-stone-100 rounded-full px-8 shrink-0">
            <Link href="/shop?category=gifting">Shop Gift Sets</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
