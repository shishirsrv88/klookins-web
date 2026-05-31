"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X, Search, ChevronDown } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { categories } from "@/lib/mock-data";

const stationery = ["notebooks", "pens", "planners", "sticky-notes", "desk"];
const lifestyle = ["water-bottles", "mugs", "lunch-boxes", "umbrellas", "backpacks"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const { itemCount } = useCart();

  const stationeryCats = categories.filter((c) => stationery.includes(c.id));
  const lifestyleCats = categories.filter((c) => lifestyle.includes(c.id));

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight text-stone-900">
            klookins
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Shop dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900 transition-colors py-1">
                Shop <ChevronDown size={14} className={`transition-transform ${shopOpen ? "rotate-180" : ""}`} />
              </button>

              {shopOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[480px]">
                  <div className="bg-white border border-stone-100 rounded-2xl shadow-xl p-6 grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">Stationery</p>
                      <div className="flex flex-col gap-1">
                        {stationeryCats.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/shop?category=${cat.id}`}
                            className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                          >
                            <span className="text-base">{cat.emoji}</span> {cat.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">Lifestyle</p>
                      <div className="flex flex-col gap-1">
                        {lifestyleCats.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/shop?category=${cat.id}`}
                            className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                          >
                            <span className="text-base">{cat.emoji}</span> {cat.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-2 border-t border-stone-100 pt-4 flex items-center justify-between">
                      <Link href="/shop" className="text-sm font-medium text-stone-900 hover:text-stone-600">
                        View all products →
                      </Link>
                      <Link href="/shop?category=gifting" className="text-sm text-amber-600 font-medium hover:text-amber-700">
                        🎁 Gift Sets
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/shop?category=gifting" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
              Gifts
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="text-stone-600 hover:text-stone-900 transition-colors">
              <Search size={20} />
            </button>
            <Link href="/cart" className="relative text-stone-600 hover:text-stone-900 transition-colors">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden text-stone-600 hover:text-stone-900"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white px-4 py-5 flex flex-col gap-1">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest px-2 pb-2">Stationery</p>
          {stationeryCats.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-stone-700 hover:bg-stone-50"
              onClick={() => setMenuOpen(false)}
            >
              <span>{cat.emoji}</span> {cat.name}
            </Link>
          ))}
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest px-2 pt-3 pb-2">Lifestyle</p>
          {lifestyleCats.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-stone-700 hover:bg-stone-50"
              onClick={() => setMenuOpen(false)}
            >
              <span>{cat.emoji}</span> {cat.name}
            </Link>
          ))}
          <div className="border-t border-stone-100 mt-3 pt-3">
            <Link
              href="/shop?category=gifting"
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm font-medium text-amber-700"
              onClick={() => setMenuOpen(false)}
            >
              🎁 Gift Sets
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
