import Link from "next/link";
import ProductCard from "@/components/product-card";
import BuildPreview from "@/components/build-preview";
import AnimatedHero from "@/components/animated-hero";
import { featuredProducts } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div>
      <AnimatedHero />

      {/* Promo strip */}
      <div className="bg-amber-400 text-stone-900 text-center py-3 px-4 text-sm font-medium tracking-wide">
        Free shipping on orders above ₹999 &nbsp;·&nbsp; Copper, glass & steel — no plastics &nbsp;·&nbsp; Handcrafted in India
      </div>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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

      {/* Animated Build Your Bottle section */}
      <BuildPreview />

      {/* Founding Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-widest text-amber-600 uppercase mb-3">The People Behind Klookins</p>
          <h2 className="text-3xl font-bold text-stone-900">Meet the Founding Team</h2>
        </div>
        <div className="flex justify-center">
          <div className="text-center max-w-xs">
            <div className="w-40 h-40 rounded-full bg-stone-100 mx-auto mb-5 overflow-hidden flex items-center justify-center border-4 border-stone-200">
              <span className="text-stone-400 text-xs text-center px-4 leading-relaxed">Photo coming soon</span>
            </div>
            <h3 className="text-lg font-semibold text-stone-900">Founder</h3>
            <p className="text-sm text-amber-600 mt-1">Co-founder & CEO</p>
            <p className="text-sm text-stone-500 mt-3 leading-relaxed">
              Passionate about sustainable living and beautiful everyday objects. Started Klookins to bring thoughtfully designed bottles to India.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
