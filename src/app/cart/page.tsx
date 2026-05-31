"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { items, total, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <ShoppingBag size={48} className="mx-auto text-stone-300 mb-4" />
        <h1 className="text-2xl font-bold text-stone-900 mb-2">Your cart is empty</h1>
        <p className="text-stone-500 mb-8">Add something beautiful to get started.</p>
        <Link href="/shop" className={cn(buttonVariants(), "bg-stone-900 text-white hover:bg-stone-700 rounded-full px-8")}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  const shipping = total >= 999 ? 0 : 99;
  const grandTotal = total + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/shop" className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-900 mb-8">
        <ArrowLeft size={14} /> Continue shopping
      </Link>
      <h1 className="text-3xl font-bold text-stone-900 mb-10">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Items */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {items.map((item) => (
            <div key={`${item.id}-${item.color}`} className="flex gap-4 border-b border-stone-100 pb-6">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-50 relative shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-stone-900 truncate">{item.name}</h3>
                <p className="text-xs text-stone-400 mt-0.5">{item.color}</p>
                <p className="text-sm font-medium text-stone-900 mt-1">₹{item.price}</p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <button
                  onClick={() => removeItem(item.id, item.color)}
                  className="text-stone-300 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <div className="flex items-center gap-2 border border-stone-200 rounded-full px-2 py-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                    className="text-stone-500 hover:text-stone-900"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                    className="text-stone-500 hover:text-stone-900"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <p className="text-sm font-semibold text-stone-900">₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-stone-50 rounded-2xl p-6 h-fit">
          <h2 className="text-lg font-bold text-stone-900 mb-6">Order Summary</h2>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? <span className="text-green-600">Free</span> : `₹${shipping}`}</span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-stone-400">Add ₹{999 - total} more for free shipping</p>
            )}
            <div className="border-t border-stone-200 pt-3 flex justify-between font-bold text-stone-900 text-base">
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
          <Button
            size="lg"
            className="w-full mt-6 bg-stone-900 hover:bg-stone-700 text-white rounded-full"
          >
            Proceed to Checkout
          </Button>
          <p className="text-xs text-stone-400 text-center mt-3">Secure checkout with Razorpay</p>
        </div>
      </div>
    </div>
  );
}
