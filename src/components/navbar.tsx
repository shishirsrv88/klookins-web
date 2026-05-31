"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/context/cart-context";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

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
            <Link href="/shop" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
              Shop
            </Link>
            <Link href="/shop?category=notebooks" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
              Notebooks
            </Link>
            <Link href="/shop?category=planners" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
              Planners
            </Link>
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
        <div className="md:hidden border-t border-stone-100 bg-white px-4 py-4 flex flex-col gap-4">
          <Link href="/shop" className="text-sm text-stone-700" onClick={() => setMenuOpen(false)}>Shop All</Link>
          <Link href="/shop?category=notebooks" className="text-sm text-stone-700" onClick={() => setMenuOpen(false)}>Notebooks</Link>
          <Link href="/shop?category=planners" className="text-sm text-stone-700" onClick={() => setMenuOpen(false)}>Planners</Link>
          <Link href="/shop?category=gifting" className="text-sm text-stone-700" onClick={() => setMenuOpen(false)}>Gifts</Link>
        </div>
      )}
    </header>
  );
}
