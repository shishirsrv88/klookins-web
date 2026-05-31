import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  images: string[];
  badge: string | null;
  rating: number;
  reviews: number;
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="overflow-hidden rounded-lg bg-stone-50 aspect-square relative mb-3">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {product.badge && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-stone-900 text-white text-xs">{product.badge}</Badge>
          </div>
        )}
        {discount && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-red-100 text-red-700 text-xs">-{discount}%</Badge>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-xs text-stone-400 uppercase tracking-wide">{product.category}</p>
        <h3 className="text-sm font-medium text-stone-900 group-hover:text-stone-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-1">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="text-xs text-stone-500">{product.rating} ({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-stone-900">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-stone-400 line-through">₹{product.originalPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
