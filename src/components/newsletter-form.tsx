"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="text-sm text-amber-300 font-medium">
        You&apos;re in! Check your inbox for your 10% off code.
      </p>
    );
  }

  return (
    <form
      className="flex w-full md:w-auto gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <input
        type="email"
        required
        placeholder="Your email address"
        className="flex-1 md:w-64 px-4 py-2.5 rounded-full text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
      <button
        type="submit"
        className="bg-amber-400 hover:bg-amber-300 text-stone-900 font-semibold text-sm px-5 py-2.5 rounded-full transition-colors shrink-0"
      >
        Subscribe
      </button>
    </form>
  );
}
