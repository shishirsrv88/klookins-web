import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-8xl font-bold text-stone-100 select-none mb-2">404</p>
      <h1 className="text-2xl font-bold text-stone-900 mb-3">Page not found</h1>
      <p className="text-stone-500 max-w-sm mb-8">
        Looks like this page wandered off. Let&apos;s get you back to something beautiful.
      </p>
      <div className="flex gap-3">
        <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "rounded-full text-stone-600")}>
          <ArrowLeft size={16} className="mr-1" /> Home
        </Link>
        <Link href="/shop" className={cn(buttonVariants(), "bg-stone-900 hover:bg-stone-700 text-white rounded-full px-6")}>
          Shop Now
        </Link>
      </div>
    </div>
  );
}
