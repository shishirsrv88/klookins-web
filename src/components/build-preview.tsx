"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { builderCombinations } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function BuildPreview() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % builderCombinations.length);
        setProgressKey((k) => k + 1);
        setVisible(true);
      }, 400);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const combo = builderCombinations[index];
  const total = combo.base.price + combo.lid.price + combo.accessory.price;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="rounded-2xl overflow-hidden bg-stone-900 grid md:grid-cols-2 min-h-[420px]">

        {/* Image side */}
        <div className="relative overflow-hidden">
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              visible ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={combo.image}
              alt={combo.label}
              fill
              className="object-cover object-center scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900/30 to-transparent" />
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-4 flex gap-1.5 z-10">
            {builderCombinations.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setVisible(false);
                  setTimeout(() => {
                    setIndex(i);
                    setProgressKey((k) => k + 1);
                    setVisible(true);
                  }, 300);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-amber-400" : "w-1.5 bg-white/40"
                )}
              />
            ))}
          </div>
        </div>

        {/* Content side */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-2">
            Build Your Bottle
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-snug">
            Colour coordinate<br />the way you hydrate.
          </h2>
          <p className="text-stone-400 text-sm mb-8">
            Three easy steps. Endless combinations.
          </p>

          {/* Animated combination breakdown */}
          <div
            className={cn(
              "transition-all duration-500",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
          >
            <div className="mb-1 flex items-center gap-2">
              <span className={cn("w-2 h-2 rounded-full shrink-0", combo.accentColor)} />
              <p className="text-xs text-stone-400 uppercase tracking-widest font-medium">{combo.label}</p>
            </div>

            <div className="space-y-2 mt-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-stone-400 text-xs uppercase tracking-wide">Base · </span>
                  <span className="text-white font-medium">{combo.base.name}</span>
                  <span className="text-stone-500 text-xs ml-1.5">{combo.base.color}</span>
                </div>
                <span className="text-stone-300 font-medium">₹{combo.base.price}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-stone-400 text-xs uppercase tracking-wide">Lid · </span>
                  <span className="text-white font-medium">{combo.lid.name}</span>
                </div>
                <span className="text-stone-300 font-medium">₹{combo.lid.price}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-stone-400 text-xs uppercase tracking-wide">Extra · </span>
                  <span className="text-white font-medium">{combo.accessory.name}</span>
                </div>
                <span className="text-stone-300 font-medium">₹{combo.accessory.price}</span>
              </div>
              <div className="border-t border-stone-700 pt-2 flex items-center justify-between text-sm font-semibold">
                <span className="text-white">Total</span>
                <span className="text-amber-400">₹{total}</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-0.5 bg-stone-700 rounded-full overflow-hidden mb-6">
            <div
              key={progressKey}
              className="h-full bg-amber-400 rounded-full animate-progress"
              style={{ animationDuration: "3.2s" }}
            />
          </div>

          <Link
            href="/build"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-900 font-semibold text-sm px-6 py-3 rounded-full transition-colors self-start"
          >
            Start Building <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
