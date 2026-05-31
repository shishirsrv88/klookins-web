import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import NewsletterForm from "@/components/newsletter-form";
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
          <footer className="bg-stone-50 border-t border-stone-100 mt-24">
            {/* Newsletter strip */}
            <div className="bg-stone-900 text-white py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-lg font-semibold mb-1">Get 10% off your first order</p>
                  <p className="text-sm text-stone-400">Join our newsletter for exclusive deals and new arrivals.</p>
                </div>
                <NewsletterForm />
              </div>
            </div>

            {/* Main footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                {/* Brand */}
                <div className="col-span-2 md:col-span-1">
                  <p className="text-xl font-bold text-stone-900 mb-3">klookins</p>
                  <p className="text-sm text-stone-500 leading-relaxed mb-5">
                    Premium stationery, thoughtfully designed for students and professionals across India.
                  </p>
                  <div className="flex gap-4">
                    <a href="#" aria-label="Instagram" className="text-stone-400 hover:text-stone-700 transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    </a>
                    <a href="#" aria-label="X / Twitter" className="text-stone-400 hover:text-stone-700 transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a href="#" aria-label="Pinterest" className="text-stone-400 hover:text-stone-700 transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.16 1.22-5.16s-.31-.63-.31-1.56c0-1.46.85-2.56 1.9-2.56.9 0 1.33.67 1.33 1.48 0 .9-.58 2.26-.87 3.51-.25 1.05.52 1.9 1.54 1.9 1.85 0 3.09-2.38 3.09-5.2 0-2.14-1.44-3.75-4.04-3.75-2.94 0-4.77 2.2-4.77 4.65 0 .84.24 1.44.62 1.9.17.2.19.28.13.51-.04.17-.14.58-.18.74-.06.23-.24.32-.44.23-1.24-.51-1.81-1.87-1.81-3.41 0-2.52 2.12-5.55 6.34-5.55 3.4 0 5.63 2.47 5.63 5.11 0 3.51-1.94 6.13-4.8 6.13-.96 0-1.86-.52-2.17-1.1l-.61 2.34c-.19.72-.56 1.44-.88 1.95.66.2 1.35.31 2.07.31 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Shop */}
                <div className="flex flex-col gap-3 text-sm">
                  <p className="font-semibold text-stone-900">Shop</p>
                  <a href="/shop" className="text-stone-500 hover:text-stone-900 transition-colors">All Products</a>
                  <a href="/shop?category=notebooks" className="text-stone-500 hover:text-stone-900 transition-colors">Notebooks</a>
                  <a href="/shop?category=pens" className="text-stone-500 hover:text-stone-900 transition-colors">Pens &amp; Pencils</a>
                  <a href="/shop?category=planners" className="text-stone-500 hover:text-stone-900 transition-colors">Planners</a>
                  <a href="/shop?category=sticky-notes" className="text-stone-500 hover:text-stone-900 transition-colors">Sticky Notes</a>
                  <a href="/shop?category=water-bottles" className="text-stone-500 hover:text-stone-900 transition-colors">Water Bottles</a>
                  <a href="/shop?category=backpacks" className="text-stone-500 hover:text-stone-900 transition-colors">Backpacks</a>
                  <a href="/shop?category=gifting" className="text-stone-500 hover:text-stone-900 transition-colors">Gift Sets</a>
                </div>

                {/* Help */}
                <div className="flex flex-col gap-3 text-sm">
                  <p className="font-semibold text-stone-900">Help</p>
                  <a href="#" className="text-stone-500 hover:text-stone-900 transition-colors">Shipping Info</a>
                  <a href="#" className="text-stone-500 hover:text-stone-900 transition-colors">Returns &amp; Exchanges</a>
                  <a href="#" className="text-stone-500 hover:text-stone-900 transition-colors">Track My Order</a>
                  <a href="#" className="text-stone-500 hover:text-stone-900 transition-colors">FAQs</a>
                  <a href="#" className="text-stone-500 hover:text-stone-900 transition-colors">Contact Us</a>
                </div>

                {/* Company */}
                <div className="flex flex-col gap-3 text-sm">
                  <p className="font-semibold text-stone-900">Company</p>
                  <a href="#" className="text-stone-500 hover:text-stone-900 transition-colors">Our Story</a>
                  <a href="#" className="text-stone-500 hover:text-stone-900 transition-colors">Sustainability</a>
                  <a href="#" className="text-stone-500 hover:text-stone-900 transition-colors">Wholesale</a>
                  <a href="#" className="text-stone-500 hover:text-stone-900 transition-colors">Careers</a>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-stone-400">
                <p>© 2026 Klookins. Made with love in India.</p>
                <div className="flex gap-4">
                  <a href="#" className="hover:text-stone-600">Privacy Policy</a>
                  <a href="#" className="hover:text-stone-600">Terms of Service</a>
                </div>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
