"use client";

import { Button } from "@/components/ui/moving-border";
import { useUser } from "@clerk/nextjs";
import { Highlight } from "@/components/ui/hero-highlight";

export default function Hero() {
  const { isSignedIn, user } = useUser();

  return (
    <section className="relative w-full bg-zinc-950 py-24 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-zinc-800/50 text-sm font-medium text-zinc-300 backdrop-blur">
          No fluff. Just form magic.
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
          {isSignedIn ? `Welcome back, ${user.firstName}.` : "Welcome to"}{" "}
          <Highlight className="text-indigo-500">Easeforms</Highlight>
        </h1>

        <p className="mt-5 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
          Build forms like a pro — with real-time preview, drag-and-drop layout,
          answer control, and built-in timer logic.
        </p>

        <div className="mt-10 flex justify-center">
          <Button
            borderRadius="1.5rem"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-base px-6 py-3 font-semibold transition"
          >
            Start Building Now
          </Button>
        </div>
      </div>
    </section>
  );
}
