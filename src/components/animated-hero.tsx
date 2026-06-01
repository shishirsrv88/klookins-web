"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1800&auto=format&fit=crop&q=80",
    gradient: "from-amber-950/90 via-amber-900/60 to-transparent",
    label: "Copper",
    kenburns: "kenburns-tl",
  },
  {
    src: "https://images.unsplash.com/photo-1585083969600-495ee7e3604b?w=1800&auto=format&fit=crop&q=80",
    gradient: "from-stone-950/90 via-stone-900/60 to-transparent",
    label: "Steel",
    kenburns: "kenburns-br",
  },
  {
    src: "https://images.unsplash.com/photo-1633354557121-98c12ac821bf?w=1800&auto=format&fit=crop&q=80",
    gradient: "from-teal-950/90 via-teal-900/60 to-transparent",
    label: "Glass",
    kenburns: "kenburns-tl",
  },
  {
    src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1800&auto=format&fit=crop&q=80",
    gradient: "from-yellow-950/90 via-yellow-900/60 to-transparent",
    label: "Bamboo",
    kenburns: "kenburns-br",
  },
  {
    src: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=1800&auto=format&fit=crop&q=80",
    gradient: "from-stone-950/90 via-stone-800/60 to-transparent",
    label: "Ceramic",
    kenburns: "kenburns-tl",
  },
];

export default function AnimatedHero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(current);
      setTransitioning(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setTransitioning(false);
        setPrev(null);
      }, 1000);
    }, 4500);
    return () => clearInterval(timer);
  }, [current]);

  const slide = slides[current];
  const prevSlide = prev !== null ? slides[prev] : null;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Previous slide (fading out) */}
      {prevSlide && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            transitioning ? "opacity-0" : "opacity-100"
          )}
        >
          <Image
            src={prevSlide.src}
            alt=""
            fill
            className={cn("object-cover object-center", prevSlide.kenburns)}
            priority
            sizes="100vw"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${prevSlide.gradient}`} />
        </div>
      )}

      {/* Current slide (fading in) */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          transitioning ? "opacity-0" : "opacity-100"
        )}
      >
        <Image
          key={current}
          src={slide.src}
          alt="Klookins bottle"
          fill
          className={cn("object-cover object-center", slide.kenburns)}
          priority
          sizes="100vw"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
      </div>

      {/* Material label pill */}
      <div className="absolute top-6 right-8 z-20">
        <div
          key={slide.label}
          className="text-xs font-medium text-white/70 uppercase tracking-widest animate-fade-in"
        >
          {slide.label}
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i === current) return;
              setPrev(current);
              setTransitioning(true);
              setTimeout(() => {
                setCurrent(i);
                setTransitioning(false);
                setPrev(null);
              }, 1000);
            }}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === current ? "w-8 bg-amber-400" : "w-1.5 bg-white/40 hover:bg-white/70"
            )}
          />
        ))}
      </div>

      {/* Hero content — static */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-widest text-amber-300 uppercase mb-4">
            Premium Bottles — Made for India
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Stay hydrated<br />
            <span className="italic font-light text-amber-200">in style.</span>
          </h1>
          <p className="text-lg text-stone-200 mb-10 max-w-lg">
            Beautifully crafted bottles in copper, glass, steel, and more — for people who believe the details matter.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/shop"
              className={cn(buttonVariants({ size: "lg" }), "bg-amber-400 hover:bg-amber-300 text-stone-900 rounded-full px-8 font-semibold")}
            >
              Shop Bottles
            </Link>
            <Link
              href="/build"
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "text-white border border-white/40 hover:bg-white/10 rounded-full")}
            >
              Build Yours <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
