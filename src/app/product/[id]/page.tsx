"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/mock-data";
import { useCart } from "@/context/cart-context";
import { Star, ShoppingBag, ArrowLeft, Truck, RotateCcw, Shield, Plus, Minus } from "lucide-react";
import { use } from "react";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);

  if (!product) notFound();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor,
    }, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/shop" className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-900 mb-8">
        <ArrowLeft size={14} /> Back to shop
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="aspect-square rounded-2xl overflow-hidden bg-stone-50 relative">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {product.badge && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-stone-900 text-white">{product.badge}</Badge>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-stone-400 uppercase tracking-widest mb-2">{product.category}</p>
            <h1 className="text-3xl font-bold text-stone-900 mb-3">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    className={star <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-stone-200 fill-stone-200"}
                  />
                ))}
              </div>
              <span className="text-sm text-stone-500">{product.rating} · {product.reviews} reviews</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-stone-900">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-stone-400 line-through">₹{product.originalPrice}</span>
                  <Badge className="bg-red-100 text-red-700">Save {discount}%</Badge>
                </>
              )}
            </div>
          </div>

          <p className="text-stone-600 leading-relaxed">{product.description}</p>

          {/* Color picker */}
          {product.colors.length > 1 && (
            <div>
              <p className="text-sm font-medium text-stone-900 mb-3">Color: <span className="font-normal text-stone-500">{selectedColor}</span></p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-1.5 rounded-full text-sm border transition-all ${
                      selectedColor === color
                        ? "border-stone-900 bg-stone-900 text-white"
                        : "border-stone-200 text-stone-600 hover:border-stone-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div>
            <p className="text-sm font-medium text-stone-900 mb-3">Quantity</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-stone-200 rounded-full">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              {quantity > 1 && (
                <span className="text-sm text-stone-400">= ₹{product.price * quantity}</span>
              )}
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            size="lg"
            className="bg-stone-900 hover:bg-stone-700 text-white rounded-full py-6 text-base"
          >
            <ShoppingBag size={18} className="mr-2" />
            {added ? "Added to Cart!" : "Add to Cart"}
          </Button>

          {/* Trust badges */}
          <div className="border-t border-stone-100 pt-6 grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center gap-1">
              <Truck size={18} className="text-stone-400" />
              <p className="text-xs text-stone-500">Free shipping above ₹999</p>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <RotateCcw size={18} className="text-stone-400" />
              <p className="text-xs text-stone-500">Easy 7-day returns</p>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <Shield size={18} className="text-stone-400" />
              <p className="text-xs text-stone-500">Quality guaranteed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
