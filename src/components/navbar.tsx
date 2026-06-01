"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/cart-context";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold tracking-tight text-stone-900">
            klookins
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
              Shop
            </Link>
            <Link href="/build" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
              Build Your Bottle
            </Link>
          </nav>

          <div className="flex items-center gap-4">
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

      {menuOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white px-4 py-5 flex flex-col gap-1">
          <Link
            href="/shop"
            className="px-2 py-2 rounded-lg text-sm text-stone-700 hover:bg-stone-50"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/build"
            className="px-2 py-2 rounded-lg text-sm text-stone-700 hover:bg-stone-50"
            onClick={() => setMenuOpen(false)}
          >
            Build Your Bottle
          </Link>
        </div>
      )}
    </header>
  );
}
