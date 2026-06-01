"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingBag, Info } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { builderBases, builderLids, builderAccessories } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const STEPS = ["Base", "Colour", "Lid", "Accessories"];

export default function BuildPage() {
  const [step, setStep] = useState(0);
  const [selectedBaseId, setSelectedBaseId] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedLidId, setSelectedLidId] = useState<string | null>(null);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const base = builderBases.find((b) => b.id === selectedBaseId);
  const lid = builderLids.find((l) => l.id === selectedLidId);
  const accessories = builderAccessories.filter((a) => selectedAccessories.includes(a.id));
  const totalPrice =
    (base?.price ?? 0) +
    (lid?.price ?? 0) +
    accessories.reduce((sum, a) => sum + a.price, 0);

  const canGoToStep = (i: number) => {
    if (i <= 0) return true;
    if (i === 1) return !!selectedBaseId;
    if (i === 2) return !!selectedBaseId && !!selectedColor;
    if (i === 3) return !!selectedBaseId && !!selectedColor && !!selectedLidId;
    return false;
  };

  const toggleAccessory = (id: string) => {
    setSelectedAccessories((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    if (!base || !lid || !selectedColor) return;
    const name = `Custom ${base.size} ${base.material} Bottle`;
    const accNames = accessories.map((a) => a.name).join(", ");
    addItem({
      id: `build-${selectedBaseId}-${selectedColor}-${selectedLidId}-${[...selectedAccessories].sort().join("-")}`,
      name: accNames ? `${name} + ${accNames}` : name,
      price: totalPrice,
      image: base.image,
      color: selectedColor,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-4 text-center">
        <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-2">Customise</p>
        <h1 className="text-3xl font-bold text-stone-900 mb-2">Build Your Bottle</h1>
        <p className="text-stone-500 text-sm">Colour coordinate the way you hydrate — in four easy steps.</p>
      </div>

      {/* How it works strip */}
      <div className="flex items-center justify-center gap-6 text-xs text-stone-400 mb-10 flex-wrap">
        <span>① Pick your base size &amp; material</span>
        <span className="text-stone-200">·</span>
        <span>② Choose your colour</span>
        <span className="text-stone-200">·</span>
        <span>③ Select a lid</span>
        <span className="text-stone-200">·</span>
        <span>④ Add accessories</span>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-12">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => canGoToStep(i) && setStep(i)}
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-colors",
                step === i
                  ? "text-stone-900"
                  : i < step
                  ? "text-stone-500 hover:text-stone-900"
                  : "text-stone-300 cursor-default"
              )}
            >
              <span
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors shrink-0",
                  step === i
                    ? "bg-stone-900 text-white border-stone-900"
                    : i < step
                    ? "bg-stone-200 text-stone-600 border-stone-200"
                    : "border-stone-200 text-stone-300"
                )}
              >
                {i < step ? <Check size={12} /> : i + 1}
              </span>
              <span className="hidden sm:inline">{s}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={cn("h-px w-6 sm:w-10", i < step ? "bg-stone-400" : "bg-stone-200")} />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main content */}
        <div className="lg:col-span-2">

          {/* Step 1: Base */}
          {step === 0 && (
            <div>
              <h2 className="text-lg font-semibold text-stone-900 mb-1">Choose your base</h2>
              <p className="text-sm text-stone-400 mb-6">Select a size and material. You&apos;ll pick your colour in the next step.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {builderBases.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setSelectedBaseId(b.id);
                      setSelectedColor(null);
                    }}
                    className={cn(
                      "rounded-xl border-2 p-3 text-left transition-all",
                      selectedBaseId === b.id
                        ? "border-stone-900 bg-stone-50"
                        : "border-stone-200 hover:border-stone-400"
                    )}
                  >
                    <div className="aspect-square relative rounded-lg overflow-hidden bg-stone-100 mb-3">
                      <Image src={b.image} alt={b.name} fill className="object-cover" sizes="200px" />
                      {selectedBaseId === b.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-stone-900 rounded-full flex items-center justify-center">
                          <Check size={11} className="text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-stone-900">{b.size}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{b.material}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{b.colors.length} colours</p>
                    <p className="text-sm font-semibold text-stone-900 mt-1.5">₹{b.price}</p>
                  </button>
                ))}
              </div>
              <button
                disabled={!selectedBaseId}
                onClick={() => setStep(1)}
                className={cn(
                  "mt-8 w-full py-3 rounded-full font-semibold text-sm transition-colors",
                  selectedBaseId
                    ? "bg-stone-900 text-white hover:bg-stone-700"
                    : "bg-stone-100 text-stone-400 cursor-not-allowed"
                )}
              >
                Next: Choose Colour →
              </button>
            </div>
          )}

          {/* Step 2: Colour */}
          {step === 1 && base && (
            <div>
              <h2 className="text-lg font-semibold text-stone-900 mb-1">Choose your colour</h2>
              <p className="text-sm text-stone-400 mb-6">
                {base.name} · {base.material} — pick a colour to carry through your whole build.
              </p>
              <div className="flex flex-wrap gap-3">
                {base.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "px-4 py-2.5 rounded-full border-2 text-sm transition-all",
                      selectedColor === color
                        ? "border-stone-900 bg-stone-900 text-white font-semibold"
                        : "border-stone-200 text-stone-600 hover:border-stone-400"
                    )}
                  >
                    {selectedColor === color && <Check size={12} className="inline mr-1.5" />}
                    {color}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setStep(0)}
                  className="flex-1 py-3 rounded-full border border-stone-200 text-sm font-medium text-stone-600 hover:border-stone-400 transition-colors"
                >
                  ← Back
                </button>
                <button
                  disabled={!selectedColor}
                  onClick={() => setStep(2)}
                  className={cn(
                    "flex-1 py-3 rounded-full font-semibold text-sm transition-colors",
                    selectedColor
                      ? "bg-stone-900 text-white hover:bg-stone-700"
                      : "bg-stone-100 text-stone-400 cursor-not-allowed"
                  )}
                >
                  Next: Choose Lid →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Lid */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold text-stone-900 mb-1">Choose your lid</h2>
              <p className="text-sm text-stone-400 mb-6">How do you like to sip? Pick a lid that matches your routine.</p>
              <div className="grid grid-cols-2 gap-4">
                {builderLids.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLidId(l.id)}
                    className={cn(
                      "rounded-xl border-2 p-5 text-left transition-all relative",
                      selectedLidId === l.id
                        ? "border-stone-900 bg-stone-50"
                        : "border-stone-200 hover:border-stone-400"
                    )}
                  >
                    {selectedLidId === l.id && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-stone-900 rounded-full flex items-center justify-center">
                        <Check size={11} className="text-white" />
                      </div>
                    )}
                    <p className="text-sm font-semibold text-stone-900 mb-1.5">{l.name}</p>
                    <p className="text-xs text-stone-400 leading-relaxed">{l.description}</p>
                    <p className="text-sm font-semibold text-stone-900 mt-3">+₹{l.price}</p>
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-full border border-stone-200 text-sm font-medium text-stone-600 hover:border-stone-400 transition-colors">
                  ← Back
                </button>
                <button
                  disabled={!selectedLidId}
                  onClick={() => setStep(3)}
                  className={cn(
                    "flex-1 py-3 rounded-full font-semibold text-sm transition-colors",
                    selectedLidId
                      ? "bg-stone-900 text-white hover:bg-stone-700"
                      : "bg-stone-100 text-stone-400 cursor-not-allowed"
                  )}
                >
                  Next: Accessories →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Accessories */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-semibold text-stone-900 mb-1">Add accessories</h2>
              <p className="text-sm text-stone-400 mb-6">Optional — colour-matched accessories to complete your build.</p>
              <div className="flex flex-col gap-3">
                {builderAccessories.map((acc) => {
                  const selected = selectedAccessories.includes(acc.id);
                  const isBumper = acc.id.startsWith("bumper");
                  const baseSize = base?.size ?? "";
                  const isSmallBumper = acc.id === "bumper-small";
                  const isLargeBumper = acc.id === "bumper-large";
                  const recommended =
                    (isSmallBumper && baseSize === "360ml") ||
                    (isLargeBumper && ["480ml", "750ml", "1L"].includes(baseSize));

                  return (
                    <button
                      key={acc.id}
                      onClick={() => toggleAccessory(acc.id)}
                      className={cn(
                        "rounded-xl border-2 p-4 text-left transition-all flex items-center justify-between",
                        selected
                          ? "border-stone-900 bg-stone-50"
                          : "border-stone-200 hover:border-stone-400"
                      )}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-stone-900">{acc.name}</p>
                          {recommended && (
                            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                              Fits your base
                            </span>
                          )}
                          {isBumper && !recommended && (
                            <span className="text-xs bg-stone-100 text-stone-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Info size={10} /> Wrong size
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-400 mt-0.5">{acc.description}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 ml-4">
                        <span className="text-sm font-semibold text-stone-900">+₹{acc.price}</span>
                        <div className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                          selected ? "bg-stone-900 border-stone-900" : "border-stone-300"
                        )}>
                          {selected && <Check size={11} className="text-white" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-full border border-stone-200 text-sm font-medium text-stone-600 hover:border-stone-400 transition-colors">
                  ← Back
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 rounded-full bg-stone-900 text-white font-semibold text-sm hover:bg-stone-700 transition-colors flex items-center justify-center gap-2"
                >
                  {added ? (
                    <><Check size={16} /> Added!</>
                  ) : (
                    <><ShoppingBag size={16} /> Add to Cart — ₹{totalPrice}</>
                  )}
                </button>
              </div>
              {added && (
                <p className="mt-4 text-center text-sm text-stone-400">
                  <Link href="/cart" className="underline hover:text-stone-900">View cart →</Link>
                </p>
              )}
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-stone-50 rounded-2xl p-6">
            <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">Your Build</h3>

            {base ? (
              <div className="aspect-square relative rounded-xl overflow-hidden bg-stone-100 mb-4">
                <Image src={base.image} alt={base.name} fill className="object-cover" sizes="300px" />
              </div>
            ) : (
              <div className="aspect-square rounded-xl bg-stone-200 mb-4 flex items-center justify-center">
                <p className="text-stone-400 text-xs text-center px-6 leading-relaxed">Select a base to preview</p>
              </div>
            )}

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-stone-400 text-xs uppercase tracking-wide mb-0.5">Base</p>
                {base ? (
                  <div className="flex justify-between">
                    <span className="text-stone-700 font-medium">{base.name}</span>
                    <span className="text-stone-900 font-semibold">₹{base.price}</span>
                  </div>
                ) : <p className="text-stone-300">—</p>}
                {selectedColor && <p className="text-xs text-stone-400 mt-0.5">{selectedColor}</p>}
              </div>

              <div>
                <p className="text-stone-400 text-xs uppercase tracking-wide mb-0.5">Lid</p>
                {lid ? (
                  <div className="flex justify-between">
                    <span className="text-stone-700 font-medium">{lid.name}</span>
                    <span className="text-stone-900 font-semibold">₹{lid.price}</span>
                  </div>
                ) : <p className="text-stone-300">—</p>}
              </div>

              {accessories.length > 0 && (
                <div>
                  <p className="text-stone-400 text-xs uppercase tracking-wide mb-1">Accessories</p>
                  {accessories.map((a) => (
                    <div key={a.id} className="flex justify-between mb-1">
                      <span className="text-stone-700 text-xs">{a.name}</span>
                      <span className="text-stone-900 text-xs font-semibold">₹{a.price}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-stone-200 pt-3 flex justify-between font-semibold text-stone-900">
                <span>Total</span>
                <span>{totalPrice > 0 ? `₹${totalPrice}` : "—"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
