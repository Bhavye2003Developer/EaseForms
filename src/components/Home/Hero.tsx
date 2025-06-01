"use client";

import { Button } from "@/components/ui/moving-border";
import { Highlight } from "@/components/ui/hero-highlight";
import Link from "next/link";
import useAppStore from "@/utils/useAppStore";

export default function Hero() {
  const { session } = useAppStore();

  return (
    <section className="relative w-full bg-zinc-950 py-28 px-6 md:px-10 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Tagline badge */}
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-zinc-800/60 text-sm font-medium text-zinc-300 backdrop-blur-md border border-zinc-700/50">
          No fluff. Just form magic.
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
          {session?.user ? (
            <>
              Welcome back,{" "}
              <span className="text-indigo-400">{session.user.name}</span>.
            </>
          ) : (
            <>
              Welcome to{" "}
              <Highlight className="text-indigo-500">Easeforms</Highlight>
            </>
          )}
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
          Build forms like a pro — with real-time preview, drag-and-drop layout,
          smart answer control, and built-in timer logic.
        </p>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link href="/dashboard">
            <Button
              borderRadius="1.5rem"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-base px-6 py-3 font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Start Building Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
