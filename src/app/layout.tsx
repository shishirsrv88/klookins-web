import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { CartProvider } from "@/context/cart-context";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Klookins — Premium Stationery for India",
  description: "Beautiful, high-quality stationery for students and professionals across India.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-white text-stone-900 antialiased`}>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <footer className="border-t border-stone-100 mt-24 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between gap-8">
                <div>
                  <p className="text-xl font-bold text-stone-900 mb-2">klookins</p>
                  <p className="text-sm text-stone-500 max-w-xs">
                    Premium stationery, thoughtfully designed for India.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-8 text-sm text-stone-500">
                  <div className="flex flex-col gap-2">
                    <p className="font-medium text-stone-900">Shop</p>
                    <a href="/shop" className="hover:text-stone-900">All Products</a>
                    <a href="/shop?category=notebooks" className="hover:text-stone-900">Notebooks</a>
                    <a href="/shop?category=planners" className="hover:text-stone-900">Planners</a>
                    <a href="/shop?category=gifting" className="hover:text-stone-900">Gift Sets</a>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-medium text-stone-900">Help</p>
                    <a href="#" className="hover:text-stone-900">Shipping Info</a>
                    <a href="#" className="hover:text-stone-900">Returns</a>
                    <a href="#" className="hover:text-stone-900">Contact Us</a>
                  </div>
                </div>
              </div>
              <p className="mt-12 text-xs text-stone-400">© 2025 Klookins. Made with love in India.</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
